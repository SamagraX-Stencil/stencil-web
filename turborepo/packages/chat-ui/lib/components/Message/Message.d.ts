import React from 'react';
import { IMessageStatus } from '../MessageStatus';
export interface User {
    avatar?: string;
    name?: string;
    url?: string;
    [k: string]: any;
}
export type MessageId = string | number;
export interface MessageProps {
    /**
     * 唯一ID
     */
    _id: MessageId;
    /**
     * 消息类型
     */
    type: string;
    /**
     * 消息内容
     */
    content?: any;
    /**
     * 消息创建时间
     */
    createdAt?: number;
    /**
     * 消息发送者信息
     */
    user?: User;
    /**
     * 消息位置
     */
    position?: 'left' | 'right' | 'center' | 'pop';
    /**
     * 是否显示时间
     */
    hasTime?: boolean;
    /**
     * 状态
     */
    status?: IMessageStatus;
    /**
     * 消息内容渲染函数
     */
    renderMessageContent?: (message: MessageProps) => React.ReactNode;
}
declare const _default: React.MemoExoticComponent<(props: MessageProps) => React.JSX.Element>;
export default _default;
