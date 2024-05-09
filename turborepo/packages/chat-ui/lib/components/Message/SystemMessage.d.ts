import React from 'react';
export interface SystemMessageProps {
    className?: string;
    content: string;
    action?: {
        text: string;
        onClick: (event: React.MouseEvent) => void;
    };
}
export declare const SystemMessage: (props: SystemMessageProps) => React.JSX.Element;
