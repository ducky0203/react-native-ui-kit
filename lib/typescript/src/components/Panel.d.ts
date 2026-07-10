import { type ReactNode } from 'react';
export type PanelProps = {
    header?: string;
    /** Show a collapse/expand toggle in the header. */
    toggleable?: boolean;
    defaultCollapsed?: boolean;
    children?: ReactNode;
};
export declare function Panel({ header, toggleable, defaultCollapsed, children, }: PanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Panel.d.ts.map