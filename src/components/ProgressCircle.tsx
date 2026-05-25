import { useEffect } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, severityColors, type Severity } from '../theme/colors';
import { motionDuration } from '../theme/motion';
import { fontSize } from '../theme/typography';

export type ProgressCircleProps = {
  /** Progress value, 0-100. */
  value?: number;
  size?: number;
  strokeWidth?: number;
  severity?: Severity;
  showValue?: boolean;
};

export function ProgressCircle({
  value = 0,
  size = 96,
  strokeWidth = 8,
  severity = 'primary',
  showValue = true,
}: ProgressCircleProps) {
  const tone = severityColors[severity];
  const pct = Math.min(100, Math.max(0, value));
  const radius = size / 2;

  // `progress` is the live, animated 0-100 value driving both half-rings.
  const progress = useSharedValue(pct);
  useEffect(() => {
    progress.value = withTiming(pct, {
      duration: motionDuration.progress,
      easing: Easing.out(Easing.cubic),
    });
  }, [pct, progress]);

  // Each colored layer is a ring with two adjacent sides painted (a 180deg
  // arc once rotated +45deg). A half-width clip reveals only the wanted part.
  const rightRotation = useDerivedValue(() => {
    const angle = (progress.value / 100) * 360;
    return progress.value <= 50 ? angle - 180 : 0;
  });
  const leftRotation = useDerivedValue(() => {
    const angle = (progress.value / 100) * 360;
    return angle - 180;
  });
  const leftVisible = useDerivedValue(() => (progress.value > 50 ? 1 : 0));

  const rightStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${45 + rightRotation.value}deg` }],
  }));
  const leftStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${45 + leftRotation.value}deg` }],
    opacity: leftVisible.value,
  }));

  const ringBase: ViewStyle = {
    width: size,
    height: size,
    borderRadius: radius,
    borderWidth: strokeWidth,
    borderColor: 'transparent',
    borderTopColor: tone,
    borderRightColor: tone,
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={{ width: size, height: size }}
    >
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: radius,
          borderWidth: strokeWidth,
          borderColor: colors.surfaceMuted,
        }}
      />

      <View
        style={[styles.clip, { width: radius, height: size, left: radius }]}
      >
        <Animated.View
          style={[ringBase, { marginLeft: -radius }, rightStyle]}
        />
      </View>

      <View style={[styles.clip, { width: radius, height: size, left: 0 }]}>
        <Animated.View style={[ringBase, leftStyle]} />
      </View>

      {showValue ? (
        <View style={styles.center}>
          <Text style={styles.value}>{Math.round(pct)}%</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: fontSize.default,
    fontWeight: '700',
    color: colors.text,
  },
});
