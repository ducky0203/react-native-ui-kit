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

const sizeTokens: Record<AvatarSize, number> = {
  normal: 40,
  large: 56,
  xlarge: 72,
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
  const dim = sizeTokens[size];
  const radius = shape === 'circle' ? dim / 2 : 8;
  const background = severity ? severityColors[severity] : colors.surfaceMuted;
  const foreground = severity ? colors.textInverse : colors.text;
  const a11yLabel =
    accessibilityLabel ?? (label ? `Avatar ${label}` : 'Avatar');

  if (image) {
    return (
      <Image
        accessible
        accessibilityRole="image"
        accessibilityLabel={a11yLabel}
        source={{ uri: image }}
        style={{ width: dim, height: dim, borderRadius: radius }}
      />
    );
  }

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={a11yLabel}
      style={[
        styles.placeholder,
        {
          width: dim,
          height: dim,
          borderRadius: radius,
          backgroundColor: background,
        },
      ]}
    >
      {icon ? (
        <Icon name={icon} size={dim * 0.5} color={foreground} />
      ) : (
        <Text
          style={[
            styles.label,
            { fontSize: dim * 0.4, color: foreground },
            getFontStyle(),
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
  label: {
    fontWeight: '700',
  },
});
