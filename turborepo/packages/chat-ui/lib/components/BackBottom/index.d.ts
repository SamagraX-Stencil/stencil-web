import React from 'react';
interface BackBottomProps {
    count: number;
    onClick: () => void;
    onDidMount?: () => void;
}
export declare const BackBottom: ({ count, onClick, onDidMount }: BackBottomProps) => React.JSX.Element;
export {};
