import { type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
export type InputTextProps = {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    invalid?: boolean;
    helperText?: string;
    errorText?: string;
    disabled?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    multiline?: boolean;
    style?: StyleProp<ViewStyle>;
};
export declare function InputText({ label, value, onChangeText, placeholder, invalid, helperText, errorText, disabled, secureTextEntry, keyboardType, autoCapitalize, multiline, style, }: InputTextProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InputText.d.ts.map