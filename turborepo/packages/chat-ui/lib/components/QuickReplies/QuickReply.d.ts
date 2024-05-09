import React from 'react';
export interface QuickReplyItemProps {
    name: string;
    code?: string;
    icon?: string;
    img?: string;
    isNew?: boolean;
    isHighlight?: boolean;
}
export interface QuickReplyProps {
    item: QuickReplyItemProps;
    index: number;
    onClick: (item: QuickReplyItemProps, index: number) => void;
}
export declare const QuickReply: (props: QuickReplyProps) => React.JSX.Element;
