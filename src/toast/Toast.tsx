// @ts-nocheck
import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, PanResponder, StyleSheet, Easing } from 'react-native';

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

// Animation configuration for smooth drawer effect
export const ANIMATION_CONFIG = {
  duration: 300,
  useNativeDriver: true,
  // Scale reduction per stack level
  scaleReduction: 0.04,
  // Vertical offset per stack level (drawer effect)
  stackOffset: 10,
  // Maximum stack depth to show
  maxVisibleStack: 6,
  // Opacity reduction per stack level
  opacityReduction: 0.08,
  // Slide distance
  slideDistance: 120,
  // Height estimate for expansion (toast height + gap)
  expandedHeight: 75,
};

export const Toast: React.FC<ToastProps> = ({
  config,
  topOffset = 40,
  bottomOffset = 40,
  renderer,
  stackIndex = 0,
  stackSize = 1,
  animation = 'slide-fade',
  isExpanded: propIsExpanded = false,
}) => {
  const { position, isVisible, hide, onShow, onHide, toggleExpanded } =
    config as ToastConfigParams & {
      onShow?: () => void;
      onHide?: () => void;
      toggleExpanded?: () => void;
    };

  // Use prop isExpanded for consistency
  const isExpanded = propIsExpanded;

  // Use animation from config if provided, otherwise use prop
  const animationType = config.animation || animation;

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stackTranslateY = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate stacking values based on state
  let targetScale = 1;
  let targetStackOffset = 0;
  let targetOpacity = 1;

  if (isExpanded) {
    // Expanded state: No scaling, vertical stacking with gap
    targetScale = 1;
    targetOpacity = 1;

    // Calculate expanded offset
    // Stack Index 0 is at pos 0
    // Stack Index 1 is at pos 1 * height
    const expandedOffset = stackIndex * ANIMATION_CONFIG.expandedHeight;
    targetStackOffset = position === 'top' ? expandedOffset : -expandedOffset;
  } else {
    // Collapsed state: Scale down, small vertical offset
    targetScale = Math.max(
      1 - stackIndex * ANIMATION_CONFIG.scaleReduction,
      0.85
    );
    const collapsedOffset = stackIndex * ANIMATION_CONFIG.stackOffset;
    targetStackOffset = position === 'top' ? collapsedOffset : -collapsedOffset;
    targetOpacity = Math.max(
      1 - stackIndex * ANIMATION_CONFIG.opacityReduction,
      0.6
    );
  }

  // Z-index: higher for front toasts (newest has highest z-index)
  // When expanded, we might want to reverse logic or keep it?
  // If keeping, 0 overlaying 1 overlaying 2. This works fine for expanded too.
  const zIndex = 9999 - stackIndex;

  // Pan responder for swipe to dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Enable swipe for all items if expanded, or only front if collapsed
        onStartShouldSetPanResponder: () => false, // Let TouchableOpacity handle taps
        onMoveShouldSetPanResponder: (_, gestureState) => {
          const canSwipe = isExpanded || stackIndex === 0;
          // Only capture if significant vertical movement
          return (
            canSwipe &&
            Math.abs(gestureState.dy) > 10 &&
            Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
          );
        },
        onPanResponderMove: (_, gestureState) => {
          if (!isExpanded && stackIndex !== 0) return;

          if (position === 'top' && gestureState.dy < 0) {
            translateY.setValue(gestureState.dy);
          } else if (position === 'bottom' && gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (!isExpanded && stackIndex !== 0) return;

          const threshold = 50;
          const shouldDismiss =
            (position === 'top' && gestureState.dy < -threshold) ||
            (position === 'bottom' && gestureState.dy > threshold);

          if (shouldDismiss) {
            hide();
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 0,
            }).start();
          }
        },
      }),
    [hide, position, translateY, stackIndex, isExpanded]
  );

  const animateShow = () => {
    // Get slide distance based on position (top slides from above, bottom slides from below)
    const slideDistance = ANIMATION_CONFIG.slideDistance;
    const startPosition = position === 'top' ? -slideDistance : slideDistance;

    // Set initial values based on animation type
    switch (animationType) {
      case 'fade':
        translateY.setValue(0);
        opacity.setValue(0);
        break;
      case 'slide':
        translateY.setValue(startPosition);
        opacity.setValue(1);
        break;
      case 'slide-fade':
      default:
        translateY.setValue(startPosition);
        opacity.setValue(0);
        break;
    }

    scale.setValue(targetScale);
    stackTranslateY.setValue(targetStackOffset);

    const animations: Animated.CompositeAnimation[] = [];

    // Add slide animation if needed
    if (animationType === 'slide' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );
    }

    // Add fade animation if needed
    if (animationType === 'fade' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(opacity, {
          toValue: targetOpacity,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );
    } else {
      // For slide-only, still animate to target opacity for stacking
      animations.push(
        Animated.timing(opacity, {
          toValue: targetOpacity,
          duration: ANIMATION_CONFIG.duration / 2,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start(() => {
      onShow?.();
    });
  };

  const animateHide = () => {
    // Get slide distance based on position (exit in same direction)
    const slideDistance = ANIMATION_CONFIG.slideDistance;
    const endPosition = position === 'top' ? -slideDistance : slideDistance;

    const animations: Animated.CompositeAnimation[] = [];

    // Add slide animation if needed
    if (animationType === 'slide' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(translateY, {
          toValue: endPosition,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        })
      );
    }

    // Add fade animation if needed
    if (animationType === 'fade' || animationType === 'slide-fade') {
      animations.push(
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_CONFIG.duration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        })
      );
    } else {
      // For slide-only, quickly fade at the end
      animations.push(
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_CONFIG.duration / 2,
          delay: ANIMATION_CONFIG.duration / 2,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start(() => {
      onHide?.();
    });
  };

  // Animate stack position changes smoothly
  useEffect(() => {
    // Use spring animation for smoother interruption handling during rapid updates
    Animated.parallel([
      Animated.spring(scale, {
        toValue: targetScale,
        useNativeDriver: true,
        speed: 20, // Adjust speed to match approx 300ms feel
        bounciness: 0,
      }),
      Animated.spring(stackTranslateY, {
        toValue: targetStackOffset,
        useNativeDriver: true,
        speed: 20,
        bounciness: 0,
      }),
      Animated.timing(opacity, {
        toValue: isVisible ? targetOpacity : 0,
        duration: ANIMATION_CONFIG.duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    stackIndex,
    targetScale,
    targetStackOffset,
    targetOpacity,
    isVisible,
    scale,
    stackTranslateY,
    opacity,
    isExpanded,
  ]);

  // Handle show/hide animations
  useEffect(() => {
    if (isVisible) {
      animateShow();
    } else {
      animateHide();
    }
    // Auto-hide is now managed by ToastContainer
    const timeoutRef = hideTimeoutRef.current;
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Don't render if beyond max visible stack
  if (stackIndex >= ANIMATION_CONFIG.maxVisibleStack) {
    return null;
  }

  const positionStyle =
    position === 'top' ? { top: topOffset } : { bottom: bottomOffset };

  // Handle press on the toast - toggle expand/collapse for stacked toasts
  const handlePress = () => {
    // If collapsed and multiple toasts, toggle to expand
    if (!isExpanded && stackSize > 1 && stackIndex === 0 && toggleExpanded) {
      toggleExpanded();
      return;
    }
    // If expanded and tapping any toast, collapse
    if (isExpanded && toggleExpanded) {
      toggleExpanded();
      return;
    }
    // Otherwise, call the user's onPress if provided
    config.onPress?.();
  };

  // Create modified config for the renderer
  // Override onPress to use our handlePress
  const rendererConfig = {
    ...config,
    onPress: handlePress,
    isExpanded,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          transform: [
            { translateY: Animated.add(translateY, stackTranslateY) },
            { scale },
          ],
          opacity,
          zIndex,
          elevation: zIndex, // Android elevation
        },
      ]}
      {...panResponder.panHandlers}
      testID="toast-animated-view"
      pointerEvents={isExpanded || stackIndex === 0 ? 'auto' : 'none'}
    >
      {renderer({ ...rendererConfig, stackIndex, stackSize })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
