/**
 * Every text size used by the kit. Components must pick from this scale instead
 * of hardcoding numbers, so the whole UI stays on one ladder.
 */
export const fontSize = {
  tiny: 10,
  small: 12,
  default: 14,
  large: 16,
  h3: 20,
  h2: 24,
  h1: 28,
} as const;

/** Paired with `fontSize`; only meant for multi-line text. */
export const lineHeight = {
  tiny: 14,
  small: 16,
  default: 20,
  large: 24,
  h3: 28,
  h2: 36,
  h1: 40,
} as const;

export const themeFont: { family: string | undefined } = {
  family: undefined,
};

export function getFontStyle(): { fontFamily: string } | Record<string, never> {
  return themeFont.family ? { fontFamily: themeFont.family } : {};
}
