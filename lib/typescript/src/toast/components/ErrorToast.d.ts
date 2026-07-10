import React from 'react';
import type { BaseToastProps, ToastIconConfig, ToastStyleOverride } from '../types';
interface ErrorToastProps extends BaseToastProps {
    hide?: () => void;
    iconConfig?: ToastIconConfig;
    styleOverride?: ToastStyleOverride;
}
export declare const ErrorToast: React.FC<ErrorToastProps>;
export {};
//# sourceMappingURL=ErrorToast.d.ts.map