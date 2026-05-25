import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { fontSize } from '../theme/typography';

export type DividerProps = {
  layout?: 'horizontal' | 'vertical';
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export function Divider({ layout = 'horizontal', label, style }: DividerProps) {
  if (layout === 'vertical') {
    return <View style={[styles.vertical, style]} />;
  }

  if (label) {
    return (
      <View style={[styles.labelRow, style]}>
        <View style={styles.line} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return <View style={[styles.horizontal, style]} />;
}

const styles = StyleSheet.create({
  horizontal: {
    alignSelf: 'stretch',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  vertical: {
    alignSelf: 'stretch',
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
