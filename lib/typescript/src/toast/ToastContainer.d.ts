import React from 'react';
import { ToastConfig, ToastData, ToastPosition, ToastStyleOverride, ToastAnimationType } from './types';
export interface ToastContainerProps {
    config?: ToastConfig;
    topOffset?: number;
    bottomOffset?: number;
    visibilityTime?: number;
    /** Maximum number of toasts visible in stack */
    maxVisibleToasts?: number;
    /** Default position for all toasts */
    position?: ToastPosition;
    /** Animation type: 'fade', 'slide', or 'slide-fade' (default) */
    animation?: ToastAnimationType;
    /** Style overrides for success toasts */
    success?: ToastStyleOverride;
    /** Style overrides for error toasts */
    error?: ToastStyleOverride;
    /** Style overrides for warning toasts */
    warning?: ToastStyleOverride;
    /** Style overrides for info toasts */
    info?: ToastStyleOverride;
}
export interface ToastItem extends ToastData {
    id: string;
    createdAt: number;
}
export declare const ToastContainer: React.FC<ToastContainerProps>;
//# sourceMappingURL=ToastContainer.d.ts.map