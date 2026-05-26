import { Image, StyleSheet, Text, View } from 'react-native';
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
};

export function Avatar({
  label,
  icon,
  image,
  size = 'normal',
  shape = 'circle',
  severity,
  accessibilityLabel,
}: AvatarProps) {
  const background = severity ? severityColors[severity] : colors.surfaceMuted;
  const foreground = severity ? colors.textInverse : colors.text;
  const a11yLabel =
    accessibilityLabel ?? (label ? `Avatar ${label}` : 'Avatar');

  const sizeStyle = sizeStyles[size];
  const shapeStyle = shape === 'circle' ? circleStyles[size] : styles.square;

  if (image) {
    return (
      <Image
        accessible
        accessibilityRole="image"
        accessibilityLabel={a11yLabel}
        source={{ uri: image }}
        style={[sizeStyle, shapeStyle]}
      />
    );
  }

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={a11yLabel}
      style={[styles.placeholder, sizeStyle, shapeStyle, { backgroundColor: background }]}
    >
      {icon ? (
        <Icon name={icon} size={iconSizes[size]} color={foreground} />
      ) : (
        <Text
          style={[styles.label, labelStyles[size], { color: foreground }, getFontStyle()]}
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
  label: {
    fontWeight: '700',
  },
  square: {
    borderRadius: 8,
  },
});

const sizeStyles = StyleSheet.create({
  normal: { width: 40, height: 40 },
  large:  { width: 56, height: 56 },
  xlarge: { width: 72, height: 72 },
});

// borderRadius = dim / 2 cho circle
const circleStyles = StyleSheet.create({
  normal: { borderRadius: 20 },
  large:  { borderRadius: 28 },
  xlarge: { borderRadius: 36 },
});

// fontSize = dim * 0.4
const labelStyles = StyleSheet.create({
  normal: { fontSize: 16 },
  large:  { fontSize: 22 },
  xlarge: { fontSize: 29 },
});

// icon size = dim * 0.5
const iconSizes: Record<AvatarSize, number> = {
  normal: 20,
  large:  28,
  xlarge: 36,
};
