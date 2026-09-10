import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useListChrome, type ListChromeProps } from './useListChrome';
import { RecyclerListCore } from '../list/RecyclerList';
import type { RecyclerListCoreProps } from '../list/types';

export type { RecyclerListRef } from '../list/types';

export type RecyclerListProps<ItemT> = Omit<
  RecyclerListCoreProps<ItemT>,
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
  | 'refreshControl'
  | 'onEndReached'
> &
  ListChromeProps;

/**
 * The kit's list with row recycling: a row that scrolls out of range is handed
 * to the next row of the same type instead of being unmounted, so long lists
 * stay smooth. Same refresh / load-more / empty-state props as `FlatList`.
 *
 * Runs on the built-in engine, or on `@shopify/flash-list` when the app has
 * registered it through `configureListBackend`.
 *
 * Rows must not resize themselves after they render (an item that measures its
 * own content and grows on the next frame will fight the layout); use
 * `useRecyclingState` for per-row state so a reused row starts fresh.
 */
export function RecyclerList<ItemT>({
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
  data,
  contentContainerStyle,
  ...rest
}: RecyclerListProps<ItemT>): ReactNode {
  const hasData = (data?.length ?? 0) > 0;
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

  return (
    <RecyclerListCore<ItemT>
      {...rest}
      data={data}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      refreshControl={refreshControl}
      onEndReached={onLoadMore ? handleEndReached : undefined}
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
