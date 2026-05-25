import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from './Icon';
import { colors } from '../theme/colors';
import { motionDuration } from '../theme/motion';
import { fontSize, getFontStyle } from '../theme/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ChipProps = {
  label?: string;
  icon?: IconName;
  removable?: boolean;
  onRemove?: () => void;
};

export function Chip({ label, icon, removable = false, onRemove }: ChipProps) {
  const pressed = useSharedValue(0);
  const removeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * 0.15 }],
    opacity: 1 - pressed.value * 0.3,
  }));

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={styles.chip}
    >
      {icon ? <Icon name={icon} size={14} color={colors.textMuted} /> : null}
      {label ? (
        <Text style={[styles.label, getFontStyle()]}>{label}</Text>
      ) : null}
      {removable ? (
        <AnimatedPressable
          accessibilityRole="button"
          accessibilityLabel={label ? `Remove ${label}` : 'Remove'}
          hitSlop={6}
          onPressIn={() => {
            pressed.value = withTiming(1, { duration: motionDuration.pressIn });
          }}
          onPressOut={() => {
            pressed.value = withTiming(0, {
              duration: motionDuration.pressOut,
            });
          }}
          onPress={onRemove}
          style={[styles.remove, removeStyle]}
        >
          <Icon name="x" size={14} color={colors.textMuted} />
        </AnimatedPressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '500',
    color: colors.text,
  },
  remove: {
    borderRadius: 999,
  },
});
