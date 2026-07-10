import { ReactNode } from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
export type ToastType = 'success' | 'error' | 'warning' | 'info' | string;
export type ToastPosition = 'top' | 'bottom';
/** Animation type for toast entrance/exit */
export type ToastAnimationType = 'fade' | 'slide' | 'slide-fade';
/** Style override for toast variants */
export interface ToastStyleOverride {
    /** Background color for the toast */
    backgroundColor?: string;
    /** Text color for the toast */
    color?: string;
}
export interface ToastIconConfig {
    /** Hide the leading icon (checkmark, X, etc.) */
    hideLeadingIcon?: boolean;
    /** Hide the close (X) button */
    hideCloseIcon?: boolean;
    /** Custom leading icon size */
    leadingIconSize?: number;
    /** Custom leading icon color */
    leadingIconColor?: string;
    /** Custom close icon color */
    closeIconColor?: string;
}
export interface BaseToastProps {
    text1?: string;
    text2?: string;
    onPress?: () => void;
    activeOpacity?: number;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    text1Style?: StyleProp<TextStyle>;
    text2Style?: StyleProp<TextStyle>;
    text1NumberOfLines?: number;
    text2NumberOfLines?: number;
    renderLeadingIcon?: () => ReactNode;
    renderTrailingIcon?: () => ReactNode;
    testID?: string;
    accessibilityLabel?: string;
    /** Icon configuration options */
    iconConfig?: ToastIconConfig;
    /** Background color for the toast */
    backgroundColor?: string;
}
export interface ToastProps extends BaseToastProps {
    type?: ToastType;
    props?: Record<string, unknown>;
}
export interface ToastConfigParams<Props = Record<string, unknown>> {
    position: ToastPosition;
    type: ToastType;
    isVisible: boolean;
    text1?: string;
    text2?: string;
    show: (params: ToastShowParams) => void;
    hide: () => void;
    onPress?: () => void;
    props: Props;
    /** Icon configuration options */
    iconConfig?: ToastIconConfig;
    /** Index in the toast stack (0 = front/newest) */
    stackIndex?: number;
    /** Total number of toasts in the stack */
    stackSize?: number;
    /** Style override from container */
    styleOverride?: ToastStyleOverride;
    /** Animation type for entrance/exit */
    animation?: ToastAnimationType;
    /** Whether the stack is currently expanded */
    isExpanded?: boolean;
    /** Function to toggle expansion state */
    toggleExpanded?: () => void;
}
export type ToastConfig = {
    [key in ToastType]: (params: ToastConfigParams) => ReactNode;
};
export interface ToastShowParams {
    type?: ToastType;
    text1?: string;
    text2?: string;
    position?: ToastPosition;
    visibilityTime?: number;
    autoHide?: boolean;
    topOffset?: number;
    bottomOffset?: number;
    props?: Record<string, unknown>;
    onShow?: () => void;
    onHide?: () => void;
    onPress?: () => void;
    /** Icon configuration options */
    iconConfig?: ToastIconConfig;
}
export interface ToastData extends ToastShowParams {
    isVisible: boolean;
    /** Icon configuration options */
    iconConfig?: ToastIconConfig;
}
export interface ToastHideParams {
    onAnimationEnd?: () => void;
}
export interface ToastRef {
    show: (params: ToastShowParams) => void;
    hide: (params?: ToastHideParams) => void;
}
//# sourceMappingURL=types.d.ts.map