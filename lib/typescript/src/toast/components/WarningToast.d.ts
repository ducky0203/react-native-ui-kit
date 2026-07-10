import React from 'react';
import type { BaseToastProps, ToastIconConfig, ToastStyleOverride } from '../types';
interface WarningToastProps extends BaseToastProps {
    hide?: () => void;
    iconConfig?: ToastIconConfig;
    styleOverride?: ToastStyleOverride;
}
export declare const WarningToast: React.FC<WarningToastProps>;
export {};
//# sourceMappingURL=WarningToast.d.ts.map