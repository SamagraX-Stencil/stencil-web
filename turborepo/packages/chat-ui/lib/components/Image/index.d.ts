import React from 'react';
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    src: string;
    lazy?: boolean;
    fluid?: boolean;
}
export declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
