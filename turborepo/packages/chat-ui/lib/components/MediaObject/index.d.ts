import React from 'react';
export type MediaObjectProps = {
    className?: string;
    picUrl?: string;
    picAlt?: string;
    picSize?: 'sm' | 'md' | 'lg';
    title?: string;
    meta?: React.ReactNode;
};
export declare const MediaObject: (props: MediaObjectProps) => React.JSX.Element;
