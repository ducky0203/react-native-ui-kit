import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  RecyclerList,
  Typography,
  colors,
  useRecyclingState,
} from '@ducky0203/react-native-ui-kit';

type Row = { id: string; index: number; kind: 'header' | 'row' };

const makeRows = (start: number, count: number): Row[] =>
  Array.from({ length: count }, (_, i) => {
    const index = start + i;
    return {
      id: String(index),
      index,
      kind: index % 10 === 0 ? 'header' : 'row',
    };
  });

function RowView({ item }: { item: Row }) {
  // State follows the item, not the recycled view: scrolling an expanded row
  // out of range must not leave the row that reuses its view expanded.
  const [expanded, setExpanded] = useRecyclingState(false, [item.id]);

  if (item.kind === 'header') {
    return (
      <View style={styles.header}>
        <Typography variant="label">Nhóm {item.index / 10 + 1}</Typography>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Item ${item.index}`}
      onPress={() => setExpanded((value) => !value)}
      style={styles.row}
    >
      <Typography variant="body">Item #{item.index}</Typography>
      {expanded ? (
        <Typography variant="caption" color={colors.textMuted}>
          Hàng này đang mở. Cuộn đi thật xa rồi quay lại: view được tái sử dụng
          cho hàng khác nhưng không hàng nào bị mở lây.
        </Typography>
      ) : null}
    </Pressable>
  );
}

export function RecyclerScreen() {
  const [rows, setRows] = useState<Row[]>(() => makeRows(0, 200));
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  const renderItem = useCallback(
    ({ item }: { item: Row }) => <RowView item={item} />,
    []
  );

  const onRefresh = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setRows(makeRows(0, 200));
        resolve();
      }, 900);
    });

  const onLoadMore = () => {
    if (loading || rows.length >= 2000) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setRows((previous) => [...previous, ...makeRows(previous.length, 200)]);
      setLoading(false);
    }, 700);
  };

  return (
    <RecyclerList<Row>
      data={rows}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      getItemType={(item) => item.kind}
      estimatedItemSize={56}
      loading={loading}
      onRefresh={onRefresh}
      canLoadMore={rows.length < 2000}
      onLoadMore={onLoadMore}
      emptyText="Chưa có dữ liệu"
      endText="Đã tải hết 2000 dòng"
      onLoad={({ elapsedTimeInMs }) => setLoadTime(elapsedTimeInMs)}
      ListHeaderComponent={
        <View style={styles.banner}>
          <Typography variant="caption" color={colors.textMuted}>
            {rows.length} dòng, 2 loại item
            {loadTime === null ? '' : ` · vẽ xong trong ${loadTime}ms`}
          </Typography>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 12,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.border,
  },
  row: {
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
