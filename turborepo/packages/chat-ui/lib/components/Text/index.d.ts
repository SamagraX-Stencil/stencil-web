import React from 'react';
export interface TextProps {
    className?: string;
    as?: React.ElementType;
    align?: 'left' | 'center' | 'right' | 'justify';
    breakWord?: boolean;
    truncate?: boolean | number;
    children?: React.ReactNode;
}
export declare const Text: (props: TextProps) => React.JSX.Element;
