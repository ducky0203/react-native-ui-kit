import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors } from '../theme/colors';
import { fontSize, getFontStyle, lineHeight } from '../theme/typography';

export type ChipProps = {
  label?: string;
  icon?: IconName;
  removable?: boolean;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Chip({
  label,
  icon,
  removable = false,
  onRemove,
  style,
  textStyle,
}: ChipProps) {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[styles.chip, style]}
    >
      {icon ? <Icon name={icon} size={12} color={colors.textMuted} /> : null}
      {label ? (
        <Text style={[styles.label, getFontStyle(), textStyle]}>{label}</Text>
      ) : null}
      {removable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={label ? `Remove ${label}` : 'Remove'}
          hitSlop={6}
          onPress={onRemove}
          style={({ pressed }) => [styles.remove, pressed && styles.pressed]}
        >
          <Icon name="x" size={12} color={colors.textMuted} />
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
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
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
