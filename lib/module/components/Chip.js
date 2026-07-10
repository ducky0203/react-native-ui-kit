"use strict";

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from "./Icon.js";
import { colors } from "../theme/colors.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Chip({
  label,
  icon,
  removable = false,
  onRemove
}) {
  return /*#__PURE__*/_jsxs(View, {
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: label,
    style: styles.chip,
    children: [icon ? /*#__PURE__*/_jsx(Icon, {
      name: icon,
      size: 14,
      color: colors.textMuted
    }) : null, label ? /*#__PURE__*/_jsx(Text, {
      style: [styles.label, getFontStyle()],
      children: label
    }) : null, removable ? /*#__PURE__*/_jsx(Pressable, {
      accessibilityRole: "button",
      accessibilityLabel: label ? `Remove ${label}` : 'Remove',
      hitSlop: 6,
      onPress: onRemove,
      style: ({
        pressed
      }) => [styles.remove, pressed && styles.pressed],
      children: /*#__PURE__*/_jsx(Icon, {
        name: "x",
        size: 14,
        color: colors.textMuted
      })
    }) : null]
  });
}
const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '500',
    color: colors.text
  },
  remove: {
    borderRadius: 999
  },
  pressed: {
    opacity: 0.5
  }
});
//# sourceMappingURL=Chip.js.map