"use strict";

import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from "./BaseToast.js";
import { COLORS } from "../colors.js";
import { Icon } from "../../components/Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const WarningToast = props => {
  const {
    iconConfig,
    styleOverride
  } = props;
  const bgColor = styleOverride?.backgroundColor ?? COLORS.warning;
  const textColor = styleOverride?.color ?? COLORS.textInverse;
  return /*#__PURE__*/_jsx(BaseToast, {
    ...props,
    style: [styles.warning, {
      backgroundColor: bgColor
    }, props.style],
    text1Style: [styles.text1, {
      color: textColor
    }, props.text1Style],
    text2Style: [styles.text2, {
      color: textColor
    }, props.text2Style],
    renderLeadingIcon: iconConfig?.hideLeadingIcon ? undefined : () => /*#__PURE__*/_jsx(Icon, {
      name: "alert-triangle",
      size: iconConfig?.leadingIconSize ?? 20,
      color: iconConfig?.leadingIconColor ?? textColor
    }),
    onClose: props.hide,
    iconConfig: {
      ...iconConfig,
      closeIconColor: iconConfig?.closeIconColor ?? textColor
    }
  });
};
const styles = StyleSheet.create({
  warning: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning
  },
  text1: {
    fontWeight: '700'
  },
  text2: {
    opacity: 0.9
  }
});
//# sourceMappingURL=WarningToast.js.map