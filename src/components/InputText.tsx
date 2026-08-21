import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, lineHeight, getFontStyle } from '../theme/typography';
import { control } from '../theme/sizing';

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
  /** Style of the outer wrapper (label + field + message). */
  style?: StyleProp<ViewStyle>;
  /** Style of the field itself, including its text. */
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function InputText({
  label,
  value,
  onChangeText,
  placeholder,
  invalid = false,
  helperText,
  errorText,
  disabled = false,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  multiline = false,
  style,
  inputStyle,
  labelStyle,
}: InputTextProps) {
  const [focused, setFocused] = useState(false);
  const message = invalid ? errorText : helperText;

  const borderColor = invalid
    ? colors.danger
    : focused
      ? colors.primary
      : colors.border;

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[styles.label, getFontStyle(), labelStyle]}>{label}</Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={label}
        accessibilityHint={invalid ? errorText : helperText}
        accessibilityState={{ disabled }}
        style={[
          styles.input,
          { borderColor },
          multiline ? styles.multiline : null,
          disabled ? styles.disabled : null,
          getFontStyle(),
          inputStyle,
        ]}
      />
      {message ? (
        <Text
          accessibilityLiveRegion={invalid ? 'polite' : 'none'}
          style={[
            styles.message,
            invalid ? styles.error : styles.helper,
            getFontStyle(),
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    height: control.height,
    borderWidth: control.borderWidth,
    borderRadius: control.borderRadius,
    paddingHorizontal: control.paddingHorizontal,
    paddingVertical: control.paddingVertical,
    fontSize: fontSize.default,
    // Single-line inputs intentionally have no lineHeight: iOS offsets the text
    // downwards when it is set, breaking alignment with Select's value label.
    textAlignVertical: 'center',
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multiline: {
    height: undefined,
    minHeight: 96,
    lineHeight: lineHeight.default,
    textAlignVertical: 'top',
  },
  disabled: {
    backgroundColor: colors.surfaceMuted,
    opacity: 0.6,
  },
  message: {
    fontSize: fontSize.small,
  },
  helper: {
    color: colors.textMuted,
  },
  error: {
    color: colors.danger,
  },
});
