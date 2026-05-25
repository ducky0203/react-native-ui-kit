import { StyleSheet, Text, View } from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { fontSize, getFontStyle } from '../theme/typography';

export type TagProps = {
  value?: string;
  severity?: Severity;
  icon?: IconName;
  rounded?: boolean;
};

export function Tag({
  value,
  severity = 'primary',
  icon,
  rounded = false,
}: TagProps) {
  const tone = severityColors[severity];

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={value}
      style={[
        styles.tag,
        { backgroundColor: tone, borderRadius: rounded ? 999 : 3 },
      ]}
    >
      {icon ? <Icon name={icon} size={12} color={colors.textInverse} /> : null}
      {value ? (
        <Text style={[styles.text, getFontStyle()]}>{value}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: fontSize.default,
    fontWeight: '700',
    color: colors.textInverse,
  },
});
