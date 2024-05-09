import React from 'react';
export interface DividerProps {
    className?: string;
    position?: 'center' | 'left' | 'right';
    children?: React.ReactNode;
}
export declare const Divider: (props: DividerProps) => React.JSX.Element;
