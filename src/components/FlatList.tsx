import { useCallback, useMemo, useRef } from 'react';
import {
  FlatList as RNFlatList,
  StyleSheet,
  type FlatListProps as RNFlatListProps,
  type ListRenderItem,
} from 'react-native';
import { ListCell } from './ListCell';
import { useListChrome, type ListChromeProps } from './useListChrome';

export type FlatListProps<ItemT> = Omit<
  RNFlatListProps<ItemT>,
  | 'refreshControl'
  | 'refreshing'
  | 'onRefresh'
  | 'onEndReached'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
> &
  ListChromeProps & {
    /**
     * Row size in pixels when every row is the same size, separators included
     * (width instead of height on a horizontal list). Lets the list place rows
     * without measuring them: no blank cells while scrolling fast, accurate
     * `scrollToIndex`, and a scrollbar that stops jumping. Leave it out for
     * rows of varying size. When set, a tighter render window is also applied
     * unless you override `windowSize` / `maxToRenderPerBatch`.
     */
    itemHeight?: number;
    /** Called once, when the first batch of rows has been laid out. */
    onLoad?: (info: { elapsedTimeInMs: number }) => void;
  };

export function FlatList<ItemT>({
  loading,
  onRefresh,
  canLoadMore,
  onLoadMore,
  emptyText,
  emptyIcon,
  emptyComponent,
  footerComponent,
  endText,
  showEndMessage,
  itemHeight,
  onLoad,
  data,
  renderItem,
  extraData,
  getItemLayout,
  onContentSizeChange,
  onEndReachedThreshold = 0.1,
  windowSize,
  maxToRenderPerBatch,
  updateCellsBatchingPeriod,
  removeClippedSubviews = false,
  contentContainerStyle,
  ...rest
}: FlatListProps<ItemT>) {
  const hasData = (data?.length ?? 0) > 0;
  const mountedAt = useRef(Date.now());
  const loadReported = useRef(false);

  const { refreshControl, emptyElement, footerElement, handleEndReached } =
    useListChrome({
      loading,
      onRefresh,
      canLoadMore,
      onLoadMore,
      emptyText,
      emptyIcon,
      emptyComponent,
      footerComponent,
      endText,
      showEndMessage,
      hasData,
    });

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      onContentSizeChange?.(width, height);
      if (!loadReported.current && hasData && height > 0) {
        loadReported.current = true;
        onLoad?.({ elapsedTimeInMs: Date.now() - mountedAt.current });
      }
    },
    [onContentSizeChange, onLoad, hasData]
  );

  const renderCell = useMemo<ListRenderItem<ItemT> | undefined>(() => {
    if (!renderItem) {
      return undefined;
    }
    return (info) => (
      <ListCell info={info} renderItem={renderItem} extraData={extraData} />
    );
  }, [renderItem, extraData]);

  const itemLayout = useMemo(() => {
    if (getItemLayout) {
      return getItemLayout;
    }
    if (itemHeight === undefined) {
      return undefined;
    }
    return (_: ArrayLike<ItemT> | null | undefined, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    });
  }, [getItemLayout, itemHeight]);

  const content = useMemo(
    () => [styles.content, contentContainerStyle],
    [contentContainerStyle]
  );

  // Known row size is the only case where a smaller window is safe: RN can
  // place rows without measuring. Variable-height rows keep RN defaults so
  // fast flings don't flash blank cells. `removeClippedSubviews` stays off —
  // the Android/Fabric default of true drops rows on New Architecture.
  const fixedLayout = itemHeight !== undefined || getItemLayout != null;

  return (
    <RNFlatList<ItemT>
      {...rest}
      data={data}
      renderItem={renderCell}
      extraData={extraData}
      getItemLayout={itemLayout}
      contentContainerStyle={content}
      onContentSizeChange={handleContentSizeChange}
      onEndReached={onLoadMore ? handleEndReached : undefined}
      onEndReachedThreshold={onEndReachedThreshold}
      windowSize={windowSize ?? (fixedLayout ? 11 : undefined)}
      maxToRenderPerBatch={maxToRenderPerBatch ?? (fixedLayout ? 8 : undefined)}
      updateCellsBatchingPeriod={
        updateCellsBatchingPeriod ?? (fixedLayout ? 50 : undefined)
      }
      removeClippedSubviews={removeClippedSubviews}
      refreshControl={refreshControl}
      ListEmptyComponent={emptyElement}
      ListFooterComponent={footerElement}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
