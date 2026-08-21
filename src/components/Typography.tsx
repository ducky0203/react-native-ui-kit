import type { ReactNode } from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, getFontStyle, lineHeight } from '../theme/typography';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

export type TypographyProps = {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
};

const variantStyles: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    fontWeight: '700',
  },
  h2: {
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    fontWeight: '700',
  },
  h3: {
    fontSize: fontSize.h3,
    lineHeight: lineHeight.h3,
    fontWeight: '600',
  },
  h4: {
    fontSize: fontSize.default,
    lineHeight: lineHeight.default,
    fontWeight: '600',
  },
  body: {
    fontSize: fontSize.default,
    lineHeight: lineHeight.default,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: '400',
  },
  caption: {
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: '400',
  },
  label: {
    fontSize: fontSize.default,
    lineHeight: lineHeight.default,
    fontWeight: '600',
  },
};

export function Typography({
  children,
  variant = 'body',
  color = colors.text,
  numberOfLines,
  style,
}: TypographyProps) {
  const isHeading = variant.startsWith('h');

  return (
    <Text
      accessibilityRole={isHeading ? 'header' : 'text'}
      numberOfLines={numberOfLines}
      style={[variantStyles[variant], { color }, getFontStyle(), style]}
    >
      {children}
    </Text>
  );
}
