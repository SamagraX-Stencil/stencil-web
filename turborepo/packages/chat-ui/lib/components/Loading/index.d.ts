import React from 'react';
export interface LoadingProps {
    tip?: string;
    children?: React.ReactNode;
}
export declare const Loading: (props: LoadingProps) => React.JSX.Element;
