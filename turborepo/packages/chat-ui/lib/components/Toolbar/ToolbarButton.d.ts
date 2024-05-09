import React from 'react';
export interface ToolbarItemProps {
    type: string;
    title: string;
    icon?: string;
    img?: string;
    render?: any;
}
export interface ToolbarButtonProps {
    item: ToolbarItemProps;
    onClick: (item: ToolbarItemProps, event: React.MouseEvent) => void;
}
export declare const ToolbarButton: (props: ToolbarButtonProps) => React.JSX.Element;
