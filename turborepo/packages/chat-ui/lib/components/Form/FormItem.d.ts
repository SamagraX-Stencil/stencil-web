import React from 'react';
export interface FormItemProps {
    label?: string | React.ReactNode;
    help?: string;
    required?: boolean;
    invalid?: boolean;
    hidden?: boolean;
    children?: React.ReactNode;
}
export declare const FormItem: (props: FormItemProps) => React.JSX.Element;
