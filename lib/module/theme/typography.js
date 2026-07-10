"use strict";

export const fontSize = {
  default: 14,
  small: 12,
  large: 16
};
export const lineHeight = {
  default: 20,
  small: 16
};
export const themeFont = {
  family: undefined
};
export function getFontStyle() {
  return themeFont.family ? {
    fontFamily: themeFont.family
  } : {};
}
//# sourceMappingURL=typography.js.map