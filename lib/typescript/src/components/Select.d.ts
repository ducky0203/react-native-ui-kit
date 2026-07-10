export type SelectOption<T> = {
    label: string;
    value: T;
    disabled?: boolean;
};
export type SelectProps<T> = {
    options: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    invalid?: boolean;
    helperText?: string;
    errorText?: string;
    /** Maximum height of the dropdown list. */
    maxDropdownHeight?: number;
};
export declare function Select<T>({ options, value, onChange, placeholder, label, disabled, invalid, helperText, errorText, maxDropdownHeight, }: SelectProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map