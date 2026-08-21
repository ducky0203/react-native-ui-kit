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
  const [loading, setLoading] = useState(false);

  const onRefresh = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems(makeItems(0, 20));
        resolve();
      }, 1200);
    });

  const onLoadMore = () => {
    if (loading || items.length >= 60) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...makeItems(prev.length, 20)]);
      setLoading(false);
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
      onRefresh={onRefresh}
      loading={loading}
      canLoadMore={items.length < 60}
      onLoadMore={onLoadMore}
      emptyText="Chưa có dữ liệu"
      emptyIcon="inbox"
      footerComponent={
        <View style={styles.footer}>
          <Typography variant={'caption'} style={styles.footerText}>
            Footer cao 1/2 màn hình
          </Typography>
        </View>
      }
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
  footer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  footerText: {
    textAlign: 'center',
  },
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
