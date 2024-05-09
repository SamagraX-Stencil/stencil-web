import React from 'react';
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    className?: string;
    /** @deprecated Use `<Input>`'s `variant` instead */
    theme?: string;
}
export declare const ThemeContext: React.Context<string>;
export declare const Form: (props: FormProps) => React.JSX.Element;
