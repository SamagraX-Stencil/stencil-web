import React from 'react';
import { InputProps } from '../Input';
export interface SearchProps extends Omit<InputProps, 'value'> {
    className?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    showSearch?: boolean;
    onSearch?: (query: string, event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onChange?: (value: string) => void;
    onClear?: () => void;
}
export declare const Search: ({ className, onSearch, onChange, onClear, value, clearable, showSearch, ...other }: SearchProps) => React.JSX.Element;
