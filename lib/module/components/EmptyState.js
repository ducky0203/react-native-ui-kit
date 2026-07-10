"use strict";

import { StyleSheet, View } from 'react-native';
import { Icon } from "./Icon.js";
import { Typography } from "./Typography.js";
import { colors } from "../theme/colors.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EmptyState({
  icon = 'inbox',
  title = 'No data',
  description,
  action
}) {
  return /*#__PURE__*/_jsxs(View, {
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: [title, description].filter(Boolean).join('. '),
    style: styles.container,
    children: [/*#__PURE__*/_jsx(Icon, {
      name: icon,
      size: 48,
      color: colors.textMuted
    }), /*#__PURE__*/_jsx(Typography, {
      variant: "h4",
      children: title
    }), description ? /*#__PURE__*/_jsx(Typography, {
      variant: "bodySmall",
      color: colors.textMuted,
      style: styles.description,
      children: description
    }) : null, action ? /*#__PURE__*/_jsx(View, {
      style: styles.action,
      children: action
    }) : null]
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8
  },
  description: {
    textAlign: 'center'
  },
  action: {
    marginTop: 8
  }
});
//# sourceMappingURL=EmptyState.js.map