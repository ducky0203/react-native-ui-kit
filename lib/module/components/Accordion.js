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
  open
}) {
  const rotation = useRef(new Animated.Value(open ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: open ? 1 : 0,
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [open, rotation]);
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
export function Accordion({
  items,
  multiple = false,
  defaultActiveIndices = []
}) {
  const [active, setActive] = useState(defaultActiveIndices);
  const toggle = index => {
    LayoutAnimation.configureNext(LAYOUT_ANIMATION);
    setActive(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return multiple ? [...prev, index] : [index];
    });
  };
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: items.map((item, index) => {
      const isOpen = active.includes(index);
      return /*#__PURE__*/_jsxs(View, {
        style: [styles.item, index > 0 ? styles.itemBordered : null],
        children: [/*#__PURE__*/_jsxs(Pressable, {
          accessibilityRole: "button",
          accessibilityLabel: item.title,
          accessibilityState: {
            expanded: isOpen
          },
          onPress: () => toggle(index),
          style: ({
            pressed
          }) => [styles.header, pressed ? styles.pressed : null],
          children: [item.icon ? /*#__PURE__*/_jsx(Icon, {
            name: item.icon,
            size: 18,
            color: colors.primary
          }) : null, /*#__PURE__*/_jsx(Typography, {
            variant: "label",
            style: styles.title,
            children: item.title
          }), /*#__PURE__*/_jsx(Chevron, {
            open: isOpen
          })]
        }), isOpen ? /*#__PURE__*/_jsx(View, {
          style: styles.body,
          children: item.content
        }) : null]
      }, item.title);
    })
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
  item: {
    overflow: 'hidden'
  },
  itemBordered: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14
  },
  pressed: {
    backgroundColor: colors.surfaceMuted
  },
  title: {
    flex: 1
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14
  }
});
//# sourceMappingURL=Accordion.js.map