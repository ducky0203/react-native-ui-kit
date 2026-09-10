import { useCallback, useMemo, useRef } from 'react';
import {
  Platform,
  SectionList as RNSectionList,
  StyleSheet,
  type SectionBase,
  type SectionListProps as RNSectionListProps,
  type SectionListRenderItem,
} from 'react-native';
import { ListCell } from './ListCell';
import { useListChrome, type ListChromeProps } from './useListChrome';

export type SectionListProps<ItemT, SectionT = unknown> = Omit<
  RNSectionListProps<ItemT, SectionT>,
  | 'refreshControl'
  | 'refreshing'
  | 'onRefresh'
  | 'onEndReached'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
> &
  ListChromeProps & {
    /** Called once, when the first batch of rows has been laid out. */
    onLoad?: (info: { elapsedTimeInMs: number }) => void;
  };

export function SectionList<ItemT, SectionT = unknown>({
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
  onLoad,
  sections,
  renderItem,
  extraData,
  onContentSizeChange,
  onEndReachedThreshold = 0.5,
  // Keep roughly five viewports of rows mounted on each side instead of the
  // ten React Native defaults to, and render them in smaller batches: closer
  // to the draw distance FlashList works with, and far less work per frame.
  windowSize = 11,
  maxToRenderPerBatch = 8,
  updateCellsBatchingPeriod = 50,
  removeClippedSubviews = Platform.OS === 'android',
  contentContainerStyle,
  ...rest
}: SectionListProps<ItemT, SectionT>) {
  const hasData = (sections as ReadonlyArray<SectionBase<ItemT>>).some(
    (section) => section.data.length > 0
  );
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
      if (!loadReported.current && height > 0) {
        loadReported.current = true;
        onLoad?.({ elapsedTimeInMs: Date.now() - mountedAt.current });
      }
    },
    [onContentSizeChange, onLoad]
  );

  const renderCell = useMemo<
    SectionListRenderItem<ItemT, SectionT> | undefined
  >(() => {
    if (!renderItem) {
      return undefined;
    }
    return (info) => (
      <ListCell info={info} renderItem={renderItem} extraData={extraData} />
    );
  }, [renderItem, extraData]);

  const content = useMemo(
    () => [styles.content, contentContainerStyle],
    [contentContainerStyle]
  );

  return (
    <RNSectionList<ItemT, SectionT>
      {...rest}
      sections={sections}
      renderItem={renderCell}
      extraData={extraData}
      contentContainerStyle={content}
      onContentSizeChange={handleContentSizeChange}
      onEndReached={onLoadMore ? handleEndReached : undefined}
      onEndReachedThreshold={onEndReachedThreshold}
      windowSize={windowSize}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
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
