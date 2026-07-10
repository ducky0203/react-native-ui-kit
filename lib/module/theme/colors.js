"use strict";

export const colors = {
  primary: '#3B82F6',
  secondary: '#64748B',
  success: '#22C55E',
  info: '#06B6D4',
  warning: '#F59E0B',
  danger: '#EF4444',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  border: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#64748B',
  textInverse: '#FFFFFF'
};
export const severityColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
  danger: colors.danger
};
export function configureTheme(theme) {
  if (theme.colors) {
    Object.assign(colors, theme.colors);
    Object.assign(severityColors, {
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      info: colors.info,
      warning: colors.warning,
      danger: colors.danger
    });
  }
  if (theme.font?.family !== undefined) {
    const {
      themeFont
    } = require('./typography');
    themeFont.family = theme.font.family;
  }
}
//# sourceMappingURL=colors.js.map