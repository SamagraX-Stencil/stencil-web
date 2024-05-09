import React from 'react';
export interface RateActionsProps {
    upTitle?: string;
    downTitle?: string;
    onClick: (value: string) => void;
}
export declare const RateActions: (props: RateActionsProps) => React.JSX.Element;
