import type { ToastConfig } from './types';
import { SuccessToast } from './components/SuccessToast';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { WarningToast } from './components/WarningToast';
import { BaseToast } from './components/BaseToast';

/** Toast layouts using UI kit theme, icons, and typography. */
export const uiKitToastConfig: ToastConfig = {
  success: (props) => <SuccessToast {...props} />,
  error: (props) => <ErrorToast {...props} />,
  danger: (props) => <ErrorToast {...props} />,
  info: (props) => <InfoToast {...props} />,
  warning: (props) => <WarningToast {...props} />,
  base: (props) => <BaseToast {...props} onClose={props.hide} />,
};
