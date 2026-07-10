"use strict";

import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from "../theme/colors.js";
import { fontSize, getFontStyle } from "../theme/typography.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  style
}) {
  const [focused, setFocused] = useState(false);
  const message = invalid ? errorText : helperText;
  const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [label ? /*#__PURE__*/_jsx(Text, {
      style: [styles.label, getFontStyle()],
      children: label
    }) : null, /*#__PURE__*/_jsx(TextInput, {
      value: value,
      onChangeText: onChangeText,
      placeholder: placeholder,
      placeholderTextColor: colors.textMuted,
      editable: !disabled,
      secureTextEntry: secureTextEntry,
      keyboardType: keyboardType,
      autoCapitalize: autoCapitalize,
      multiline: multiline,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      accessibilityLabel: label,
      accessibilityHint: invalid ? errorText : helperText,
      accessibilityState: {
        disabled
      },
      style: [styles.input, {
        borderColor
      }, multiline ? styles.multiline : null, disabled ? styles.disabled : null, getFontStyle()]
    }), message ? /*#__PURE__*/_jsx(Text, {
      accessibilityLiveRegion: invalid ? 'polite' : 'none',
      style: [styles.message, invalid ? styles.error : styles.helper, getFontStyle()],
      children: message
    }) : null]
  });
}
const styles = StyleSheet.create({
  container: {
    gap: 6
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.text
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: fontSize.default,
    color: colors.text,
    backgroundColor: colors.surface
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top'
  },
  disabled: {
    backgroundColor: colors.surfaceMuted,
    opacity: 0.6
  },
  message: {
    fontSize: fontSize.small
  },
  helper: {
    color: colors.textMuted
  },
  error: {
    color: colors.danger
  }
});
//# sourceMappingURL=InputText.js.map