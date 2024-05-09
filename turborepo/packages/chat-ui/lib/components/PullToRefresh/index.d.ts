import React from 'react';
type PullToRefreshStatus = 'pending' | 'pull' | 'active' | 'loading';
export interface PullToRefreshProps {
    distance?: number;
    loadingDistance?: number;
    distanceRatio?: number;
    loadMoreText?: string;
    maxDistance?: number;
    onRefresh?: () => Promise<any>;
    onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    renderIndicator?: (status: PullToRefreshStatus, distance: number) => React.ReactNode;
    children: React.ReactNode;
}
export interface ScrollToEndOptions {
    animated?: boolean;
    force?: boolean;
}
interface PTRScrollToOptions extends ScrollToEndOptions {
    y: number | '100%';
}
export interface PullToRefreshHandle {
    scrollTo: (opts: PTRScrollToOptions) => void;
    scrollToEnd: (opts?: ScrollToEndOptions) => void;
    wrapperRef: React.RefObject<HTMLDivElement>;
}
export declare const PullToRefresh: React.ForwardRefExoticComponent<PullToRefreshProps & React.RefAttributes<PullToRefreshHandle>>;
export {};
