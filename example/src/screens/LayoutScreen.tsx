import { ScrollView, StyleSheet } from 'react-native';
import {
  Accordion,
  Divider,
  Panel,
  TabView,
  Typography,
} from 'react-native-ui-kit';

export function LayoutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Typography variant="h4">Divider</Typography>
      <Typography variant="body">Section one</Typography>
      <Divider />
      <Typography variant="body">Section two</Typography>
      <Divider label="OR" />
      <Typography variant="body">Section three</Typography>

      <Typography variant="h4">Panel</Typography>
      <Panel header="Toggleable panel" toggleable>
        <Typography variant="body">
          Panel body — tap the header to collapse or expand.
        </Typography>
      </Panel>

      <Typography variant="h4">Accordion</Typography>
      <Accordion
        items={[
          {
            title: 'What is this kit?',
            icon: 'help-circle',
            content: (
              <Typography variant="bodySmall">
                A React Native UI kit with accessible components.
              </Typography>
            ),
          },
          {
            title: 'Is it type-safe?',
            icon: 'check-circle',
            content: (
              <Typography variant="bodySmall">
                Yes — every component ships TypeScript types.
              </Typography>
            ),
          },
        ]}
      />

      <Typography variant="h4">TabView</Typography>
      <TabView
        tabs={[
          {
            title: 'Overview',
            icon: 'home',
            content: (
              <Typography variant="body">Overview tab content.</Typography>
            ),
          },
          {
            title: 'Details',
            icon: 'list',
            content: (
              <Typography variant="body">Details tab content.</Typography>
            ),
          },
          {
            title: 'Settings',
            icon: 'settings',
            content: (
              <Typography variant="body">Settings tab content.</Typography>
            ),
          },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
});
