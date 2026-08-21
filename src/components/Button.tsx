import { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { control, controlHeight } from '../theme/sizing';
import { fontSize, getFontStyle } from '../theme/typography';

/** Fixed footprint of <ActivityIndicator size="small" /> on both platforms. */
const spinnerSize = 20;

export type ButtonSize = 'smallest' | 'small' | 'normal' | 'large';

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
  textStyle?: StyleProp<TextStyle>;
};

const sizeTokens: Record<
  ButtonSize,
  {
    height: number;
    paddingV: number;
    paddingH: number;
    font: number;
    icon: number;
    gap: number;
  }
> = {
  smallest: {
    height: controlHeight.smallest,
    paddingV: 2,
    paddingH: 8,
    font: fontSize.tiny,
    icon: 12,
    gap: 4,
  },
  small: {
    height: controlHeight.small,
    paddingV: 4,
    paddingH: 10,
    font: fontSize.small,
    icon: 14,
    gap: 4,
  },
  normal: {
    height: controlHeight.normal,
    paddingV: 8,
    paddingH: 16,
    font: fontSize.default,
    icon: 18,
    gap: 8,
  },
  large: {
    height: controlHeight.large,
    paddingV: 10,
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
  textStyle,
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
      borderWidth: outlined ? control.borderWidth : 0,
      minHeight: tokens.height,
      paddingVertical: tokens.paddingV,
      paddingHorizontal: text ? tokens.paddingH / 2 : tokens.paddingH,
      borderRadius: rounded ? 999 : control.borderRadius,
      opacity: isDisabled ? 0.5 : 1,
    }),
    [filled, tone, outlined, tokens, text, rounded, isDisabled]
  );

  const labelStyle = useMemo(
    () => [
      styles.label,
      { color: contentColor, fontSize: tokens.font },
      getFontStyle(),
      textStyle,
    ],
    [contentColor, tokens.font, textStyle]
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
      <View
        style={[
          styles.content,
          { gap: tokens.gap },
          loading && styles.contentHidden,
        ]}
      >
        {iconNode && iconPos === 'left' ? iconNode : null}
        {label ? <Text style={labelStyle}>{label}</Text> : null}
        {iconNode && iconPos === 'right' ? iconNode : null}
        {loading && !label && !iconNode ? (
          <View style={styles.spinnerSlot} />
        ) : null}
      </View>
      {loading ? (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="small" color={contentColor} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentHidden: {
    opacity: 0,
  },
  spinnerSlot: {
    width: spinnerSize,
    height: spinnerSize,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
