import { type Severity } from '../theme/colors';
export type BadgeSize = 'small' | 'normal' | 'large';
export type BadgeProps = {
    value?: string | number;
    severity?: Severity;
    size?: BadgeSize;
    accessibilityLabel?: string;
};
export declare function Badge({ value, severity, size, accessibilityLabel, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Badge.d.ts.map