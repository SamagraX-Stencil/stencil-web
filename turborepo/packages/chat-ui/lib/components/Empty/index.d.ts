import React from 'react';
export interface EmptyProps {
    className?: string;
    type?: 'error' | 'default';
    image?: string;
    tip?: string;
    children?: React.ReactNode;
}
export declare const Empty: (props: EmptyProps) => React.JSX.Element;
