import { type Severity } from '../theme/colors';
export type ProgressBarProps = {
    /** Progress value, 0-100. */
    value?: number;
    severity?: Severity;
    showValue?: boolean;
    height?: number;
};
export declare function ProgressBar({ value, severity, showValue, height, }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ProgressBar.d.ts.map