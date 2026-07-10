import type { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CardProps = {
    title?: string;
    subTitle?: string;
    header?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
};
export declare function Card({ title, subTitle, header, footer, children, style, }: CardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Card.d.ts.map