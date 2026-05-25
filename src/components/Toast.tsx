import type { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Toast,
  ToastContainer,
  uiKitToastConfig,
  type ToastAnimationType,
  type ToastContainerProps,
} from '../toast';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'danger';

export type ToastOptions = {
  message: string;
  title?: string;
  severity?: ToastSeverity;
  /** Auto-dismiss delay in ms. Defaults to 3000. */
  duration?: number;
  position?: 'top' | 'bottom';
};

const severityType: Record<ToastSeverity, string> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
};

export function showToast({
  message,
  title,
  severity = 'info',
  duration = 3000,
  position = 'top',
}: ToastOptions) {
  const type = severityType[severity];
  Toast.show({
    type,
    text1: title ?? message,
    text2: title ? message : undefined,
    visibilityTime: duration,
    position,
  });
}

export type ToastProviderProps = {
  children: ReactNode;
  animation?: ToastAnimationType;
  maxVisibleToasts?: number;
} & Partial<
  Pick<
    ToastContainerProps,
    'topOffset' | 'bottomOffset' | 'position' | 'visibilityTime'
  >
>;

export function ToastProvider({
  children,
  animation = 'slide-fade',
  maxVisibleToasts = 3,
  position = 'top',
  visibilityTime = 3000,
  topOffset,
  bottomOffset,
}: ToastProviderProps) {
  const insets = useSafeAreaInsets();

  return (
    <>
      {children}
      <ToastContainer
        config={uiKitToastConfig}
        animation={animation}
        maxVisibleToasts={maxVisibleToasts}
        position={position}
        visibilityTime={visibilityTime}
        topOffset={topOffset ?? insets.top + 8}
        bottomOffset={bottomOffset ?? insets.bottom + 8}
      />
    </>
  );
}

export function useToast() {
  return {
    show: showToast,
    hide: () => Toast.hide(),
    success: Toast.success.bind(Toast),
    error: Toast.error.bind(Toast),
    warning: Toast.warning.bind(Toast),
    info: Toast.info.bind(Toast),
  };
}

export { Toast, ToastContainer, uiKitToastConfig } from '../toast';
