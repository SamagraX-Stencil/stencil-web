import React from 'react';
export type IMessageStatus = 'pending' | 'sent' | 'fail';
type StatusType = '' | 'loading' | 'fail';
export interface MessageStatusProps {
    status: IMessageStatus;
    delay?: number;
    maxDelay?: number;
    onRetry?: () => void;
    onChange?: (type: StatusType) => void;
}
export declare const MessageStatus: ({ status, delay, maxDelay, onRetry, onChange, }: MessageStatusProps) => React.JSX.Element | null;
export {};
