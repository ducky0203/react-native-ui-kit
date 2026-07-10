import { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { fontSize, getFontStyle } from '../theme/typography';

export type ButtonSize = 'small' | 'normal' | 'large';

export type ButtonProps = {
  label?: string;
  icon?: IconName;
  iconPos?: 'left' | 'right';
  severity?: Severity;
  outlined?: boolean;
  text?: boolean;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
};

const sizeTokens: Record<
  ButtonSize,
  {
    paddingV: number;
    paddingH: number;
    font: number;
    icon: number;
    gap: number;
  }
> = {
  small: { paddingV: 6, paddingH: 12, font: fontSize.small, icon: 16, gap: 6 },
  normal: {
    paddingV: 10,
    paddingH: 16,
    font: fontSize.default,
    icon: 18,
    gap: 8,
  },
  large: {
    paddingV: 14,
    paddingH: 20,
    font: fontSize.large,
    icon: 22,
    gap: 10,
  },
};

export function Button({
  label,
  icon,
  iconPos = 'left',
  severity = 'primary',
  outlined = false,
  text = false,
  rounded = false,
  loading = false,
  disabled = false,
  size = 'normal',
  onPress,
  accessibilityLabel,
  accessibilityHint,
  style,
}: ButtonProps) {
  const tone = severityColors[severity];
  const tokens = sizeTokens[size];
  const isDisabled = disabled || loading;
  const filled = !outlined && !text;
  const contentColor = filled ? colors.textInverse : tone;

  const containerStyle = useMemo(
    (): ViewStyle => ({
      backgroundColor: filled ? tone : 'transparent',
      borderColor: outlined ? tone : 'transparent',
      borderWidth: outlined ? 1.5 : 0,
      paddingVertical: tokens.paddingV,
      paddingHorizontal: text ? tokens.paddingH / 2 : tokens.paddingH,
      borderRadius: rounded ? 999 : 3,
      gap: tokens.gap,
      opacity: isDisabled ? 0.5 : 1,
    }),
    [filled, tone, outlined, tokens, text, rounded, isDisabled]
  );

  const labelStyle = useMemo(
    () => [
      styles.label,
      { color: contentColor, fontSize: tokens.font },
      getFontStyle(),
    ],
    [contentColor, tokens.font]
  );

  const iconNode = icon ? (
    <Icon name={icon} size={tokens.icon} color={contentColor} />
  ) : null;

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        containerStyle,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? <ActivityIndicator size="small" color={contentColor} /> : null}
      {!loading && iconNode && iconPos === 'left' ? iconNode : null}
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      {!loading && iconNode && iconPos === 'right' ? iconNode : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
  },
});
