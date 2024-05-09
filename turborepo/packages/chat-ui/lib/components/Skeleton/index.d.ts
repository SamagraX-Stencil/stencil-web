import React from 'react';
export interface SkeletonProps {
    className?: string;
    w?: React.CSSProperties['width'];
    h?: React.CSSProperties['height'];
    mb?: React.CSSProperties['marginBottom'];
    style?: React.CSSProperties;
    r?: 'sm' | 'md' | 'xl' | 'none';
}
export declare const Skeleton: ({ className, w, h, mb, r, style }: SkeletonProps) => React.JSX.Element;
