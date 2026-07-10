"use strict";

// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getDefaultIconColor } from "./colors.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SuccessIcon = ({
  color,
  size = 20
}) => {
  const iconColor = color || getDefaultIconColor('success');
  return /*#__PURE__*/_jsx(View, {
    style: [styles.iconContainer, {
      width: size,
      height: size
    }],
    children: /*#__PURE__*/_jsx(View, {
      style: [styles.checkCircle, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: iconColor
      }],
      children: /*#__PURE__*/_jsx(View, {
        style: [styles.checkMark, {
          width: size * 0.3,
          height: size * 0.5,
          borderColor: iconColor
        }]
      })
    })
  });
};
export const ErrorIcon = ({
  color,
  size = 20
}) => {
  const iconColor = color || getDefaultIconColor('error');
  return /*#__PURE__*/_jsx(View, {
    style: [styles.iconContainer, {
      width: size,
      height: size
    }],
    children: /*#__PURE__*/_jsxs(View, {
      style: [styles.errorCircle, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: iconColor
      }],
      children: [/*#__PURE__*/_jsx(View, {
        style: [styles.errorLine1, {
          backgroundColor: iconColor
        }]
      }), /*#__PURE__*/_jsx(View, {
        style: [styles.errorLine2, {
          backgroundColor: iconColor
        }]
      })]
    })
  });
};
export const WarningIcon = ({
  color,
  size = 20
}) => {
  const iconColor = color || getDefaultIconColor('warning');
  return /*#__PURE__*/_jsx(View, {
    style: [styles.iconContainer, {
      width: size,
      height: size
    }],
    children: /*#__PURE__*/_jsxs(View, {
      style: [styles.warningTriangle, {
        width: size,
        height: size,
        borderColor: iconColor
      }],
      children: [/*#__PURE__*/_jsx(View, {
        style: [styles.warningLine, {
          backgroundColor: iconColor
        }]
      }), /*#__PURE__*/_jsx(View, {
        style: [styles.warningDot, {
          backgroundColor: iconColor
        }]
      })]
    })
  });
};
export const InfoIcon = ({
  color,
  size = 20
}) => {
  const iconColor = color || getDefaultIconColor('info');
  return /*#__PURE__*/_jsx(View, {
    style: [styles.iconContainer, {
      width: size,
      height: size
    }],
    children: /*#__PURE__*/_jsxs(View, {
      style: [styles.infoCircle, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: iconColor
      }],
      children: [/*#__PURE__*/_jsx(View, {
        style: [styles.infoDot, {
          backgroundColor: iconColor
        }]
      }), /*#__PURE__*/_jsx(View, {
        style: [styles.infoLine, {
          backgroundColor: iconColor
        }]
      })]
    })
  });
};
export const ToastIcon = ({
  type,
  color,
  size = 20
}) => {
  switch (type) {
    case 'success':
      return /*#__PURE__*/_jsx(SuccessIcon, {
        color: color,
        size: size
      });
    case 'error':
      return /*#__PURE__*/_jsx(ErrorIcon, {
        color: color,
        size: size
      });
    case 'warning':
      return /*#__PURE__*/_jsx(WarningIcon, {
        color: color,
        size: size
      });
    case 'info':
      return /*#__PURE__*/_jsx(InfoIcon, {
        color: color,
        size: size
      });
    default:
      return null;
  }
};
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Success Icon
  checkCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkMark: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    transform: [{
      rotate: '45deg'
    }, {
      translateY: -2
    }]
  },
  // Error Icon
  errorCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorLine1: {
    position: 'absolute',
    width: 2,
    height: 12,
    transform: [{
      rotate: '45deg'
    }]
  },
  errorLine2: {
    position: 'absolute',
    width: 2,
    height: 12,
    transform: [{
      rotate: '-45deg'
    }]
  },
  // Warning Icon
  warningTriangle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  warningLine: {
    width: 2,
    height: 8,
    marginBottom: 2
  },
  warningDot: {
    width: 2,
    height: 2,
    borderRadius: 1
  },
  // Info Icon
  infoCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    marginBottom: 2
  },
  infoLine: {
    width: 2,
    height: 8
  }
});
//# sourceMappingURL=ToastIcon.js.map