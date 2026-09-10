import { memo, useCallback, type ReactNode } from 'react';
import {
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
export type ViewHolderProps<ItemT> = {
  index: number;
  item: ItemT;
  /**
   * Position along the scroll axis. Passed as a number rather than the layout
   * object: the layout manager mutates its objects in place, so a memo that
   * compared them would compare an object with itself and never re-render.
   */
  offset: number;
  horizontal: boolean;
  extraData: unknown;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  separator: ReactNode;
  /** Reports the measured size back to the list, which corrects the layout. */
  onMeasured: (index: number, width: number, height: number) => void;
};

function ViewHolderInner<ItemT>({
  index,
  item,
  offset,
  horizontal,
  renderItem,
  separator,
  onMeasured,
}: ViewHolderProps<ItemT>) {
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      onMeasured(index, width, height);
    },
    [index, onMeasured]
  );

  // The cross axis is left to the container (stretched for a vertical list,
  // natural height for a horizontal one) so the item measures itself and the
  // list learns its real size, rather than being forced into an estimate.
  const style: StyleProp<ViewStyle> = horizontal
    ? [styles.cell, { left: offset, top: 0 }]
    : [styles.cell, { top: offset, left: 0, right: 0 }];

  return (
    <View style={style} onLayout={handleLayout}>
      {renderItem({ item, index })}
      {separator}
    </View>
  );
}

/**
 * One mounted view, reused across items. Because the key manager hands the
 * same key to a different item, this component is re-rendered with new props
 * instead of being torn down — so the comparison below decides how much work
 * a scroll frame costs.
 */
export const ViewHolder = memo(
  ViewHolderInner,
  (prev, next) =>
    prev.index === next.index &&
    prev.item === next.item &&
    prev.extraData === next.extraData &&
    prev.renderItem === next.renderItem &&
    prev.horizontal === next.horizontal &&
    prev.separator === next.separator &&
    prev.onMeasured === next.onMeasured &&
    prev.offset === next.offset
) as <ItemT>(props: ViewHolderProps<ItemT>) => ReactNode;

const styles = StyleSheet.create({
  cell: {
    position: 'absolute',
  },
});
