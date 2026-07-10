import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
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

  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const placedRef = useRef(false);
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const moveIndicator = (target: number) => {
    const layout = layoutsRef.current[target];
    if (!layout) {
      return;
    }
    const config = {
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    };
    Animated.parallel([
      Animated.timing(indicatorX, { toValue: layout.x, ...config }),
      Animated.timing(indicatorWidth, { toValue: layout.width, ...config }),
    ]).start();
  };

  const select = (next: number) => {
    setIndex(next);
    moveIndicator(next);
    // Fade the panel content in on each tab change.
    contentOpacity.setValue(0);
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: motionDuration.fadeIn,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    onChange?.(next);
  };

  const handleTabLayout = (i: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    layoutsRef.current[i] = { x, width };
    if (i === index) {
      // Initial placement (no animation) so the indicator sits under the active
      // tab on first paint without sliding from 0.
      if (!placedRef.current) {
        placedRef.current = true;
        indicatorX.setValue(x);
        indicatorWidth.setValue(width);
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

  const indicatorStyle = {
    transform: [{ translateX: indicatorX }],
    width: indicatorWidth,
  };

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
          <Animated.View key={index} style={{ opacity: contentOpacity }}>
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
