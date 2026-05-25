export type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export type Colors = {
  primary: string;
  secondary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
};

export const colors: Colors = {
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
  textInverse: '#FFFFFF',
};

export const severityColors: Record<Severity, string> = {
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
  danger: colors.danger,
};

export function configureTheme(theme: {
  colors?: Partial<Colors>;
  font?: { family?: string };
}): void {
  if (theme.colors) {
    Object.assign(colors, theme.colors);
    Object.assign(severityColors, {
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      info: colors.info,
      warning: colors.warning,
      danger: colors.danger,
    });
  }
  if (theme.font?.family !== undefined) {
    const { themeFont } = require('./typography');
    themeFont.family = theme.font.family;
  }
}
