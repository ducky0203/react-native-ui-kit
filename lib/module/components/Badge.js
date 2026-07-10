"use strict";

import { StyleSheet, Text, View } from 'react-native';
import { colors, severityColors } from "../theme/colors.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function Badge({
  value,
  severity = 'primary',
  size = 'normal',
  accessibilityLabel
}) {
  const text = value != null ? String(value) : '';
  return /*#__PURE__*/_jsx(View, {
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: accessibilityLabel ?? text,
    style: [styles.badge, sizeStyles[size], {
      backgroundColor: severityColors[severity]
    }],
    children: /*#__PURE__*/_jsx(Text, {
      numberOfLines: 1,
      style: [styles.text, fontSizeStyles[size], getFontStyle()],
      children: text
    })
  });
}
const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.textInverse,
    fontWeight: '700'
  }
});
const sizeStyles = StyleSheet.create({
  small: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4
  },
  normal: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6
  },
  large: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 8
  }
});
const fontSizeStyles = StyleSheet.create({
  small: {
    fontSize: fontSize.small
  },
  normal: {
    fontSize: fontSize.default
  },
  large: {
    fontSize: fontSize.large
  }
});
//# sourceMappingURL=Badge.js.map