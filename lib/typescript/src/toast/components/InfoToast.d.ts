import React from 'react';
import type { BaseToastProps, ToastIconConfig, ToastStyleOverride } from '../types';
interface InfoToastProps extends BaseToastProps {
    hide?: () => void;
    iconConfig?: ToastIconConfig;
    styleOverride?: ToastStyleOverride;
}
export declare const InfoToast: React.FC<InfoToastProps>;
export {};
//# sourceMappingURL=InfoToast.d.ts.map