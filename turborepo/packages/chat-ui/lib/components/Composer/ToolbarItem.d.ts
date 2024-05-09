import React from 'react';
import { ToolbarItemProps } from '../Toolbar';
type IToolbarItem = {
    item: ToolbarItemProps;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export declare const ToolbarItem: (props: IToolbarItem) => React.JSX.Element;
export {};
