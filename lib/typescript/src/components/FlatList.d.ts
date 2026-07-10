import type { ReactElement } from 'react';
import { type FlatListProps as RNFlatListProps } from 'react-native';
import type { IconName } from './Icon';
export type FlatListProps<ItemT> = Omit<RNFlatListProps<ItemT>, 'refreshControl' | 'refreshing' | 'onRefresh' | 'onEndReached' | 'ListEmptyComponent' | 'ListFooterComponent'> & {
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
export declare function FlatList<ItemT>({ loading, refreshing, onRefresh, loadingMore, onLoadMore, emptyText, emptyIcon, emptyComponent, data, onEndReachedThreshold, contentContainerStyle, ...rest }: FlatListProps<ItemT>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FlatList.d.ts.map