import React from 'react';
export interface BackdropProps {
    className?: string;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export declare const Backdrop: (props: BackdropProps) => React.JSX.Element;
