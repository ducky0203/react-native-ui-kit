import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Typography } from 'react-native-ui-kit';

export function ButtonsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Typography variant="h4">Severity</Typography>
      <View style={styles.row}>
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Danger" severity="danger" />
      </View>

      <Typography variant="h4">Variant</Typography>
      <View style={styles.row}>
        <Button label="Filled" />
        <Button label="Outlined" outlined />
        <Button label="Text" text />
        <Button label="Rounded" rounded />
      </View>

      <Typography variant="h4">State</Typography>
      <View style={styles.row}>
        <Button label="Loading" loading />
        <Button label="Disabled" disabled />
      </View>

      <Typography variant="h4">Size</Typography>
      <View style={styles.row}>
        <Button label="Small" size="small" />
        <Button label="Normal" size="normal" />
        <Button label="Large" size="large" />
      </View>

      <Typography variant="h4">Icon</Typography>
      <View style={styles.row}>
        <Button label="Download" icon="download" />
        <Button label="Next" icon="arrow-right" iconPos="right" outlined />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
});
