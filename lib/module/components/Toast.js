"use strict";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast, ToastContainer, uiKitToastConfig } from "../toast/index.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const severityType = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger'
};
export function showToast({
  message,
  title,
  severity = 'info',
  duration = 3000,
  position = 'top'
}) {
  const type = severityType[severity];
  Toast.show({
    type,
    text1: title ?? message,
    text2: title ? message : undefined,
    visibilityTime: duration,
    position
  });
}
export function ToastProvider({
  children,
  animation = 'slide-fade',
  maxVisibleToasts = 3,
  position = 'top',
  visibilityTime = 3000,
  topOffset,
  bottomOffset
}) {
  const insets = useSafeAreaInsets();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [children, /*#__PURE__*/_jsx(ToastContainer, {
      config: uiKitToastConfig,
      animation: animation,
      maxVisibleToasts: maxVisibleToasts,
      position: position,
      visibilityTime: visibilityTime,
      topOffset: topOffset ?? insets.top + 8,
      bottomOffset: bottomOffset ?? insets.bottom + 8
    })]
  });
}
export function useToast() {
  return {
    show: showToast,
    hide: () => Toast.hide(),
    success: Toast.success.bind(Toast),
    error: Toast.error.bind(Toast),
    warning: Toast.warning.bind(Toast),
    info: Toast.info.bind(Toast)
  };
}
export { Toast, ToastContainer, uiKitToastConfig } from "../toast/index.js";
//# sourceMappingURL=Toast.js.map