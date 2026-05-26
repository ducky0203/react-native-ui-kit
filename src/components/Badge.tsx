import { StyleSheet, Text, View } from 'react-native';
import { colors, severityColors, type Severity } from '../theme/colors';
import { fontSize, getFontStyle } from '../theme/typography';

export type BadgeSize = 'small' | 'normal' | 'large';

export type BadgeProps = {
  value?: string | number;
  severity?: Severity;
  size?: BadgeSize;
  accessibilityLabel?: string;
};

export function Badge({
  value,
  severity = 'primary',
  size = 'normal',
  accessibilityLabel,
}: BadgeProps) {
  const text = value != null ? String(value) : '';

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? text}
      style={[styles.badge, sizeStyles[size], { backgroundColor: severityColors[severity] }]}
    >
      <Text
        numberOfLines={1}
        style={[styles.text, fontSizeStyles[size], getFontStyle()]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textInverse,
    fontWeight: '700',
  },
});

const sizeStyles = StyleSheet.create({
  small:  { minWidth: 16, height: 16, borderRadius: 8,  paddingHorizontal: 4 },
  normal: { minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 6 },
  large:  { minWidth: 26, height: 26, borderRadius: 13, paddingHorizontal: 8 },
});

const fontSizeStyles = StyleSheet.create({
  small:  { fontSize: fontSize.small },
  normal: { fontSize: fontSize.default },
  large:  { fontSize: fontSize.large },
});
