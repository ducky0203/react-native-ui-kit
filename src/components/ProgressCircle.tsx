import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
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
  const progress = useRef(new Animated.Value(pct)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: pct,
      duration: motionDuration.progress,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [pct, progress]);

  // Each colored layer is a ring with two adjacent sides painted (a 180deg
  // arc once rotated +45deg). A half-width clip reveals only the wanted part.
  // Right ring sweeps 0-50% then parks; left ring sweeps the full range and
  // only becomes visible past the halfway point.
  const rightRotate = progress.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['-135deg', '45deg', '45deg'],
    extrapolate: 'clamp',
  });
  const leftRotate = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['-135deg', '225deg'],
    extrapolate: 'clamp',
  });
  const leftOpacity = progress.interpolate({
    inputRange: [0, 50, 50.0001, 100],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp',
  });

  const rightStyle = { transform: [{ rotate: rightRotate }] };
  const leftStyle = {
    transform: [{ rotate: leftRotate }],
    opacity: leftOpacity,
  };

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
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: colors.surfaceMuted,
          },
        ]}
      />

      <View
        style={[styles.clip, { width: radius, height: size, left: radius }]}
      >
        <Animated.View
          style={[ringBase, { marginLeft: -radius }, rightStyle]}
        />
      </View>

      <View
        style={[styles.clip, styles.clipLeft, { width: radius, height: size }]}
      >
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
  track: {
    position: 'absolute',
  },
  clip: {
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
  },
  clipLeft: {
    left: 0,
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
