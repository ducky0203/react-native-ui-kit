import {
  Image,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { getFontStyle } from '../theme/typography';

export type AvatarSize = 'normal' | 'large' | 'xlarge';

export type AvatarProps = {
  label?: string;
  icon?: IconName;
  image?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  severity?: Severity;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const squareRadius = 8;

/**
 * Avatar text and icons scale with the box instead of using the shared font
 * scale: label = dim * 0.4, icon = dim * 0.5, circle radius = dim / 2.
 */
const metrics: Record<
  AvatarSize,
  { dim: number; label: number; icon: number }
> = {
  normal: { dim: 40, label: 16, icon: 20 },
  large: { dim: 56, label: 22, icon: 28 },
  xlarge: { dim: 72, label: 29, icon: 36 },
};

export function Avatar({
  label,
  icon,
  image,
  size = 'normal',
  shape = 'circle',
  severity,
  accessibilityLabel,
  style,
  textStyle,
}: AvatarProps) {
  const background = severity ? severityColors[severity] : colors.surfaceMuted;
  const foreground = severity ? colors.textInverse : colors.text;
  const a11yLabel =
    accessibilityLabel ?? (label ? `Avatar ${label}` : 'Avatar');

  const { dim, label: labelSize, icon: iconSize } = metrics[size];
  const boxStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: shape === 'circle' ? dim / 2 : squareRadius,
  };

  if (image) {
    // The image is wrapped so that `style` stays a plain ViewStyle and the
    // rounded corners still clip the photo.
    return (
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={a11yLabel}
        style={[styles.imageWrapper, boxStyle, style]}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={a11yLabel}
      style={[
        styles.placeholder,
        boxStyle,
        { backgroundColor: background },
        style,
      ]}
    >
      {icon ? (
        <Icon name={icon} size={iconSize} color={foreground} />
      ) : (
        <Text
          style={[
            styles.label,
            { fontSize: labelSize, color: foreground },
            getFontStyle(),
            textStyle,
          ]}
        >
          {label ? label.slice(0, 2).toUpperCase() : ''}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontWeight: '700',
  },
});
