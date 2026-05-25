export const fontSize = {
  default: 14,
  small: 12,
  large: 16,
} as const;

export const lineHeight = {
  default: 20,
  small: 16,
} as const;

export const themeFont: { family: string | undefined } = {
  family: undefined,
};

export function getFontStyle(): { fontFamily: string } | Record<string, never> {
  return themeFont.family ? { fontFamily: themeFont.family } : {};
}
