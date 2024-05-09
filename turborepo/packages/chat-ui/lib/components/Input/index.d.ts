import React from 'react';
export type InputVariant = 'outline' | 'filled' | 'flushed';
export type InputRef = HTMLInputElement | HTMLTextAreaElement;
export interface InputProps extends Omit<React.InputHTMLAttributes<InputRef>, 'onChange'> {
    variant?: InputVariant;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    showCount?: boolean;
    multiline?: boolean;
    autoSize?: boolean;
    onChange?: (value: string, event: React.ChangeEvent<InputRef>) => void;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>;
