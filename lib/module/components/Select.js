"use strict";

import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from "./Icon.js";
import { colors } from "../theme/colors.js";
import { fontSize } from "../theme/typography.js";
import { motionDuration } from "../theme/motion.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  invalid = false,
  helperText,
  errorText,
  maxDropdownHeight = 260
}) {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const selected = options.find(option => option.value === value);
  const message = invalid ? errorText : helperText;
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
  const openDropdown = () => {
    if (disabled) {
      return;
    }
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({
        x,
        y,
        width,
        height
      });
      setOpen(true);
    });
  };
  const close = () => setOpen(false);
  const handleSelect = option => {
    if (option.disabled) {
      return;
    }
    onChange?.(option.value);
    close();
  };
  const borderColor = invalid ? colors.danger : open ? colors.primary : colors.border;

  // Glue dropdown to trigger edge; flip above when space below is tight.
  const screen = Dimensions.get('window');
  const dropdownGap = 0;
  let dropdownPosition = {};
  let listHeight = maxDropdownHeight;
  if (anchor) {
    const triggerTop = anchor.y;
    const triggerBottom = anchor.y + anchor.height;
    const spaceBelow = screen.height - triggerBottom;
    const spaceAbove = triggerTop;
    const dropUp = spaceBelow < maxDropdownHeight && spaceAbove > spaceBelow;
    listHeight = Math.min(maxDropdownHeight, (dropUp ? spaceAbove : spaceBelow) - 8);
    dropdownPosition = dropUp ? {
      bottom: screen.height - triggerTop + dropdownGap,
      left: anchor.x,
      width: anchor.width,
      maxHeight: listHeight
    } : {
      top: triggerBottom + dropdownGap,
      left: anchor.x,
      width: anchor.width,
      maxHeight: listHeight
    };
  }
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [label ? /*#__PURE__*/_jsx(Text, {
      style: styles.label,
      children: label
    }) : null, /*#__PURE__*/_jsx(View, {
      ref: triggerRef,
      collapsable: false,
      children: /*#__PURE__*/_jsxs(Pressable, {
        accessibilityRole: "combobox",
        accessibilityLabel: label ?? placeholder,
        accessibilityState: {
          expanded: open,
          disabled
        },
        disabled: disabled,
        onPress: openDropdown,
        style: [styles.trigger, {
          borderColor
        }, disabled ? styles.disabled : null],
        children: [/*#__PURE__*/_jsx(Text, {
          numberOfLines: 1,
          style: [styles.value, selected ? null : styles.placeholder],
          children: selected ? selected.label : placeholder
        }), /*#__PURE__*/_jsx(Animated.View, {
          style: caretStyle,
          children: /*#__PURE__*/_jsx(Icon, {
            name: "chevron-down",
            size: 20,
            color: colors.textMuted
          })
        })]
      })
    }), message ? /*#__PURE__*/_jsx(Text, {
      accessibilityLiveRegion: invalid ? 'polite' : 'none',
      style: [styles.message, invalid ? styles.error : styles.helper],
      children: message
    }) : null, /*#__PURE__*/_jsx(Modal, {
      visible: open,
      transparent: true,
      animationType: "fade",
      onRequestClose: close,
      children: /*#__PURE__*/_jsx(Pressable, {
        accessibilityLabel: "Close dropdown",
        style: styles.backdrop,
        onPress: close,
        children: anchor ? /*#__PURE__*/_jsx(Animated.View, {
          onStartShouldSetResponder: () => true,
          style: [styles.dropdown, dropdownPosition, dropdownAnimStyle],
          children: /*#__PURE__*/_jsx(ScrollView, {
            bounces: false,
            keyboardShouldPersistTaps: "handled",
            children: options.map(option => {
              const isSelected = option.value === value;
              return /*#__PURE__*/_jsxs(Pressable, {
                accessibilityRole: "menuitem",
                accessibilityState: {
                  selected: isSelected,
                  disabled: option.disabled
                },
                disabled: option.disabled,
                onPress: () => handleSelect(option),
                style: ({
                  pressed
                }) => [styles.option, pressed ? styles.optionPressed : null, option.disabled ? styles.disabled : null],
                children: [/*#__PURE__*/_jsx(Text, {
                  numberOfLines: 1,
                  style: [styles.optionLabel, isSelected ? styles.optionLabelSelected : null],
                  children: option.label
                }), isSelected ? /*#__PURE__*/_jsx(Icon, {
                  name: "check",
                  size: 18,
                  color: colors.primary
                }) : null]
              }, option.label);
            })
          })
        }) : null
      })
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    gap: 6
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.text
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface
  },
  value: {
    flex: 1,
    fontSize: fontSize.default,
    color: colors.text
  },
  placeholder: {
    color: colors.textMuted
  },
  disabled: {
    opacity: 0.6
  },
  message: {
    fontSize: fontSize.small
  },
  helper: {
    color: colors.textMuted
  },
  error: {
    color: colors.danger
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  optionPressed: {
    backgroundColor: colors.surfaceMuted
  },
  optionLabel: {
    flex: 1,
    fontSize: fontSize.default,
    color: colors.text
  },
  optionLabelSelected: {
    color: colors.primary,
    fontWeight: '600'
  }
});
//# sourceMappingURL=Select.js.map