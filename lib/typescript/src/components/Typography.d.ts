import type { ReactNode } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
export type TypographyProps = {
    children: ReactNode;
    variant?: TypographyVariant;
    color?: string;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
};
export declare function Typography({ children, variant, color, numberOfLines, style, }: TypographyProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Typography.d.ts.map