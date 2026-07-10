"use strict";

import { Fragment, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from "./Icon.js";
import { colors, severityColors } from "../theme/colors.js";
import { motionDuration } from "../theme/motion.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Menu({
  items,
  triggerLabel = 'Menu',
  triggerIcon = 'more-vertical',
  renderTrigger,
  disabled = false,
  align = 'start',
  width = 200,
  maxHeight = 280,
  style
}) {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const caretRotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(caretRotation, {
      toValue: open ? 1 : 0,
      duration: motionDuration.micro,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [open, caretRotation]);
  const caretStyle = {
    transform: [{
      rotate: caretRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      })
    }]
  };

  // Subtle fade for the dropdown surface (modal handles backdrop fade).
  const dropdownProgress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (open && anchor) {
      dropdownProgress.setValue(0);
      Animated.timing(dropdownProgress, {
        toValue: 1,
        duration: motionDuration.micro,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }).start();
    }
  }, [open, anchor, dropdownProgress]);
  const dropdownAnimStyle = {
    opacity: dropdownProgress
  };
  const openMenu = () => {
    if (disabled) {
      return;
    }
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({
        x,
        y,
        width: w,
        height: h
      });
      setOpen(true);
    });
  };
  const close = () => setOpen(false);
  const toggle = () => open ? close() : openMenu();
  const handlePress = item => {
    if (item.disabled) {
      return;
    }
    close();
    item.onPress?.();
  };
  const screen = Dimensions.get('window');
  const dropdownWidth = width;
  const dropdownGap = 0;
  let dropdownPosition = {};
  let listHeight = maxHeight;
  if (anchor) {
    const triggerTop = anchor.y;
    const triggerBottom = anchor.y + anchor.height;
    const spaceBelow = screen.height - triggerBottom;
    const spaceAbove = triggerTop;
    const dropUp = spaceBelow < maxHeight && spaceAbove > spaceBelow;
    listHeight = Math.min(maxHeight, (dropUp ? spaceAbove : spaceBelow) - 8);
    const rawLeft = align === 'end' ? anchor.x + anchor.width - dropdownWidth : anchor.x;
    const left = Math.max(8, Math.min(rawLeft, screen.width - dropdownWidth - 8));
    dropdownPosition = dropUp ? {
      bottom: screen.height - triggerTop + dropdownGap,
      left,
      width: dropdownWidth,
      maxHeight: listHeight
    } : {
      top: triggerBottom + dropdownGap,
      left,
      width: dropdownWidth,
      maxHeight: listHeight
    };
  }
  return /*#__PURE__*/_jsxs(View, {
    ref: triggerRef,
    collapsable: false,
    style: style,
    children: [renderTrigger ? renderTrigger({
      open,
      toggle
    }) : /*#__PURE__*/_jsxs(Pressable, {
      accessibilityRole: "button",
      accessibilityLabel: triggerLabel,
      accessibilityState: {
        expanded: open,
        disabled
      },
      disabled: disabled,
      onPress: toggle,
      style: ({
        pressed
      }) => [styles.trigger, pressed && !disabled ? styles.triggerPressed : null, disabled ? styles.disabled : null],
      children: [triggerIcon ? /*#__PURE__*/_jsx(Icon, {
        name: triggerIcon,
        size: 18,
        color: colors.text
      }) : null, triggerLabel ? /*#__PURE__*/_jsx(Text, {
        style: [styles.triggerLabel, getFontStyle()],
        children: triggerLabel
      }) : null, /*#__PURE__*/_jsx(Animated.View, {
        style: caretStyle,
        children: /*#__PURE__*/_jsx(Icon, {
          name: "chevron-down",
          size: 18,
          color: colors.textMuted
        })
      })]
    }), /*#__PURE__*/_jsx(Modal, {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: close,
      children: /*#__PURE__*/_jsx(Pressable, {
        accessibilityLabel: "Close menu",
        style: styles.backdrop,
        onPress: close,
        children: anchor ? /*#__PURE__*/_jsx(Animated.View, {
          accessibilityRole: "menu",
          onStartShouldSetResponder: () => true,
          style: [styles.dropdown, dropdownPosition, dropdownAnimStyle],
          children: /*#__PURE__*/_jsx(ScrollView, {
            bounces: false,
            keyboardShouldPersistTaps: "handled",
            children: items.map((item, index) => {
              const tone = item.severity ? severityColors[item.severity] : colors.text;
              return /*#__PURE__*/_jsxs(Fragment, {
                children: [index > 0 ? /*#__PURE__*/_jsx(View, {
                  style: styles.separator
                }) : null, /*#__PURE__*/_jsxs(Pressable, {
                  accessibilityRole: "menuitem",
                  accessibilityLabel: item.label,
                  accessibilityState: {
                    disabled: item.disabled
                  },
                  disabled: item.disabled,
                  onPress: () => handlePress(item),
                  style: ({
                    pressed
                  }) => [styles.item, pressed ? styles.itemPressed : null, item.disabled ? styles.disabled : null],
                  children: [item.icon ? /*#__PURE__*/_jsx(Icon, {
                    name: item.icon,
                    size: 18,
                    color: tone
                  }) : null, /*#__PURE__*/_jsx(Text, {
                    style: [styles.itemLabel, {
                      color: tone
                    }, getFontStyle()],
                    children: item.label
                  })]
                })]
              }, item.label);
            })
          })
        }) : null
      })
    })]
  });
}
const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  triggerPressed: {
    backgroundColor: colors.surfaceMuted
  },
  triggerLabel: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.text
  },
  disabled: {
    opacity: 0.5
  },
  backdrop: {
    flex: 1
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 6,
    overflow: 'hidden'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  itemPressed: {
    backgroundColor: colors.surfaceMuted
  },
  itemLabel: {
    flex: 1,
    fontSize: fontSize.default
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  }
});
//# sourceMappingURL=Menu.js.map