import React from 'react';
export interface ToastProps {
    content: React.ReactNode;
    type?: 'success' | 'error' | 'loading';
    duration?: number;
    onUnmount?: () => void;
}
export declare const Toast: (props: ToastProps) => React.JSX.Element;
