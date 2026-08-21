import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { colors, severityColors, type Severity } from '../theme/colors';
import { fontSize, getFontStyle } from '../theme/typography';

export type BadgeSize = 'small' | 'normal' | 'large';

export type BadgeProps = {
  value?: string | number;
  severity?: Severity;
  size?: BadgeSize;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Badge({
  value,
  severity = 'primary',
  size = 'normal',
  accessibilityLabel,
  style,
  textStyle,
}: BadgeProps) {
  const text = value != null ? String(value) : '';

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? text}
      style={[
        styles.badge,
        sizeStyles[size],
        { backgroundColor: severityColors[severity] },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[styles.text, textSizeStyles[size], getFontStyle(), textStyle]}
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
  small: { minWidth: 16, height: 16, borderRadius: 8, paddingHorizontal: 4 },
  normal: { minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 6 },
  large: { minWidth: 26, height: 26, borderRadius: 13, paddingHorizontal: 8 },
});

// One step below the matching control size: the text has to fit inside a circle
// as tall as the whole badge, so it cannot use the full-size body font.
const textSizeStyles = StyleSheet.create({
  small: { fontSize: fontSize.tiny },
  normal: { fontSize: fontSize.small },
  large: { fontSize: fontSize.default },
});
