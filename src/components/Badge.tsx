import { StyleSheet, Text, View } from 'react-native';
import { colors, severityColors, type Severity } from '../theme/colors';
import { fontSize } from '../theme/typography';

export type BadgeSize = 'small' | 'normal' | 'large';

export type BadgeProps = {
  value?: string | number;
  severity?: Severity;
  size?: BadgeSize;
  accessibilityLabel?: string;
};

const sizeTokens: Record<
  BadgeSize,
  { minSize: number; font: number; paddingH: number }
> = {
  small: { minSize: 16, font: fontSize.small, paddingH: 4 },
  normal: { minSize: 20, font: fontSize.default, paddingH: 6 },
  large: { minSize: 26, font: fontSize.large, paddingH: 8 },
};

export function Badge({
  value,
  severity = 'primary',
  size = 'normal',
  accessibilityLabel,
}: BadgeProps) {
  const tokens = sizeTokens[size];
  const text = value != null ? String(value) : '';

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? text}
      style={[
        styles.badge,
        {
          backgroundColor: severityColors[severity],
          minWidth: tokens.minSize,
          height: tokens.minSize,
          borderRadius: tokens.minSize / 2,
          paddingHorizontal: tokens.paddingH,
        },
      ]}
    >
      <Text numberOfLines={1} style={[styles.text, { fontSize: tokens.font }]}>
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
