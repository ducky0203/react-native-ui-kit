import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
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

  const progress = useRef(new Animated.Value(pct)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: pct,
      duration: motionDuration.progress,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [pct, progress]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

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
              width,
            },
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
