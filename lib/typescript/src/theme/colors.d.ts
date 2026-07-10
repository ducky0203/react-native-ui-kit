export type Severity = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
export type Colors = {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    text: string;
    textMuted: string;
    textInverse: string;
};
export declare const colors: Colors;
export declare const severityColors: Record<Severity, string>;
export declare function configureTheme(theme: {
    colors?: Partial<Colors>;
    font?: {
        family?: string;
    };
}): void;
//# sourceMappingURL=colors.d.ts.map