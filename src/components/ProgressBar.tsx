import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, severityColors, type Severity } from '../theme/colors';
import { motionDuration } from '../theme/motion';
import { fontSize, getFontStyle } from '../theme/typography';

export type ProgressBarProps = {
  /** Progress value, 0-100. */
  value?: number;
  severity?: Severity;
  showValue?: boolean;
  height?: number;
};

export function ProgressBar({
  value = 0,
  severity = 'primary',
  showValue = false,
  height = 8,
}: ProgressBarProps) {
  const tone = severityColors[severity];
  const pct = Math.min(100, Math.max(0, value));

  const progress = useSharedValue(pct);
  useEffect(() => {
    progress.value = withTiming(pct, {
      duration: motionDuration.progress,
      easing: Easing.out(Easing.cubic),
    });
  }, [pct, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
        style={[styles.track, { height, borderRadius: height / 2 }]}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: tone,
              borderRadius: height / 2,
            },
            fillStyle,
          ]}
        />
      </View>
      {showValue ? (
        <Text style={[styles.value, getFontStyle()]}>{Math.round(pct)}%</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  track: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  fill: {
    height: '100%',
  },
  value: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.textMuted,
    minWidth: 38,
    textAlign: 'right',
  },
});
