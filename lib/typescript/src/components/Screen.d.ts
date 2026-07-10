import type { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Edge } from 'react-native-safe-area-context';
export type ScreenProps = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    edges?: ReadonlyArray<Edge>;
    backgroundColor?: string;
};
export declare function Screen({ children, style, edges, backgroundColor, }: ScreenProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Screen.d.ts.map