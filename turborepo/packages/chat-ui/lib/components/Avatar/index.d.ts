import React from 'react';
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square';
export interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    url?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    children?: React.ReactNode;
}
export declare const Avatar: (props: AvatarProps) => React.JSX.Element;
