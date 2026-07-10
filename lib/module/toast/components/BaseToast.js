"use strict";

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from "../../theme/colors.js";
import { fontSize } from "../../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const BaseToast = ({
  text1,
  text2,
  onPress,
  onClose,
  hideCloseButton = false,
  activeOpacity = 0.8,
  style,
  contentContainerStyle,
  text1Style,
  text2Style,
  text1NumberOfLines = 1,
  text2NumberOfLines = 2,
  renderLeadingIcon,
  renderTrailingIcon,
  testID,
  accessibilityLabel,
  iconConfig,
  backgroundColor
}) => {
  const hideLeadingIcon = iconConfig?.hideLeadingIcon ?? false;
  const hideCloseIcon = iconConfig?.hideCloseIcon ?? hideCloseButton;
  const closeIconColor = iconConfig?.closeIconColor ?? colors.textMuted;
  return /*#__PURE__*/_jsxs(TouchableOpacity, {
    testID: testID,
    accessibilityLabel: accessibilityLabel,
    onPress: onPress,
    activeOpacity: onPress ? activeOpacity : 1,
    style: [styles.base, backgroundColor ? {
      backgroundColor
    } : undefined, style],
    children: [!hideLeadingIcon && renderLeadingIcon ? /*#__PURE__*/_jsx(View, {
      style: styles.iconWrapper,
      children: renderLeadingIcon()
    }) : null, /*#__PURE__*/_jsxs(View, {
      style: [styles.contentContainer, contentContainerStyle],
      children: [text1 ? /*#__PURE__*/_jsx(Text, {
        style: [styles.text1, text1Style],
        numberOfLines: text1NumberOfLines,
        children: text1
      }) : null, text2 ? /*#__PURE__*/_jsx(Text, {
        style: [styles.text2, text2Style],
        numberOfLines: text2NumberOfLines,
        children: text2
      }) : null]
    }), renderTrailingIcon ? renderTrailingIcon() : null, !hideCloseIcon ? /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: onClose,
      style: styles.closeButton,
      hitSlop: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      testID: "toast-close-button",
      children: /*#__PURE__*/_jsx(Text, {
        style: [styles.closeIcon, {
          color: closeIconColor
        }],
        children: "\u2715"
      })
    }) : null]
  });
};
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    width: '92%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    alignSelf: 'center',
    paddingVertical: 10,
    overflow: 'hidden'
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 14
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 2
  },
  text1: {
    fontSize: fontSize.default,
    fontWeight: '700',
    color: colors.text
  },
  text2: {
    fontSize: fontSize.default,
    color: colors.textMuted
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  closeIcon: {
    fontSize: fontSize.default,
    fontWeight: '600'
  }
});
//# sourceMappingURL=BaseToast.js.map