import type { ReactNode } from 'react';
import { type ToastAnimationType, type ToastContainerProps } from '../toast';
export type ToastSeverity = 'success' | 'info' | 'warning' | 'danger';
export type ToastOptions = {
    message: string;
    title?: string;
    severity?: ToastSeverity;
    /** Auto-dismiss delay in ms. Defaults to 3000. */
    duration?: number;
    position?: 'top' | 'bottom';
};
export declare function showToast({ message, title, severity, duration, position, }: ToastOptions): void;
export type ToastProviderProps = {
    children: ReactNode;
    animation?: ToastAnimationType;
    maxVisibleToasts?: number;
} & Partial<Pick<ToastContainerProps, 'topOffset' | 'bottomOffset' | 'position' | 'visibilityTime'>>;
export declare function ToastProvider({ children, animation, maxVisibleToasts, position, visibilityTime, topOffset, bottomOffset, }: ToastProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): {
    show: typeof showToast;
    hide: () => void;
    success: (text1: string, text2?: string, options?: Omit<import("..").ToastShowParams, "type">) => void;
    error: (text1: string, text2?: string, options?: Omit<import("..").ToastShowParams, "type">) => void;
    warning: (text1: string, text2?: string, options?: Omit<import("..").ToastShowParams, "type">) => void;
    info: (text1: string, text2?: string, options?: Omit<import("..").ToastShowParams, "type">) => void;
};
export { Toast, ToastContainer, uiKitToastConfig } from '../toast';
//# sourceMappingURL=Toast.d.ts.map