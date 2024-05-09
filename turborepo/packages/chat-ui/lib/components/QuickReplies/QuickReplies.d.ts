import React from 'react';
import { QuickReplyItemProps } from './QuickReply';
export interface QuickRepliesProps {
    items: QuickReplyItemProps[];
    visible?: boolean;
    onClick: (item: QuickReplyItemProps, index: number) => void;
    onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}
declare const _default: React.MemoExoticComponent<{
    (props: QuickRepliesProps): React.JSX.Element | null;
    defaultProps: {
        items: never[];
        visible: boolean;
    };
}>;
export default _default;
