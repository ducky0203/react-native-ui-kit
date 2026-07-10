"use strict";

import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from 'react-native';
import { Icon } from "./Icon.js";
import { Typography } from "./Typography.js";
import { colors } from "../theme/colors.js";
import { motionDuration } from "../theme/motion.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const LAYOUT_ANIMATION = LayoutAnimation.create(motionDuration.layout, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity);
function Chevron({
  collapsed
}) {
  const rotation = useRef(new Animated.Value(collapsed ? 0 : 1)).current;
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: collapsed ? 0 : 1,
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [collapsed, rotation]);
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  return /*#__PURE__*/_jsx(Animated.View, {
    style: {
      transform: [{
        rotate
      }]
    },
    children: /*#__PURE__*/_jsx(Icon, {
      name: "chevron-down",
      size: 20,
      color: colors.textMuted
    })
  });
}
export function Panel({
  header,
  toggleable = false,
  defaultCollapsed = false,
  children
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const toggle = () => {
    LayoutAnimation.configureNext(LAYOUT_ANIMATION);
    setCollapsed(value => !value);
  };
  const title = header ? /*#__PURE__*/_jsx(Typography, {
    variant: "h4",
    style: styles.title,
    children: header
  }) : null;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.panel,
    children: [header ? toggleable ? /*#__PURE__*/_jsxs(Pressable, {
      accessibilityRole: "button",
      accessibilityLabel: header,
      accessibilityState: {
        expanded: !collapsed
      },
      onPress: toggle,
      style: styles.header,
      children: [title, /*#__PURE__*/_jsx(Chevron, {
        collapsed: collapsed
      })]
    }) : /*#__PURE__*/_jsx(View, {
      style: styles.header,
      children: title
    }) : null, collapsed ? null : /*#__PURE__*/_jsx(View, {
      style: styles.body,
      children: children
    })]
  });
}
const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    backgroundColor: colors.surface,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.surfaceMuted
  },
  title: {
    flex: 1
  },
  body: {
    padding: 14
  }
});
//# sourceMappingURL=Panel.js.map