import React from 'react';
export type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
    className?: string;
    src?: string;
    cover?: string;
    duration?: string | number;
    style?: React.CSSProperties;
    videoRef?: React.RefObject<HTMLVideoElement>;
    onClick?: (paused: boolean, event: React.MouseEvent) => void;
    onCoverLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};
export declare const Video: (props: VideoProps) => React.JSX.Element;
