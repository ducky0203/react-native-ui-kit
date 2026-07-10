"use strict";

import { colors, severityColors } from "../theme/colors.js";
export const COLORS = {
  success: severityColors.success,
  error: severityColors.danger,
  warning: severityColors.warning,
  warningText: colors.textInverse,
  info: severityColors.info,
  white: colors.surface,
  black: colors.text,
  text: colors.text,
  textSecondary: colors.textMuted,
  border: colors.border,
  shadow: '#000000',
  textInverse: colors.textInverse
};
export const getDefaultBackgroundColor = type => {
  switch (type) {
    case 'success':
      return COLORS.success;
    case 'error':
    case 'danger':
      return COLORS.error;
    case 'warning':
      return COLORS.warning;
    case 'info':
      return COLORS.info;
    default:
      return COLORS.white;
  }
};
export const getDefaultTextColor = type => {
  switch (type) {
    case 'success':
    case 'error':
    case 'danger':
    case 'warning':
    case 'info':
      return COLORS.textInverse;
    default:
      return COLORS.text;
  }
};
export const getDefaultBorderColor = type => {
  return getDefaultBackgroundColor(type);
};
export const getDefaultIconColor = type => {
  return getDefaultTextColor(type);
};
//# sourceMappingURL=colors.js.map