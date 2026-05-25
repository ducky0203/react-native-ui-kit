import type { ToastType } from './types';
import { colors, severityColors } from '../theme/colors';

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
  textInverse: colors.textInverse,
};

export const getDefaultBackgroundColor = (type: ToastType): string => {
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

export const getDefaultTextColor = (type: ToastType): string => {
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

export const getDefaultBorderColor = (type: ToastType): string => {
  return getDefaultBackgroundColor(type);
};

export const getDefaultIconColor = (type: ToastType): string => {
  return getDefaultTextColor(type);
};
