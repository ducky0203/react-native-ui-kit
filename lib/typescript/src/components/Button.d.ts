import { type StyleProp, type ViewStyle } from 'react-native';
import { type IconName } from './Icon';
import { type Severity } from '../theme/colors';
export type ButtonSize = 'small' | 'normal' | 'large';
export type ButtonProps = {
    label?: string;
    icon?: IconName;
    iconPos?: 'left' | 'right';
    severity?: Severity;
    outlined?: boolean;
    text?: boolean;
    rounded?: boolean;
    loading?: boolean;
    disabled?: boolean;
    size?: ButtonSize;
    onPress?: () => void;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    style?: StyleProp<ViewStyle>;
};
export declare function Button({ label, icon, iconPos, severity, outlined, text, rounded, loading, disabled, size, onPress, accessibilityLabel, accessibilityHint, style, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Button.d.ts.map