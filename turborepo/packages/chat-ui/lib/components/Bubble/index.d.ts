import React from 'react';
export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    type?: string;
    content?: any;
}
export declare const Bubble: (props: BubbleProps) => React.JSX.Element;
