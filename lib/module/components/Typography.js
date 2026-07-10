"use strict";

import { Text } from 'react-native';
import { colors } from "../theme/colors.js";
import { fontSize, getFontStyle, lineHeight } from "../theme/typography.js";
import { jsx as _jsx } from "react/jsx-runtime";
const variantStyles = {
  h1: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: '700'
  },
  h2: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700'
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600'
  },
  h4: {
    fontSize: fontSize.default,
    lineHeight: lineHeight.default,
    fontWeight: '600'
  },
  body: {
    fontSize: fontSize.default,
    lineHeight: lineHeight.default,
    fontWeight: '400'
  },
  bodySmall: {
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: '400'
  },
  caption: {
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: '400'
  },
  label: {
    fontSize: fontSize.default,
    lineHeight: lineHeight.default,
    fontWeight: '600'
  }
};
export function Typography({
  children,
  variant = 'body',
  color = colors.text,
  numberOfLines,
  style
}) {
  const isHeading = variant.startsWith('h');
  return /*#__PURE__*/_jsx(Text, {
    accessibilityRole: isHeading ? 'header' : 'text',
    numberOfLines: numberOfLines,
    style: [variantStyles[variant], {
      color
    }, getFontStyle(), style],
    children: children
  });
}
//# sourceMappingURL=Typography.js.map