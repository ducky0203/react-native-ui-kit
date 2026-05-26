import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Chip,
  Menu,
  ProgressBar,
  ProgressCircle,
  Tag,
  Typography,
  useToast,
} from '@ducky0203/react-native-ui-kit';

export function FeedbackScreen() {
  const toast = useToast();
  const [progress, setProgress] = useState(35);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Typography variant="h4">Menu</Typography>
      <View style={styles.row}>
        <Menu
          triggerLabel="Options"
          triggerIcon="more-vertical"
          items={[
            {
              label: 'Profile',
              icon: 'user',
              onPress: () => toast.show({ message: 'Profile tapped' }),
            },
            {
              label: 'Settings',
              icon: 'settings',
              onPress: () => toast.show({ message: 'Settings tapped' }),
            },
            { label: 'Disabled item', icon: 'slash', disabled: true },
            {
              label: 'Delete',
              icon: 'trash-2',
              severity: 'danger',
              onPress: () =>
                toast.show({ severity: 'danger', message: 'Deleted' }),
            },
          ]}
        />
      </View>
      <Typography variant="h4">Toast</Typography>
      <View style={styles.row}>
        <Button
          label="Success"
          severity="success"
          onPress={() =>
            toast.show({
              severity: 'success',
              title: 'Saved',
              message: 'Your changes were saved.',
            })
          }
        />
        <Button
          label="Error"
          severity="danger"
          onPress={() =>
            toast.show({
              severity: 'danger',
              title: 'Failed',
              message: 'Something went wrong.',
            })
          }
        />
      </View>

      <Typography variant="h4">Progress</Typography>
      <ProgressBar value={progress} severity="info" showValue />
      <View style={styles.row}>
        <Button
          label="-10"
          size="small"
          outlined
          onPress={() => setProgress((p) => Math.max(0, p - 10))}
        />
        <Button
          label="+10"
          size="small"
          outlined
          onPress={() => setProgress((p) => Math.min(100, p + 10))}
        />
      </View>
      <View style={styles.circles}>
        <ProgressCircle value={progress} severity="info" />
        <ProgressCircle value={75} severity="success" />
        <ProgressCircle value={100} severity="primary" size={72} />
      </View>

      <Typography variant="h4">Tag</Typography>
      <View style={styles.row}>
        <Tag value="Active" severity="success" icon="check" />
        <Tag value="Pending" severity="warning" />
        <Tag value="Error" severity="danger" rounded />
      </View>

      <Typography variant="h4">Chip</Typography>
      <View style={styles.row}>
        <Chip label="React Native" icon="smartphone" />
        <Chip
          label="Removable"
          removable
          onRemove={() => toast.show({ message: 'Chip removed' })}
        />
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
  circles: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
