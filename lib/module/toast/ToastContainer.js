"use strict";

// @ts-nocheck
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { toastManager } from "./ToastManager.js";
import { Toast, ANIMATION_CONFIG } from "./Toast.js";
import { SuccessToast } from "./components/SuccessToast.js";
import { ErrorToast } from "./components/ErrorToast.js";
import { InfoToast } from "./components/InfoToast.js";
import { WarningToast } from "./components/WarningToast.js";
import { BaseToast } from "./components/BaseToast.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const defaultComponents = {
  success: props => /*#__PURE__*/_jsx(SuccessToast, {
    ...props
  }),
  error: props => /*#__PURE__*/_jsx(ErrorToast, {
    ...props
  }),
  info: props => /*#__PURE__*/_jsx(InfoToast, {
    ...props
  }),
  warning: props => /*#__PURE__*/_jsx(WarningToast, {
    ...props
  }),
  base: props => /*#__PURE__*/_jsx(BaseToast, {
    ...props,
    onClose: props.hide
  })
};

// Delay between sequential toast dismissals (FIFO)
const DISMISS_STAGGER_DELAY = 250;
export const ToastContainer = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
  visibilityTime: defaultVisibilityTime = 3000,
  position: defaultPosition = 'top',
  animation: defaultAnimation = 'slide-fade',
  maxVisibleToasts = 3,
  success: successStyle,
  error: errorStyle,
  warning: warningStyle,
  info: infoStyle
}) => {
  const [toastQueue, setToastQueue] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [closingToasts, setClosingToasts] = useState(new Set());
  const autoHideTimersRef = useRef(new Map());
  const expandedRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    expandedRef.current = isExpanded;
  }, [isExpanded]);

  // Get style override for a toast type
  const getStyleOverride = useCallback(type => {
    switch (type) {
      case 'success':
        return successStyle;
      case 'error':
        return errorStyle;
      case 'warning':
        return warningStyle;
      case 'info':
        return infoStyle;
      default:
        return undefined;
    }
  }, [successStyle, errorStyle, warningStyle, infoStyle]);
  const mergedConfig = useMemo(() => {
    return {
      ...defaultComponents,
      ...config
    };
  }, [config]);

  // Clear timer for a specific toast
  const clearTimerForToast = useCallback(toastId => {
    const timer = autoHideTimersRef.current.get(toastId);
    if (timer) {
      clearTimeout(timer);
      autoHideTimersRef.current.delete(toastId);
    }
  }, []);

  // Remove a toast immediately (used by X button)
  const removeToastImmediately = useCallback(toastId => {
    clearTimerForToast(toastId);
    setClosingToasts(prev => {
      const newSet = new Set(prev);
      newSet.delete(toastId);
      return newSet;
    });
    setToastQueue(prev => {
      if (!prev) return [];
      const toastToRemove = prev.find(t => t.id === toastId);
      if (toastToRemove) {
        toastToRemove.onHide?.();
      }
      const newQueue = prev.filter(t => t.id !== toastId);
      // Auto-collapse when 1 or fewer toasts remain
      if (newQueue.length <= 1) {
        // Use setTimeout to avoid synchronous setState in render cycle
        setTimeout(() => setIsExpanded(false), 0);
      }
      return newQueue;
    });
  }, [clearTimerForToast]);

  // Mark toast as closing (triggers exit animation), then remove after animation
  const dismissToast = useCallback(toastId => {
    clearTimerForToast(toastId);
    setClosingToasts(prev => new Set(prev).add(toastId));
    // Remove after animation completes
    setTimeout(() => {
      removeToastImmediately(toastId);
    }, 300); // Match animation duration
  }, [clearTimerForToast, removeToastImmediately]);

  // Auto-hide handler for a specific toast (FIFO - oldest first)
  const scheduleAutoHide = useCallback(toastItem => {
    // Don't schedule if already scheduled or expanded
    if (autoHideTimersRef.current.has(toastItem.id)) return;
    if (expandedRef.current) return;
    const visTime = toastItem.visibilityTime ?? defaultVisibilityTime;
    if (visTime <= 0 || toastItem.autoHide === false) return;
    const timer = setTimeout(() => {
      autoHideTimersRef.current.delete(toastItem.id);
      dismissToast(toastItem.id);
    }, visTime);
    autoHideTimersRef.current.set(toastItem.id, timer);
  }, [defaultVisibilityTime, dismissToast]);

  // Handle global hide (from toastManager.hide())
  const handleHide = useCallback(() => {
    // Hide the oldest toast (FIFO) - it's at the beginning of the array
    setToastQueue(prev => {
      if (!prev || prev.length === 0) return prev || [];
      const oldestToast = prev[0];
      if (oldestToast) {
        dismissToast(oldestToast.id);
      }
      return prev; // dismissToast will handle removal
    });
  }, [dismissToast]);
  const handleShow = useCallback(data => {
    const toastItem = {
      ...data,
      id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      visibilityTime: data.visibilityTime ?? defaultVisibilityTime,
      createdAt: Date.now()
    };
    // Add new toast to the end (newest at the end, oldest at the start)
    setToastQueue(prev => {
      const newQueue = [...(prev || []), toastItem];
      return newQueue;
    });
    // Schedule auto-hide for this toast
    // Use a small delay to ensure state is updated
    setTimeout(() => {
      scheduleAutoHide(toastItem);
    }, 50);
  }, [defaultVisibilityTime, scheduleAutoHide]);
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => {
      const newExpanded = !prev;
      if (newExpanded) {
        // Pause all auto-hide timers when expanded
        autoHideTimersRef.current.forEach(timer => {
          clearTimeout(timer);
        });
        autoHideTimersRef.current.clear();
      } else {
        // Resume auto-hide timers when collapsed
        // Reschedule all toasts with staggered delays
        setToastQueue(currentQueue => {
          currentQueue.forEach((toast, index) => {
            const delay = index * DISMISS_STAGGER_DELAY;
            const visTime = toast.visibilityTime ?? defaultVisibilityTime;
            if (visTime > 0 && toast.autoHide !== false) {
              const timer = setTimeout(() => {
                autoHideTimersRef.current.delete(toast.id);
                dismissToast(toast.id);
              }, visTime + delay);
              autoHideTimersRef.current.set(toast.id, timer);
            }
          });
          return currentQueue;
        });
      }
      return newExpanded;
    });
  }, [defaultVisibilityTime, dismissToast]);
  useEffect(() => {
    const unsubscribeShow = toastManager.subscribe(handleShow);
    const unsubscribeHide = toastManager.subscribeToHide(handleHide);

    // Copy ref to local variable for cleanup
    const timersRef = autoHideTimersRef.current;
    return () => {
      unsubscribeShow();
      unsubscribeHide();
      // Clear all timers on unmount
      timersRef.forEach(timer => clearTimeout(timer));
      timersRef.clear();
    };
  }, [handleShow, handleHide]);

  // Handle Close All
  const handleCloseAll = useCallback(() => {
    setIsExpanded(false);
    // Dismiss all toasts immediately or with animation?
    // Let's clear the queue immediately for "Close All" as it's a hard reset action
    autoHideTimersRef.current.forEach(timer => clearTimeout(timer));
    autoHideTimersRef.current.clear();
    setToastQueue([]);
    setClosingToasts(new Set());
  }, []);

  // Back button handler for Android
  useEffect(() => {
    const handleBackPress = () => {
      if (isExpanded) {
        setIsExpanded(false);
        return true; // Use valid native back behavior
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [isExpanded]);
  if (!toastQueue || toastQueue.length === 0) {
    return null;
  }

  // Determine which toasts to show
  // Queue: [oldest, ..., newest]
  // We want the last N items for the stack display
  // In collapsed view: newest is on top (stackIndex 0)
  // In expanded view: show up to 6 toasts (or configurable?)
  const limit = isExpanded ? 6 : maxVisibleToasts;
  const visibleToasts = toastQueue.slice(-limit);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    pointerEvents: "box-none",
    children: [visibleToasts.map((toastItem, index) => {
      const {
        type = 'success'
      } = toastItem;
      const Renderer = mergedConfig[type] || mergedConfig.info;
      const toastId = toastItem.id;
      const isClosing = closingToasts.has(toastId);

      // Stack index: newest (last in array) = 0, oldest = N-1
      const stackIndex = visibleToasts.length - 1 - index;

      // Hide function for this specific toast (X button - immediate)
      const hideThisToast = () => removeToastImmediately(toastId);
      const rendererProps = {
        ...toastItem,
        isVisible: !isClosing,
        show: params => toastManager.show(params),
        hide: hideThisToast,
        position: toastItem.position || defaultPosition,
        type: type,
        props: toastItem.props || {},
        iconConfig: toastItem.iconConfig,
        stackIndex,
        stackSize: toastQueue.length,
        styleOverride: getStyleOverride(type),
        animation: defaultAnimation,
        isExpanded: isExpanded,
        toggleExpanded: toggleExpanded
      };
      return /*#__PURE__*/_jsx(Toast, {
        config: rendererProps,
        topOffset: topOffset,
        bottomOffset: bottomOffset,
        renderer: Renderer,
        stackIndex: stackIndex,
        stackSize: toastQueue.length,
        animation: defaultAnimation,
        isExpanded: isExpanded
      }, toastId);
    }), isExpanded && visibleToasts.length > 0 && /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [styles.closeAllButton, defaultPosition === 'top' ? {
        top: topOffset + visibleToasts.length * ANIMATION_CONFIG.expandedHeight + 10
      } : {
        bottom: bottomOffset + visibleToasts.length * ANIMATION_CONFIG.expandedHeight + 10
      }],
      onPress: handleCloseAll,
      activeOpacity: 0.8,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.closeAllText,
        children: "Close All"
      })
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999
  },
  closeAllButton: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10000,
    elevation: 10000
  },
  closeAllText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600'
  }
});
//# sourceMappingURL=ToastContainer.js.map