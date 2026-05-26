import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors } from '../theme/colors';
import { fontSize, getFontStyle } from '../theme/typography';

export type ChipProps = {
  label?: string;
  icon?: IconName;
  removable?: boolean;
  onRemove?: () => void;
};

export function Chip({ label, icon, removable = false, onRemove }: ChipProps) {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={styles.chip}
    >
      {icon ? <Icon name={icon} size={14} color={colors.textMuted} /> : null}
      {label ? (
        <Text style={[styles.label, getFontStyle()]}>{label}</Text>
      ) : null}
      {removable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={label ? `Remove ${label}` : 'Remove'}
          hitSlop={6}
          onPress={onRemove}
          style={({ pressed }) => [styles.remove, pressed && styles.pressed]}
        >
          <Icon name="x" size={14} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '500',
    color: colors.text,
  },
  remove: {
    borderRadius: 999,
  },
  pressed: {
    opacity: 0.5,
  },
});
