import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    label?: string;
    color?: 'primary';
    variant?: 'text' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    block?: boolean;
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
    btnColor?: string;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
