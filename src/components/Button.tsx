import {
  ActivityIndicator,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { motionDuration } from '../theme/motion';
import { fontSize, getFontStyle } from '../theme/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

  const pressed = useSharedValue(0);
  const baseOpacity = isDisabled ? 0.5 : 1;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * 0.04 }],
    opacity: baseOpacity * (1 - pressed.value * 0.2),
  }));

  const containerStyle: ViewStyle = {
    backgroundColor: filled ? tone : 'transparent',
    borderColor: outlined ? tone : 'transparent',
    borderWidth: outlined ? 1.5 : 0,
    paddingVertical: tokens.paddingV,
    paddingHorizontal: text ? tokens.paddingH / 2 : tokens.paddingH,
    borderRadius: rounded ? 999 : 3,
    gap: tokens.gap,
  };

  const iconNode = icon ? (
    <Icon name={icon} size={tokens.icon} color={contentColor} />
  ) : null;

  return (
    <AnimatedPressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={() => {
        pressed.value = withTiming(1, { duration: motionDuration.pressIn });
      }}
      onPressOut={() => {
        pressed.value = withTiming(0, { duration: motionDuration.pressOut });
      }}
      style={[styles.base, containerStyle, animatedStyle, style]}
    >
      {loading ? <ActivityIndicator size="small" color={contentColor} /> : null}
      {!loading && iconNode && iconPos === 'left' ? iconNode : null}
      {label ? (
        <Text
          style={[
            styles.label,
            { color: contentColor, fontSize: tokens.font },
            getFontStyle(),
          ]}
        >
          {label}
        </Text>
      ) : null}
      {!loading && iconNode && iconPos === 'right' ? iconNode : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
  },
});
