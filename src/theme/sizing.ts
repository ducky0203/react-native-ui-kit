/**
 * Shared metrics for form controls (InputText, Select, Button, ...) so every
 * field renders at exactly the same height and shape.
 */
export const control = {
  height: 40,
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderWidth: 1.5,
  borderRadius: 3,
} as const;

/**
 * Heights for control sizes. `normal` is the shared baseline used by InputText
 * and Select, so a normal Button lines up with them exactly. `smallest` and
 * `small` are compact Button-only sizes.
 */
export const controlHeight = {
  smallest: 24,
  small: 28,
  normal: control.height,
  large: 52,
} as const;
