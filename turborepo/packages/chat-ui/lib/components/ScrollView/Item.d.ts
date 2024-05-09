import React from 'react';
export type ScrollViewEffect = 'slide' | 'fade' | '';
export interface ScrollViewItemProps {
    item: any;
    effect?: ScrollViewEffect;
    onIntersect?: (item?: any, entry?: IntersectionObserverEntry) => boolean | void;
    children?: React.ReactNode;
}
export declare const Item: (props: ScrollViewItemProps) => React.JSX.Element;
