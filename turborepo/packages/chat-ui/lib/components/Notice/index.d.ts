import React from 'react';
export interface NoticeProps {
    content: string;
    closable?: boolean;
    leftIcon?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export declare const Notice: (props: NoticeProps) => React.JSX.Element;
