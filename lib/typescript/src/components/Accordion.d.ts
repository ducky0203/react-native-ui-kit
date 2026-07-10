import { type ReactNode } from 'react';
import { type IconName } from './Icon';
export type AccordionItem = {
    title: string;
    content: ReactNode;
    icon?: IconName;
};
export type AccordionProps = {
    items: AccordionItem[];
    /** Allow multiple sections open at once. */
    multiple?: boolean;
    defaultActiveIndices?: number[];
};
export declare function Accordion({ items, multiple, defaultActiveIndices, }: AccordionProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Accordion.d.ts.map