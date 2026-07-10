"use strict";

import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Icon } from "./Icon.js";
import { Typography } from "./Typography.js";
import { colors } from "../theme/colors.js";
import { motionDuration } from "../theme/motion.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TabView({
  tabs,
  defaultIndex = 0,
  onChange
}) {
  const [index, setIndex] = useState(defaultIndex);
  const layoutsRef = useRef([]);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const placedRef = useRef(false);
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const moveIndicator = target => {
    const layout = layoutsRef.current[target];
    if (!layout) {
      return;
    }
    const config = {
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    };
    Animated.parallel([Animated.timing(indicatorX, {
      toValue: layout.x,
      ...config
    }), Animated.timing(indicatorWidth, {
      toValue: layout.width,
      ...config
    })]).start();
  };
  const select = next => {
    setIndex(next);
    moveIndicator(next);
    // Fade the panel content in on each tab change.
    contentOpacity.setValue(0);
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: motionDuration.fadeIn,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
    onChange?.(next);
  };
  const handleTabLayout = i => event => {
    const {
      x,
      width
    } = event.nativeEvent.layout;
    layoutsRef.current[i] = {
      x,
      width
    };
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
    transform: [{
      translateX: indicatorX
    }],
    width: indicatorWidth
  };
  const active = tabs[index];
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(View, {
      accessibilityRole: "tablist",
      style: styles.tabBar,
      children: /*#__PURE__*/_jsxs(ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: styles.tabBarContent,
        children: [tabs.map((tab, i) => {
          const isActive = i === index;
          return /*#__PURE__*/_jsxs(Pressable, {
            accessibilityRole: "tab",
            accessibilityLabel: tab.title,
            accessibilityState: {
              selected: isActive
            },
            onLayout: handleTabLayout(i),
            onPress: () => select(i),
            style: styles.tab,
            children: [tab.icon ? /*#__PURE__*/_jsx(Icon, {
              name: tab.icon,
              size: 16,
              color: isActive ? colors.primary : colors.textMuted
            }) : null, /*#__PURE__*/_jsx(Typography, {
              variant: "label",
              color: isActive ? colors.primary : colors.textMuted,
              children: tab.title
            })]
          }, tab.title);
        }), /*#__PURE__*/_jsx(Animated.View, {
          style: [styles.indicator, indicatorStyle]
        })]
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.panel,
      children: active ? /*#__PURE__*/_jsx(Animated.View, {
        style: {
          opacity: contentOpacity
        },
        children: active.content
      }, index) : null
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    backgroundColor: colors.surface,
    overflow: 'hidden'
  },
  tabBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  tabBarContent: {
    paddingHorizontal: 4,
    position: 'relative'
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1
  },
  panel: {
    padding: 14
  }
});
//# sourceMappingURL=TabView.js.map