import React from 'react';
export interface ClickOutsideProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    mouseEvent?: 'click' | 'mousedown' | 'mouseup';
    children?: React.ReactNode;
}
export declare const ClickOutside: (props: ClickOutsideProps) => React.JSX.Element;
