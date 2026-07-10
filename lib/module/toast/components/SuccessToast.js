"use strict";

import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast } from "./BaseToast.js";
import { COLORS } from "../colors.js";
import { Icon } from "../../components/Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const SuccessToast = props => {
  const {
    iconConfig,
    styleOverride
  } = props;
  const bgColor = styleOverride?.backgroundColor ?? COLORS.success;
  const textColor = styleOverride?.color ?? COLORS.textInverse;
  return /*#__PURE__*/_jsx(BaseToast, {
    ...props,
    style: [styles.success, {
      backgroundColor: bgColor
    }, props.style],
    text1Style: [styles.text1, {
      color: textColor
    }, props.text1Style],
    text2Style: [styles.text2, {
      color: textColor
    }, props.text2Style],
    renderLeadingIcon: iconConfig?.hideLeadingIcon ? undefined : () => /*#__PURE__*/_jsx(Icon, {
      name: "check-circle",
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
  success: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success
  },
  text1: {
    fontWeight: '700'
  },
  text2: {
    opacity: 0.9
  }
});
//# sourceMappingURL=SuccessToast.js.map