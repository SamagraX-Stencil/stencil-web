import React from 'react';
import { ButtonProps } from '../Button';
export interface IconButtonProps extends ButtonProps {
    img?: string;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
