import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, type IconName } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';

export type EmptyStateProps = {
  icon?: IconName;
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({
  icon = 'inbox',
  title = 'No data',
  description,
  action,
}: EmptyStateProps) {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={[title, description].filter(Boolean).join('. ')}
      style={styles.container}
    >
      <Icon name={icon} size={48} color={colors.textMuted} />
      <Typography variant="h4">{title}</Typography>
      {description ? (
        <Typography
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.description}
        >
          {description}
        </Typography>
      ) : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8,
  },
  description: {
    textAlign: 'center',
  },
  action: {
    marginTop: 8,
  },
});
