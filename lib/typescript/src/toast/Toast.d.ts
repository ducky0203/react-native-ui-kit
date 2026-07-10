import React from 'react';
import { ToastConfigParams, ToastAnimationType } from './types';
export interface ToastProps {
    config: ToastConfigParams;
    topOffset?: number;
    bottomOffset?: number;
    renderer: (params: ToastConfigParams) => React.ReactNode;
    /** Index in the stack (0 = front/newest) */
    stackIndex?: number;
    /** Total number of toasts */
    stackSize?: number;
    /** Animation type */
    animation?: ToastAnimationType;
    /** Whether the toast list is expanded */
    isExpanded?: boolean;
}
export declare const ANIMATION_CONFIG: {
    duration: number;
    useNativeDriver: boolean;
    scaleReduction: number;
    stackOffset: number;
    maxVisibleStack: number;
    opacityReduction: number;
    slideDistance: number;
    expandedHeight: number;
};
export declare const Toast: React.FC<ToastProps>;
//# sourceMappingURL=Toast.d.ts.map