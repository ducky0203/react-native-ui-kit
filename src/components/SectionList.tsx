import type { ReactElement } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList as RNSectionList,
  StyleSheet,
  View,
  type SectionListProps as RNSectionListProps,
} from 'react-native';
import { EmptyState } from './EmptyState';
import type { IconName } from './Icon';
import { colors } from '../theme/colors';

export type SectionListProps<ItemT, SectionT = unknown> = Omit<
  RNSectionListProps<ItemT, SectionT>,
  | 'refreshControl'
  | 'refreshing'
  | 'onRefresh'
  | 'onEndReached'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
> & {
  /** Initial full-screen loading state. */
  loading?: boolean;
  /** Pull-to-refresh active state. */
  refreshing?: boolean;
  /** Called on pull-to-refresh; omit to disable refresh. */
  onRefresh?: () => void;
  /** Footer spinner state while fetching the next page. */
  loadingMore?: boolean;
  /** Called when the list nears its end; omit to disable load-more. */
  onLoadMore?: () => void;
  /** Title shown by the default empty state. */
  emptyText?: string;
  /** Icon shown by the default empty state. */
  emptyIcon?: IconName;
  /** Custom element replacing the default empty state. */
  emptyComponent?: ReactElement;
};

export function SectionList<ItemT, SectionT = unknown>({
  loading = false,
  refreshing = false,
  onRefresh,
  loadingMore = false,
  onLoadMore,
  emptyText = 'No data',
  emptyIcon = 'inbox',
  emptyComponent,
  sections,
  onEndReachedThreshold = 0.4,
  contentContainerStyle,
  ...rest
}: SectionListProps<ItemT, SectionT>) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const hasData = sections.length > 0;

  const handleEndReached = () => {
    if (onLoadMore && !loadingMore && hasData) {
      onLoadMore();
    }
  };

  return (
    <RNSectionList<ItemT, SectionT>
      sections={sections}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      onEndReached={onLoadMore ? handleEndReached : undefined}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        ) : undefined
      }
      ListEmptyComponent={
        emptyComponent ?? <EmptyState icon={emptyIcon} title={emptyText} />
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : undefined
      }
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
  },
  footer: {
    paddingVertical: 16,
  },
});
