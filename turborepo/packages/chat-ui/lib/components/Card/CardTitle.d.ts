import React from 'react';
export interface CardTitleProps {
    className?: string;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    center?: boolean;
    children?: React.ReactNode;
}
export declare const CardTitle: (props: CardTitleProps) => React.JSX.Element;
