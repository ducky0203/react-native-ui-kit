import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentRef,
} from 'react';
import {
  ScrollView,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { LinearLayoutManager, type Measurement } from './LinearLayoutManager';
import type { RecyclerListCoreProps } from './types';
import { RecycleKeyManager } from './RecycleKeyManager';
import { ViewHolder } from './ViewHolder';

/** Buffer is split unevenly: most of it goes where the finger is heading. */
const BUFFER_AHEAD = 1.4;
const BUFFER_BEHIND = 0.6;
/** A correction pass that keeps changing this many times in a row is a loop. */
const MAX_CORRECTION_PASSES = 30;

export function RecyclerListEngine<ItemT>({
  data,
  renderItem,
  keyExtractor,
  getItemType,
  extraData,
  estimatedItemSize = 100,
  drawDistance = 250,
  maxItemsInRecyclePool = 30,
  horizontal = false,
  ItemSeparatorComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  onEndReached,
  onEndReachedThreshold = 0.5,
  onScroll,
  refreshControl,
  onLoad,
  style,
  contentContainerStyle,
  ref,
}: RecyclerListCoreProps<ItemT>) {
  const items = data ?? [];
  const itemCount = items.length;

  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const [, setRenderId] = useState(0);
  const rerender = useCallback(() => setRenderId((id) => id + 1), []);

  const viewport = useRef({ width: 0, height: 0 });
  const contentWidth = useRef(0);
  const headerSize = useRef(0);
  const scrollOffset = useRef(0);
  const scrollingBack = useRef(false);
  const pending = useRef<Measurement[]>([]);
  const flushScheduled = useRef(false);
  const correctionPasses = useRef(0);
  const endReachedForLength = useRef(-1);
  const mountedAt = useRef(Date.now());
  const loadReported = useRef(false);

  const lastRange = useRef<{ first: number; last: number } | null>(null);
  const keyManager = useRef(new RecycleKeyManager(maxItemsInRecyclePool));
  const layoutManager = useRef<LinearLayoutManager | null>(null);

  // `renderItem` and friends are read from a ref inside callbacks that must
  // stay referentially stable (a new `onMeasured` would re-render every row).
  const latest = useRef({
    items,
    keyExtractor,
    getItemType,
    onEndReached,
    onLoad,
  });
  latest.current = { items, keyExtractor, getItemType, onEndReached, onLoad };

  const resolveType = useCallback((index: number) => {
    const { items: current, getItemType: resolver } = latest.current;
    const item = current[index];
    if (!resolver || item === undefined) {
      return 'default';
    }
    return resolver(item, index);
  }, []);

  const resolveStableId = useCallback((index: number) => {
    const { items: current, keyExtractor: extractor } = latest.current;
    const item = current[index];
    if (!extractor || item === undefined) {
      return String(index);
    }
    return extractor(item, index);
  }, []);

  const hasViewport = viewport.current.height > 0 && viewport.current.width > 0;

  if (!layoutManager.current && hasViewport) {
    layoutManager.current = new LinearLayoutManager({
      horizontal,
      windowWidth: contentWidth.current || viewport.current.width,
      windowHeight: viewport.current.height,
      estimatedItemSize,
      getItemType: resolveType,
    });
  }

  const manager = layoutManager.current;
  keyManager.current.setMaxPoolSize(maxItemsInRecyclePool);

  // Keep the layout in step with the data. Done during render, like the rest
  // of the layout bookkeeping, so the rows below are computed from it.
  if (manager) {
    manager.setItemTypeResolver(resolveType);
    manager.setWindowSize(
      contentWidth.current || viewport.current.width,
      viewport.current.height,
      horizontal
    );
    manager.setItemCount(itemCount);
  }

  // The window of indices to keep mounted: what is visible, plus a buffer
  // weighted towards where the finger is heading, the way FlashList spends
  // most of its draw distance ahead of the scroll.
  const resolveRange = useCallback(() => {
    const current = layoutManager.current;
    const count = latest.current.items.length;
    const size = horizontal ? viewport.current.width : viewport.current.height;
    if (!current || count === 0 || size === 0) {
      return null;
    }
    const start = scrollOffset.current - headerSize.current;
    const bufferBefore =
      drawDistance * (scrollingBack.current ? BUFFER_AHEAD : BUFFER_BEHIND);
    const bufferAfter =
      drawDistance * (scrollingBack.current ? BUFFER_BEHIND : BUFFER_AHEAD);

    const range = current.findRange(
      start - bufferBefore,
      start + size + bufferAfter
    );
    if (!range) {
      // Scrolled past everything the layout knows about (data shrank, or an
      // estimate was far too small): fall back to the first row so there is
      // always something mounted to measure.
      return { first: 0, last: 0 };
    }
    return { first: range.first, last: Math.min(range.last, count - 1) };
  }, [drawDistance, horizontal]);

  // Recomputed on every render on purpose: scroll offset and measurements live
  // in refs, and a render is exactly the signal that one of them moved.
  const range = resolveRange();
  lastRange.current = range;
  const renderStack = range
    ? keyManager.current.sync(
        range.first,
        range.last,
        resolveStableId,
        resolveType
      )
    : [];

  const contentSize = manager?.getContentSize() ?? { width: 0, height: 0 };

  /**
   * Applies the sizes rows reported since the last pass, then keeps the row
   * the user is looking at where it is: correcting a row above the viewport
   * would otherwise shift the content under their finger.
   */
  const flushMeasurements = useCallback(() => {
    flushScheduled.current = false;
    const current = layoutManager.current;
    const batch = pending.current;
    pending.current = [];
    if (!current || batch.length === 0) {
      return;
    }

    const anchorStart = scrollOffset.current - headerSize.current;
    const anchorRange = current.findRange(anchorStart, anchorStart);
    const anchorIndex = anchorRange?.first ?? -1;
    const anchorBefore =
      anchorIndex >= 0 ? current.getOffsetForIndex(anchorIndex) : 0;

    if (!current.applyMeasurements(batch)) {
      correctionPasses.current = 0;
      return;
    }

    if (anchorIndex > 0) {
      const delta = current.getOffsetForIndex(anchorIndex) - anchorBefore;
      if (Math.abs(delta) > 0.5) {
        const offset = scrollOffset.current + delta;
        scrollOffset.current = offset;
        scrollRef.current?.scrollTo(
          horizontal
            ? { x: offset, animated: false }
            : { y: offset, animated: false }
        );
      }
    }

    correctionPasses.current += 1;
    if (correctionPasses.current > MAX_CORRECTION_PASSES) {
      if (__DEV__) {
        console.warn(
          '[RecyclerList] rows keep changing size after every layout pass. ' +
            'Check that renderItem does not resize itself in response to layout.'
        );
      }
      return;
    }

    if (!loadReported.current) {
      loadReported.current = true;
      latest.current.onLoad?.({
        elapsedTimeInMs: Date.now() - mountedAt.current,
      });
    }
    rerender();
  }, [horizontal, rerender]);

  const handleMeasured = useCallback(
    (index: number, width: number, height: number) => {
      pending.current.push({ index, width, height });
      if (!flushScheduled.current) {
        flushScheduled.current = true;
        // Rows report their size one by one; batching to the end of the tick
        // turns a screenful of callbacks into a single layout pass.
        Promise.resolve().then(flushMeasurements);
      }
    },
    [flushMeasurements]
  );

  const checkEndReached = useCallback(() => {
    const current = layoutManager.current;
    const callback = latest.current.onEndReached;
    if (!current || !callback || latest.current.items.length === 0) {
      return;
    }
    const size = horizontal ? viewport.current.width : viewport.current.height;
    const content = horizontal
      ? current.getContentSize().width
      : current.getContentSize().height;
    const distanceToEnd =
      content + headerSize.current - (scrollOffset.current + size);

    if (distanceToEnd <= size * onEndReachedThreshold) {
      if (endReachedForLength.current !== latest.current.items.length) {
        endReachedForLength.current = latest.current.items.length;
        callback();
      }
    }
  }, [horizontal, onEndReachedThreshold]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const offset = horizontal ? contentOffset.x : contentOffset.y;
      scrollingBack.current = offset < scrollOffset.current;
      scrollOffset.current = offset;
      correctionPasses.current = 0;
      checkEndReached();
      onScroll?.(event);

      // Rows are positioned absolutely, so scrolling by itself changes
      // nothing on screen: re-render only when the set of mounted rows would
      // actually differ, instead of once per scroll event.
      const next = resolveRange();
      const previous = lastRange.current;
      if (
        !previous ||
        !next ||
        previous.first !== next.first ||
        previous.last !== next.last
      ) {
        rerender();
      }
    },
    [checkEndReached, horizontal, onScroll, rerender, resolveRange]
  );

  const handleViewportLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      if (
        Math.abs(viewport.current.width - width) > 0.5 ||
        Math.abs(viewport.current.height - height) > 0.5
      ) {
        viewport.current = { width, height };
        rerender();
      }
    },
    [rerender]
  );

  const handleContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      if (Math.abs(contentWidth.current - width) > 0.5) {
        contentWidth.current = width;
        rerender();
      }
    },
    [rerender]
  );

  const handleHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      const size = horizontal ? width : height;
      if (Math.abs(headerSize.current - size) > 0.5) {
        headerSize.current = size;
        rerender();
      }
    },
    [horizontal, rerender]
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollToOffset: ({ offset, animated = true }) => {
        scrollRef.current?.scrollTo(
          horizontal ? { x: offset, animated } : { y: offset, animated }
        );
      },
      scrollToIndex: ({ index, animated = true }) => {
        const current = layoutManager.current;
        if (!current) {
          return;
        }
        const offset = current.getOffsetForIndex(index) + headerSize.current;
        scrollRef.current?.scrollTo(
          horizontal ? { x: offset, animated } : { y: offset, animated }
        );
      },
      scrollToEnd: ({ animated = true } = {}) => {
        scrollRef.current?.scrollToEnd({ animated });
      },
    }),
    [horizontal]
  );

  // A new, shorter data set can leave the list scrolled past its own content.
  useEffect(() => {
    if (itemCount === 0) {
      endReachedForLength.current = -1;
    }
  }, [itemCount]);

  const separator = useMemo(
    () => (ItemSeparatorComponent ? <ItemSeparatorComponent /> : null),
    [ItemSeparatorComponent]
  );

  const isEmpty = itemCount === 0;

  return (
    <ScrollView
      ref={scrollRef}
      style={style}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      onLayout={handleViewportLayout}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={refreshControl}
    >
      {ListHeaderComponent ? (
        <View onLayout={handleHeaderLayout}>{ListHeaderComponent}</View>
      ) : null}

      {isEmpty ? (
        (ListEmptyComponent ?? null)
      ) : (
        <View
          onLayout={handleContentLayout}
          style={
            horizontal
              ? { width: contentSize.width }
              : { height: contentSize.height }
          }
        >
          {renderStack.map((entry) => {
            const item = items[entry.index];
            const layout = manager?.getLayout(entry.index);
            if (item === undefined || !layout) {
              return null;
            }
            return (
              <ViewHolder<ItemT>
                key={entry.key}
                index={entry.index}
                item={item}
                offset={horizontal ? layout.x : layout.y}
                horizontal={horizontal}
                extraData={extraData}
                renderItem={renderItem}
                separator={entry.index < itemCount - 1 ? separator : null}
                onMeasured={handleMeasured}
              />
            );
          })}
        </View>
      )}

      {ListFooterComponent}
    </ScrollView>
  );
}
