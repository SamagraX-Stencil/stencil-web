import React from 'react';
export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    disabled?: boolean;
    distance?: number;
    onLoadMore: () => void;
}
export declare const InfiniteScroll: React.ForwardRefExoticComponent<InfiniteScrollProps & React.RefAttributes<HTMLDivElement>>;
