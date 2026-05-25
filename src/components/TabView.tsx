import { useEffect, useRef, useState, type ReactNode } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { motionDuration } from '../theme/motion';

export type TabItem = {
  title: string;
  content: ReactNode;
  icon?: IconName;
};

export type TabViewProps = {
  tabs: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
};

type TabLayout = { x: number; width: number };

export function TabView({ tabs, defaultIndex = 0, onChange }: TabViewProps) {
  const [index, setIndex] = useState(defaultIndex);
  const layoutsRef = useRef<Array<TabLayout | undefined>>([]);

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const moveIndicator = (target: number) => {
    const layout = layoutsRef.current[target];
    if (!layout) {
      return;
    }
    const config = {
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
    };
    indicatorX.value = withTiming(layout.x, config);
    indicatorWidth.value = withTiming(layout.width, config);
  };

  const select = (next: number) => {
    setIndex(next);
    moveIndicator(next);
    onChange?.(next);
  };

  const handleTabLayout = (i: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    layoutsRef.current[i] = { x, width };
    if (i === index) {
      // Initial placement (no animation) so the indicator sits under the active
      // tab on first paint without sliding from 0.
      if (indicatorWidth.value === 0) {
        indicatorX.value = x;
        indicatorWidth.value = width;
      } else {
        moveIndicator(i);
      }
    }
  };

  // Re-align indicator if the active index changed before layouts were known.
  useEffect(() => {
    moveIndicator(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  const active = tabs[index];

  return (
    <View style={styles.container}>
      <View accessibilityRole="tablist" style={styles.tabBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
          {tabs.map((tab, i) => {
            const isActive = i === index;
            return (
              <Pressable
                key={tab.title}
                accessibilityRole="tab"
                accessibilityLabel={tab.title}
                accessibilityState={{ selected: isActive }}
                onLayout={handleTabLayout(i)}
                onPress={() => select(i)}
                style={styles.tab}
              >
                {tab.icon ? (
                  <Icon
                    name={tab.icon}
                    size={16}
                    color={isActive ? colors.primary : colors.textMuted}
                  />
                ) : null}
                <Typography
                  variant="label"
                  color={isActive ? colors.primary : colors.textMuted}
                >
                  {tab.title}
                </Typography>
              </Pressable>
            );
          })}
          <Animated.View style={[styles.indicator, indicatorStyle]} />
        </ScrollView>
      </View>
      <View style={styles.panel}>
        {active ? (
          <Animated.View
            key={index}
            entering={FadeIn.duration(motionDuration.fadeIn).easing(
              Easing.out(Easing.cubic)
            )}
          >
            {active.content}
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  tabBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tabBarContent: {
    paddingHorizontal: 4,
    position: 'relative',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  panel: {
    padding: 14,
  },
});
