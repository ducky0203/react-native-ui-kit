import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Badge,
  Card,
  Typography,
} from '@ducky0203/react-native-ui-kit';

export function DisplayScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card title="Card" subTitle="title + subTitle + content">
        <Typography variant="body">
          Card groups related content with a surface, border and shadow.
        </Typography>
      </Card>

      <Card title="Badge">
        <View style={styles.row}>
          <Badge value={3} />
          <Badge value={12} severity="danger" />
          <Badge value="NEW" severity="success" />
          <Badge value={99} severity="warning" size="large" />
        </View>
      </Card>

      <Card title="Avatar">
        <View style={styles.row}>
          <Avatar label="Duc Pham" />
          <Avatar icon="user" severity="info" size="large" />
          <Avatar label="AB" shape="square" severity="warning" size="large" />
          <Avatar label="XL" severity="success" size="xlarge" />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  },
});
