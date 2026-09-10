import type { ReactElement, ReactNode, Ref } from 'react';
import type { ComponentType } from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type RecyclerListRef = {
  scrollToOffset: (params: { offset: number; animated?: boolean }) => void;
  scrollToIndex: (params: { index: number; animated?: boolean }) => void;
  scrollToEnd: (params?: { animated?: boolean }) => void;
};

export type RecyclerListCoreProps<ItemT> = {
  data: ReadonlyArray<ItemT> | null | undefined;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  /** Stable identity per item. Defaults to the index, which is enough for lists that only append. */
  keyExtractor?: (item: ItemT, index: number) => string;
  /**
   * Groups items that share a layout so a recycled view is handed to an item
   * of the same shape. Without it every view is interchangeable, which is
   * wrong as soon as the list mixes headers, ads or cards with rows.
   */
  getItemType?: (item: ItemT, index: number) => string;
  /** Anything outside `data` that `renderItem` reads; changing it re-renders the rows. */
  extraData?: unknown;
  /** First guess at row size, used only until real rows have been measured. */
  estimatedItemSize?: number;
  /** How far beyond the viewport (in px, each side) rows are kept mounted. */
  drawDistance?: number;
  /** Upper bound on spare views kept for reuse. */
  maxItemsInRecyclePool?: number;
  horizontal?: boolean;
  ItemSeparatorComponent?: React.ComponentType<unknown>;
  ListHeaderComponent?: ReactElement;
  ListFooterComponent?: ReactElement;
  ListEmptyComponent?: ReactElement;
  onEndReached?: () => void;
  /** Fraction of the viewport left below the fold when `onEndReached` fires. */
  onEndReachedThreshold?: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  refreshControl?: ReactElement;
  /** Called once, when the first rows have been measured. */
  onLoad?: (info: { elapsedTimeInMs: number }) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  ref?: Ref<RecyclerListRef>;
};

/** Component a host app can plug in to replace the built-in engine. */
export type ListBackend = ComponentType<Record<string, unknown>>;
