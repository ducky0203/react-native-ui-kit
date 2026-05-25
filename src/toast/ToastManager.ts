// @ts-nocheck
import { ToastShowParams, ToastData } from './types';

type Listener = (data: ToastData) => void;

class ToastManager {
  private listeners: Set<Listener> = new Set();
  private hideListeners: Set<() => void> = new Set();

  /**
   * Subscribe to toast show events
   */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Subscribe to toast hide events
   */
  subscribeToHide(listener: () => void): () => void {
    this.hideListeners.add(listener);
    return () => {
      this.hideListeners.delete(listener);
    };
  }

  /**
   * Show a toast
   */
  show(params: ToastShowParams): void {
    const data: ToastData = {
      ...params,
      isVisible: true,
    };

    this.listeners.forEach((listener) => listener(data));
  }

  /**
   * Show a success toast
   */
  success(
    text1: string,
    text2?: string,
    options?: Omit<ToastShowParams, 'type'>
  ): void {
    this.show({
      type: 'success',
      text1,
      text2,
      ...options,
    });
  }

  /**
   * Show an error toast
   */
  error(
    text1: string,
    text2?: string,
    options?: Omit<ToastShowParams, 'type'>
  ): void {
    this.show({
      type: 'error',
      text1,
      text2,
      ...options,
    });
  }

  /**
   * Show a warning toast
   */
  warning(
    text1: string,
    text2?: string,
    options?: Omit<ToastShowParams, 'type'>
  ): void {
    this.show({
      type: 'warning',
      text1,
      text2,
      ...options,
    });
  }

  /**
   * Show an info toast
   */
  info(
    text1: string,
    text2?: string,
    options?: Omit<ToastShowParams, 'type'>
  ): void {
    this.show({
      type: 'info',
      text1,
      text2,
      ...options,
    });
  }

  /**
   * Hide the currently visible toast
   */
  /**
   * Remove all listeners
   */
  clearAll(): void {
    this.listeners.clear();
    this.hideListeners.clear();
  }

  hide(): void {
    this.hideListeners.forEach((listener) => listener());
  }
}

export const toastManager = new ToastManager();
