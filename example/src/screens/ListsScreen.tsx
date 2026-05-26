import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  FlatList,
  Typography,
  colors,
} from '@ducky0203/react-native-ui-kit';

const makeItems = (start: number, count: number): number[] =>
  Array.from({ length: count }, (_, i) => start + i);

export function ListsScreen() {
  const [items, setItems] = useState<number[]>(() => makeItems(0, 20));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(makeItems(0, 20));
      setRefreshing(false);
    }, 1200);
  };

  const onLoadMore = () => {
    if (loadingMore || items.length >= 60) {
      return;
    }
    setLoadingMore(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...makeItems(prev.length, 20)]);
      setLoadingMore(false);
    }, 1200);
  };

  return (
    <FlatList<number>
      data={items}
      keyExtractor={(item) => String(item)}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Typography variant={'caption'}>Item #{item + 1}</Typography>
        </View>
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      loadingMore={loadingMore}
      onLoadMore={onLoadMore}
      emptyText="Chưa có dữ liệu"
      emptyIcon="inbox"
      ListHeaderComponent={
        <View style={styles.header}>
          <Button
            label="Xóa danh sách (xem Empty)"
            severity="danger"
            text
            icon="trash-2"
            onPress={() => setItems([])}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    padding: 8,
    alignItems: 'flex-start',
  },
});
