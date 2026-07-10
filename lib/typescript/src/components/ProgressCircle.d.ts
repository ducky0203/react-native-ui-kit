import { type Severity } from '../theme/colors';
export type ProgressCircleProps = {
    /** Progress value, 0-100. */
    value?: number;
    size?: number;
    strokeWidth?: number;
    severity?: Severity;
    showValue?: boolean;
};
export declare function ProgressCircle({ value, size, strokeWidth, severity, showValue, }: ProgressCircleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ProgressCircle.d.ts.map