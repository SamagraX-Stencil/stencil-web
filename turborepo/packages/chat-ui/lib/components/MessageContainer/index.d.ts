import React from 'react';
import { ScrollToEndOptions } from '../PullToRefresh';
import { MessageProps } from '../Message';
export interface MessageContainerProps {
    messages: MessageProps[];
    renderMessageContent: (message: MessageProps) => React.ReactNode;
    loadMoreText?: string;
    onRefresh?: () => Promise<any>;
    onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    renderBeforeMessageList?: () => React.ReactNode;
    onBackBottomShow?: () => void;
    onBackBottomClick?: () => void;
}
export interface MessageContainerHandle {
    ref: React.RefObject<HTMLDivElement>;
    scrollToEnd: (options?: ScrollToEndOptions) => void;
}
export declare const MessageContainer: React.ForwardRefExoticComponent<MessageContainerProps & React.RefAttributes<MessageContainerHandle>>;
