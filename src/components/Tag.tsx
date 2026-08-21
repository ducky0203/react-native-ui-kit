import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { fontSize, getFontStyle, lineHeight } from '../theme/typography';

export type TagProps = {
  value?: string;
  severity?: Severity;
  icon?: IconName;
  rounded?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Tag({
  value,
  severity = 'primary',
  icon,
  rounded = false,
  style,
  textStyle,
}: TagProps) {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={value}
      style={[
        styles.tag,
        rounded ? styles.tagRounded : styles.tagSquare,
        { backgroundColor: severityColors[severity] },
        style,
      ]}
    >
      {icon ? <Icon name={icon} size={11} color={colors.textInverse} /> : null}
      {value ? (
        <Text style={[styles.text, getFontStyle(), textStyle]}>{value}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagRounded: { borderRadius: 999 },
  tagSquare: { borderRadius: 3 },
  text: {
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: '600',
    color: colors.textInverse,
  },
});
