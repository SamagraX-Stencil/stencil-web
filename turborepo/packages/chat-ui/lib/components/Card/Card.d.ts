import React from 'react';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface CardProps {
    className?: string;
    size?: CardSize;
    fluid?: boolean | 'order';
    children?: React.ReactNode;
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
