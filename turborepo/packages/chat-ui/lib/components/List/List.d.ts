import React from 'react';
export interface ListProps {
    className?: string;
    bordered?: boolean;
    children?: React.ReactNode;
}
export declare const List: (props: ListProps) => React.JSX.Element;
