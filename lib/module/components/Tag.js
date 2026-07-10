"use strict";

import { StyleSheet, Text, View } from 'react-native';
import { Icon } from "./Icon.js";
import { colors, severityColors } from "../theme/colors.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Tag({
  value,
  severity = 'primary',
  icon,
  rounded = false
}) {
  return /*#__PURE__*/_jsxs(View, {
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: value,
    style: [styles.tag, rounded ? styles.tagRounded : styles.tagSquare, {
      backgroundColor: severityColors[severity]
    }],
    children: [icon ? /*#__PURE__*/_jsx(Icon, {
      name: icon,
      size: 12,
      color: colors.textInverse
    }) : null, value ? /*#__PURE__*/_jsx(Text, {
      style: [styles.text, getFontStyle()],
      children: value
    }) : null]
  });
}
const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  tagRounded: {
    borderRadius: 999
  },
  tagSquare: {
    borderRadius: 3
  },
  text: {
    fontSize: fontSize.default,
    fontWeight: '700',
    color: colors.textInverse
  }
});
//# sourceMappingURL=Tag.js.map