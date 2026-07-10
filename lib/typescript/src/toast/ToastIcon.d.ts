import React from 'react';
import { ToastType } from './types';
interface IconProps {
    type: ToastType;
    color?: string;
    size?: number;
}
export declare const SuccessIcon: React.FC<Omit<IconProps, 'type'>>;
export declare const ErrorIcon: React.FC<Omit<IconProps, 'type'>>;
export declare const WarningIcon: React.FC<Omit<IconProps, 'type'>>;
export declare const InfoIcon: React.FC<Omit<IconProps, 'type'>>;
export declare const ToastIcon: React.FC<IconProps>;
export {};
//# sourceMappingURL=ToastIcon.d.ts.map