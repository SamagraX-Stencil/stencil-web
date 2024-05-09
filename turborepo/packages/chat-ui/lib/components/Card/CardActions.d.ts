import React from 'react';
export interface CardActionsProps {
    className?: string;
    direction?: 'column' | 'row';
    children?: React.ReactNode;
}
export declare const CardActions: (props: CardActionsProps) => React.JSX.Element;
