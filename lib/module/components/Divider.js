"use strict";

import { StyleSheet, Text, View } from 'react-native';
import { colors } from "../theme/colors.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Divider({
  layout = 'horizontal',
  label,
  style
}) {
  if (layout === 'vertical') {
    return /*#__PURE__*/_jsx(View, {
      style: [styles.vertical, style]
    });
  }
  if (label) {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.labelRow, style],
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.line
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.label, getFontStyle()],
        children: label
      }), /*#__PURE__*/_jsx(View, {
        style: styles.line
      })]
    });
  }
  return /*#__PURE__*/_jsx(View, {
    style: [styles.horizontal, style]
  });
}
const styles = StyleSheet.create({
  horizontal: {
    alignSelf: 'stretch',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  vertical: {
    alignSelf: 'stretch',
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.textMuted
  }
});
//# sourceMappingURL=Divider.js.map