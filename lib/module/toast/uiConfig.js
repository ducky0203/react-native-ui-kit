"use strict";

import { SuccessToast } from "./components/SuccessToast.js";
import { ErrorToast } from "./components/ErrorToast.js";
import { InfoToast } from "./components/InfoToast.js";
import { WarningToast } from "./components/WarningToast.js";
import { BaseToast } from "./components/BaseToast.js";

/** Toast layouts using UI kit theme, icons, and typography. */
import { jsx as _jsx } from "react/jsx-runtime";
export const uiKitToastConfig = {
  success: props => /*#__PURE__*/_jsx(SuccessToast, {
    ...props
  }),
  error: props => /*#__PURE__*/_jsx(ErrorToast, {
    ...props
  }),
  danger: props => /*#__PURE__*/_jsx(ErrorToast, {
    ...props
  }),
  info: props => /*#__PURE__*/_jsx(InfoToast, {
    ...props
  }),
  warning: props => /*#__PURE__*/_jsx(WarningToast, {
    ...props
  }),
  base: props => /*#__PURE__*/_jsx(BaseToast, {
    ...props,
    onClose: props.hide
  })
};
//# sourceMappingURL=uiConfig.js.map