import React from 'react';
export interface TagProps {
    as?: React.ElementType;
    className?: string;
    color?: 'primary' | 'success' | 'danger' | 'warning';
    children?: React.ReactNode;
}
type TagRef = React.ElementType;
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<TagRef>>;
export {};
