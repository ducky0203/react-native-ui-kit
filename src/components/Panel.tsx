import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { Icon } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { motionDuration } from '../theme/motion';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LAYOUT_ANIMATION = LayoutAnimation.create(
  motionDuration.layout,
  LayoutAnimation.Types.easeInEaseOut,
  LayoutAnimation.Properties.opacity
);

export type PanelProps = {
  header?: string;
  /** Show a collapse/expand toggle in the header. */
  toggleable?: boolean;
  defaultCollapsed?: boolean;
  children?: ReactNode;
};

function Chevron({ collapsed }: { collapsed: boolean }) {
  const rotation = useRef(new Animated.Value(collapsed ? 0 : 1)).current;
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: collapsed ? 0 : 1,
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [collapsed, rotation]);
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
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
    LayoutAnimation.configureNext(LAYOUT_ANIMATION);
    setCollapsed((value) => !value);
  };

  const title = header ? (
    <Typography variant="h4" style={styles.title}>
      {header}
    </Typography>
  ) : null;

  return (
    <View style={styles.panel}>
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
      {collapsed ? null : <View style={styles.body}>{children}</View>}
    </View>
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
