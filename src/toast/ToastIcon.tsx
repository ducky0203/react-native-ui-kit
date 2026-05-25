// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastType } from './types';
import { getDefaultIconColor } from './colors';

interface IconProps {
  type: ToastType;
  color?: string;
  size?: number;
}

export const SuccessIcon: React.FC<Omit<IconProps, 'type'>> = ({
  color,
  size = 20,
}) => {
  const iconColor = color || getDefaultIconColor('success');
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={[
          styles.checkCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: iconColor,
          },
        ]}
      >
        <View
          style={[
            styles.checkMark,
            {
              width: size * 0.3,
              height: size * 0.5,
              borderColor: iconColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

export const ErrorIcon: React.FC<Omit<IconProps, 'type'>> = ({
  color,
  size = 20,
}) => {
  const iconColor = color || getDefaultIconColor('error');
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={[
          styles.errorCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: iconColor,
          },
        ]}
      >
        <View style={[styles.errorLine1, { backgroundColor: iconColor }]} />
        <View style={[styles.errorLine2, { backgroundColor: iconColor }]} />
      </View>
    </View>
  );
};

export const WarningIcon: React.FC<Omit<IconProps, 'type'>> = ({
  color,
  size = 20,
}) => {
  const iconColor = color || getDefaultIconColor('warning');
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={[
          styles.warningTriangle,
          {
            width: size,
            height: size,
            borderColor: iconColor,
          },
        ]}
      >
        <View style={[styles.warningLine, { backgroundColor: iconColor }]} />
        <View style={[styles.warningDot, { backgroundColor: iconColor }]} />
      </View>
    </View>
  );
};

export const InfoIcon: React.FC<Omit<IconProps, 'type'>> = ({
  color,
  size = 20,
}) => {
  const iconColor = color || getDefaultIconColor('info');
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={[
          styles.infoCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: iconColor,
          },
        ]}
      >
        <View style={[styles.infoDot, { backgroundColor: iconColor }]} />
        <View style={[styles.infoLine, { backgroundColor: iconColor }]} />
      </View>
    </View>
  );
};

export const ToastIcon: React.FC<IconProps> = ({ type, color, size = 20 }) => {
  switch (type) {
    case 'success':
      return <SuccessIcon color={color} size={size} />;
    case 'error':
      return <ErrorIcon color={color} size={size} />;
    case 'warning':
      return <WarningIcon color={color} size={size} />;
    case 'info':
      return <InfoIcon color={color} size={size} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Success Icon
  checkCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: '45deg' }, { translateY: -2 }],
  },
  // Error Icon
  errorCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLine1: {
    position: 'absolute',
    width: 2,
    height: 12,
    transform: [{ rotate: '45deg' }],
  },
  errorLine2: {
    position: 'absolute',
    width: 2,
    height: 12,
    transform: [{ rotate: '-45deg' }],
  },
  // Warning Icon
  warningTriangle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  warningLine: {
    width: 2,
    height: 8,
    marginBottom: 2,
  },
  warningDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
  },
  // Info Icon
  infoCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    marginBottom: 2,
  },
  infoLine: {
    width: 2,
    height: 8,
  },
});
