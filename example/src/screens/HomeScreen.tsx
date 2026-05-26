import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  FlatList,
  Icon,
  Typography,
  colors,
  type IconName,
} from '@ducky0203/react-native-ui-kit';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type MenuItem = {
  title: string;
  description: string;
  icon: IconName;
  onPress: () => void;
};

export function HomeScreen({ navigation }: Props) {
  const menu: MenuItem[] = [
    {
      title: 'Buttons',
      description: 'Severity, variant, loading, icon',
      icon: 'mouse-pointer',
      onPress: () => navigation.navigate('Buttons'),
    },
    {
      title: 'Form & Text',
      description: 'InputText states, Typography',
      icon: 'edit-3',
      onPress: () => navigation.navigate('Form'),
    },
    {
      title: 'Display',
      description: 'Card, Badge, Avatar',
      icon: 'layout',
      onPress: () => navigation.navigate('Display'),
    },
    {
      title: 'Lists',
      description: 'FlatList load more, refresh, empty',
      icon: 'list',
      onPress: () => navigation.navigate('Lists'),
    },
    {
      title: 'Layout',
      description: 'Divider, Panel, Accordion, TabView',
      icon: 'layers',
      onPress: () => navigation.navigate('Layout'),
    },
    {
      title: 'Feedback',
      description: 'Toast, Progress, Menu, Chip, Tag',
      icon: 'bell',
      onPress: () => navigation.navigate('Feedback'),
    },
  ];

  return (
    <FlatList<MenuItem>
      data={menu}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.title}
          accessibilityHint={item.description}
          onPress={item.onPress}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        >
          <Icon name={item.icon} size={22} color={colors.primary} />
          <View style={styles.text}>
            <Typography variant="label">{item.title}</Typography>
            <Typography variant="caption" color={colors.textMuted}>
              {item.description}
            </Typography>
          </View>
          <Icon name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
