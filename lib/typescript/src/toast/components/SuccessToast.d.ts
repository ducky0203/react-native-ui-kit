import React from 'react';
import type { BaseToastProps, ToastIconConfig, ToastStyleOverride } from '../types';
interface SuccessToastProps extends BaseToastProps {
    hide?: () => void;
    iconConfig?: ToastIconConfig;
    styleOverride?: ToastStyleOverride;
}
export declare const SuccessToast: React.FC<SuccessToastProps>;
export {};
//# sourceMappingURL=SuccessToast.d.ts.map