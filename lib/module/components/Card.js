"use strict";

import { StyleSheet, View } from 'react-native';
import { Typography } from "./Typography.js";
import { colors } from "../theme/colors.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Card({
  title,
  subTitle,
  header,
  footer,
  children,
  style
}) {
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.card, style],
    children: [header ? /*#__PURE__*/_jsx(View, {
      style: styles.header,
      children: header
    }) : null, title ? /*#__PURE__*/_jsx(Typography, {
      variant: "h3",
      children: title
    }) : null, subTitle ? /*#__PURE__*/_jsx(Typography, {
      variant: "bodySmall",
      color: colors.textMuted,
      children: subTitle
    }) : null, children ? /*#__PURE__*/_jsx(View, {
      style: styles.body,
      children: children
    }) : null, footer ? /*#__PURE__*/_jsx(View, {
      style: styles.footer,
      children: footer
    }) : null]
  });
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 2
  },
  header: {
    marginBottom: 8
  },
  body: {
    marginTop: 8
  },
  footer: {
    marginTop: 12
  }
});
//# sourceMappingURL=Card.js.map