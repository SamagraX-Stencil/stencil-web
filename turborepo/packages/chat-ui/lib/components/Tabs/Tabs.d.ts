import React from 'react';
export type TabsProps = {
    className?: string;
    index?: number;
    scrollable?: boolean;
    hideNavIfOnlyOne?: boolean;
    onChange?: (index: number, event: React.MouseEvent) => void;
    children?: React.ReactNode;
};
export declare const Tabs: (props: TabsProps) => React.JSX.Element;
