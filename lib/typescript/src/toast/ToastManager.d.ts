import { ToastShowParams, ToastData } from './types';
type Listener = (data: ToastData) => void;
declare class ToastManager {
    private listeners;
    private hideListeners;
    /**
     * Subscribe to toast show events
     */
    subscribe(listener: Listener): () => void;
    /**
     * Subscribe to toast hide events
     */
    subscribeToHide(listener: () => void): () => void;
    /**
     * Show a toast
     */
    show(params: ToastShowParams): void;
    /**
     * Show a success toast
     */
    success(text1: string, text2?: string, options?: Omit<ToastShowParams, 'type'>): void;
    /**
     * Show an error toast
     */
    error(text1: string, text2?: string, options?: Omit<ToastShowParams, 'type'>): void;
    /**
     * Show a warning toast
     */
    warning(text1: string, text2?: string, options?: Omit<ToastShowParams, 'type'>): void;
    /**
     * Show an info toast
     */
    info(text1: string, text2?: string, options?: Omit<ToastShowParams, 'type'>): void;
    /**
     * Hide the currently visible toast
     */
    /**
     * Remove all listeners
     */
    clearAll(): void;
    hide(): void;
}
export declare const toastManager: ToastManager;
export {};
//# sourceMappingURL=ToastManager.d.ts.map