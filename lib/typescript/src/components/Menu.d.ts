import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type IconName } from './Icon';
import { type Severity } from '../theme/colors';
export type MenuItem = {
    label: string;
    icon?: IconName;
    disabled?: boolean;
    /** Render the item with a destructive (danger) tone. */
    severity?: Severity;
    onPress?: () => void;
};
export type MenuAlign = 'start' | 'end';
export type MenuTriggerState = {
    open: boolean;
    toggle: () => void;
};
export type MenuProps = {
    items: MenuItem[];
    /** Label shown on the default trigger button. */
    triggerLabel?: string;
    /** Icon shown on the default trigger button. */
    triggerIcon?: IconName;
    /** Render a custom trigger instead of the default button. */
    renderTrigger?: (state: MenuTriggerState) => ReactNode;
    disabled?: boolean;
    /** Horizontal alignment of the dropdown relative to the tap point. */
    align?: MenuAlign;
    /** Dropdown width. Defaults to 200. */
    width?: number;
    /** Maximum dropdown height before scrolling. */
    maxHeight?: number;
    style?: StyleProp<ViewStyle>;
};
export declare function Menu({ items, triggerLabel, triggerIcon, renderTrigger, disabled, align, width, maxHeight, style, }: MenuProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Menu.d.ts.map