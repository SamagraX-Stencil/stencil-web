import React from 'react';
import { IconButtonProps } from '../IconButton';
export interface NavbarProps {
    title: string;
    className?: string;
    logo?: string;
    leftContent?: IconButtonProps;
    rightContent?: IconButtonProps[];
}
export declare const Navbar: (props: NavbarProps) => React.JSX.Element;
