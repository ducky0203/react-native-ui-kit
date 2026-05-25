import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { motionDuration } from '../theme/motion';

export type PanelProps = {
  header?: string;
  /** Show a collapse/expand toggle in the header. */
  toggleable?: boolean;
  defaultCollapsed?: boolean;
  children?: ReactNode;
};

function Chevron({ collapsed }: { collapsed: boolean }) {
  const rotation = useDerivedValue(() =>
    withTiming(collapsed ? 0 : 180, {
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
    })
  );
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <Animated.View style={style}>
      <Icon name="chevron-down" size={20} color={colors.textMuted} />
    </Animated.View>
  );
}

export function Panel({
  header,
  toggleable = false,
  defaultCollapsed = false,
  children,
}: PanelProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = () => {
    setCollapsed((value) => !value);
  };

  const title = header ? (
    <Typography variant="h4" style={styles.title}>
      {header}
    </Typography>
  ) : null;

  return (
    <Animated.View
      layout={LinearTransition.duration(motionDuration.layout).easing(
        Easing.out(Easing.cubic)
      )}
      style={styles.panel}
    >
      {header ? (
        toggleable ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={header}
            accessibilityState={{ expanded: !collapsed }}
            onPress={toggle}
            style={styles.header}
          >
            {title}
            <Chevron collapsed={collapsed} />
          </Pressable>
        ) : (
          <View style={styles.header}>{title}</View>
        )
      ) : null}
      {collapsed ? null : (
        <Animated.View
          entering={FadeIn.duration(motionDuration.fadeIn)}
          exiting={FadeOut.duration(motionDuration.fadeOut)}
          style={styles.body}
        >
          {children}
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.surfaceMuted,
  },
  title: {
    flex: 1,
  },
  body: {
    padding: 14,
  },
});
