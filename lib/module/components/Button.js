"use strict";

import { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Icon } from "./Icon.js";
import { colors, severityColors } from "../theme/colors.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sizeTokens = {
  small: {
    paddingV: 6,
    paddingH: 12,
    font: fontSize.small,
    icon: 16,
    gap: 6
  },
  normal: {
    paddingV: 10,
    paddingH: 16,
    font: fontSize.default,
    icon: 18,
    gap: 8
  },
  large: {
    paddingV: 14,
    paddingH: 20,
    font: fontSize.large,
    icon: 22,
    gap: 10
  }
};
export function Button({
  label,
  icon,
  iconPos = 'left',
  severity = 'primary',
  outlined = false,
  text = false,
  rounded = false,
  loading = false,
  disabled = false,
  size = 'normal',
  onPress,
  accessibilityLabel,
  accessibilityHint,
  style
}) {
  const tone = severityColors[severity];
  const tokens = sizeTokens[size];
  const isDisabled = disabled || loading;
  const filled = !outlined && !text;
  const contentColor = filled ? colors.textInverse : tone;
  const containerStyle = useMemo(() => ({
    backgroundColor: filled ? tone : 'transparent',
    borderColor: outlined ? tone : 'transparent',
    borderWidth: outlined ? 1.5 : 0,
    paddingVertical: tokens.paddingV,
    paddingHorizontal: text ? tokens.paddingH / 2 : tokens.paddingH,
    borderRadius: rounded ? 999 : 3,
    gap: tokens.gap,
    opacity: isDisabled ? 0.5 : 1
  }), [filled, tone, outlined, tokens, text, rounded, isDisabled]);
  const labelStyle = useMemo(() => [styles.label, {
    color: contentColor,
    fontSize: tokens.font
  }, getFontStyle()], [contentColor, tokens.font]);
  const iconNode = icon ? /*#__PURE__*/_jsx(Icon, {
    name: icon,
    size: tokens.icon,
    color: contentColor
  }) : null;
  return /*#__PURE__*/_jsxs(Pressable, {
    accessible: true,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityHint: accessibilityHint,
    accessibilityState: {
      disabled: isDisabled,
      busy: loading
    },
    disabled: isDisabled,
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.base, containerStyle, pressed && styles.pressed, style],
    children: [loading ? /*#__PURE__*/_jsx(ActivityIndicator, {
      size: "small",
      color: contentColor
    }) : null, !loading && iconNode && iconPos === 'left' ? iconNode : null, label ? /*#__PURE__*/_jsx(Text, {
      style: labelStyle,
      children: label
    }) : null, !loading && iconNode && iconPos === 'right' ? iconNode : null]
  });
}
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressed: {
    opacity: 0.75
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600'
  }
});
//# sourceMappingURL=Button.js.map