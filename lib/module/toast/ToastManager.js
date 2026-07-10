"use strict";

// @ts-nocheck

class ToastManager {
  listeners = new Set();
  hideListeners = new Set();

  /**
   * Subscribe to toast show events
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Subscribe to toast hide events
   */
  subscribeToHide(listener) {
    this.hideListeners.add(listener);
    return () => {
      this.hideListeners.delete(listener);
    };
  }

  /**
   * Show a toast
   */
  show(params) {
    const data = {
      ...params,
      isVisible: true
    };
    this.listeners.forEach(listener => listener(data));
  }

  /**
   * Show a success toast
   */
  success(text1, text2, options) {
    this.show({
      type: 'success',
      text1,
      text2,
      ...options
    });
  }

  /**
   * Show an error toast
   */
  error(text1, text2, options) {
    this.show({
      type: 'error',
      text1,
      text2,
      ...options
    });
  }

  /**
   * Show a warning toast
   */
  warning(text1, text2, options) {
    this.show({
      type: 'warning',
      text1,
      text2,
      ...options
    });
  }

  /**
   * Show an info toast
   */
  info(text1, text2, options) {
    this.show({
      type: 'info',
      text1,
      text2,
      ...options
    });
  }

  /**
   * Hide the currently visible toast
   */
  /**
   * Remove all listeners
   */
  clearAll() {
    this.listeners.clear();
    this.hideListeners.clear();
  }
  hide() {
    this.hideListeners.forEach(listener => listener());
  }
}
export const toastManager = new ToastManager();
//# sourceMappingURL=ToastManager.js.map