import React from 'react';
export interface CardMediaProps {
    className?: string;
    aspectRatio?: 'square' | 'wide';
    color?: string;
    image?: string;
    children?: React.ReactNode;
}
export declare const CardMedia: (props: CardMediaProps) => React.JSX.Element;
