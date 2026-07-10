import React from 'react';
import type { BaseToastProps, ToastIconConfig } from '../types';
interface ExtendedBaseToastProps extends BaseToastProps {
    onClose?: () => void;
    hideCloseButton?: boolean;
    iconConfig?: ToastIconConfig;
}
export declare const BaseToast: React.FC<ExtendedBaseToastProps>;
export {};
//# sourceMappingURL=BaseToast.d.ts.map