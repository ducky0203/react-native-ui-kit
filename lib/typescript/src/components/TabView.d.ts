import { type ReactNode } from 'react';
import { type IconName } from './Icon';
export type TabItem = {
    title: string;
    content: ReactNode;
    icon?: IconName;
};
export type TabViewProps = {
    tabs: TabItem[];
    defaultIndex?: number;
    onChange?: (index: number) => void;
};
export declare function TabView({ tabs, defaultIndex, onChange }: TabViewProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabView.d.ts.map