export type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

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
  textInverse: '#FFFFFF',
} as const;

export const severityColors: Record<Severity, string> = {
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
  danger: colors.danger,
};
