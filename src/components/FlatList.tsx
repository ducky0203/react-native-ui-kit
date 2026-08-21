import { useState, type ReactElement } from 'react';
import {
  ActivityIndicator,
  FlatList as RNFlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
  type FlatListProps as RNFlatListProps,
  type LayoutChangeEvent,
} from 'react-native';
import { EmptyState } from './EmptyState';
import type { IconName } from './Icon';
import { colors } from '../theme/colors';

export type FlatListProps<ItemT> = Omit<
  RNFlatListProps<ItemT>,
  | 'refreshControl'
  | 'refreshing'
  | 'onRefresh'
  | 'onEndReached'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
> & {
  /** Shows a spinner in the list footer (initial load and load-more). */
  loading?: boolean;
  /**
   * Called on pull-to-refresh; omit to disable refresh. Return a promise and
   * the spinner stays up until it settles.
   */
  onRefresh?: () => void | Promise<unknown>;
  /** Whether another page can still be loaded; must be `true` for `onLoadMore` to fire. */
  canLoadMore?: boolean;
  /** Called when the list nears its end; omit to disable load-more. */
  onLoadMore?: () => void;
  /** Title shown by the default empty state. */
  emptyText?: string;
  /** Icon shown by the default empty state. */
  emptyIcon?: IconName;
  /** Custom element replacing the default empty state. */
  emptyComponent?: ReactElement;
  /**
   * Element rendered under the last item, above the bottom spacer. The spacer
   * is half the list viewport so the last items never sit against the screen
   * bottom when scrolled to the end.
   */
  footerComponent?: ReactElement;
};

export function FlatList<ItemT>({
  loading = false,
  onRefresh,
  canLoadMore = false,
  onLoadMore,
  emptyText = 'No data',
  emptyIcon = 'inbox',
  emptyComponent,
  footerComponent,
  data,
  onEndReachedThreshold = 0.1,
  contentContainerStyle,
  onLayout,
  ...rest
}: FlatListProps<ItemT>) {
  const { height: windowHeight } = useWindowDimensions();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const spacerHeight = (viewportHeight || windowHeight) / 2;

  const hasData = (data?.length ?? 0) > 0;

  const handleEndReached = () => {
    if (onLoadMore && canLoadMore && !loading && hasData) {
      onLoadMore();
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh?.();
    } finally {
      setRefreshing(false);
    }
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setViewportHeight(event.nativeEvent.layout.height);
    onLayout?.(event);
  };

  return (
    <RNFlatList<ItemT>
      {...rest}
      data={data}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      onLayout={handleLayout}
      onEndReached={onLoadMore ? handleEndReached : undefined}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        ) : undefined
      }
      // Rendered only while the list is empty, so `loading` here is the very
      // first load: fill the viewport with a centered spinner instead of
      // flashing the empty state.
      ListEmptyComponent={
        loading ? (
          <View style={styles.loadingFill}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          (emptyComponent ?? <EmptyState icon={emptyIcon} title={emptyText} />)
        )
      }
      ListFooterComponent={
        // Bottom spacer stays as long as the list has items, whatever the
        // footer holds, so the last item never sits against the screen bottom.
        hasData ? (
          <View style={[styles.footer, { paddingBottom: spacerHeight }]}>
            {loading ? <ActivityIndicator color={colors.primary} /> : null}
            {footerComponent}
          </View>
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  footer: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 16,
    gap: 8,
  },
  loadingFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
});
