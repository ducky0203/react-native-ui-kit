import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from './BaseToast';
import type {
  BaseToastProps,
  ToastIconConfig,
  ToastStyleOverride,
} from '../types';
import { COLORS } from '../colors';
import { Icon } from '../../components/Icon';

interface ErrorToastProps extends BaseToastProps {
  hide?: () => void;
  iconConfig?: ToastIconConfig;
  styleOverride?: ToastStyleOverride;
}

export const ErrorToast: React.FC<ErrorToastProps> = (props) => {
  const { iconConfig, styleOverride } = props;
  const bgColor = styleOverride?.backgroundColor ?? COLORS.error;
  const textColor = styleOverride?.color ?? COLORS.textInverse;

  return (
    <BaseToast
      {...props}
      style={[styles.error, { backgroundColor: bgColor }, props.style]}
      text1Style={[styles.text1, { color: textColor }, props.text1Style]}
      text2Style={[styles.text2, { color: textColor }, props.text2Style]}
      renderLeadingIcon={
        iconConfig?.hideLeadingIcon
          ? undefined
          : () => (
              <Icon
                name="alert-octagon"
                size={iconConfig?.leadingIconSize ?? 20}
                color={iconConfig?.leadingIconColor ?? textColor}
              />
            )
      }
      onClose={props.hide}
      iconConfig={{
        ...iconConfig,
        closeIconColor: iconConfig?.closeIconColor ?? textColor,
      }}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  text1: {
    fontWeight: '700',
  },
  text2: {
    opacity: 0.9,
  },
});
