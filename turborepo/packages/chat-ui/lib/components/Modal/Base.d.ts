import React from 'react';
import { ButtonProps } from '../Button';
export interface ModalProps {
    active?: boolean;
    baseClass?: string;
    className?: string;
    title?: string;
    titleId?: string;
    showClose?: boolean;
    autoFocus?: boolean;
    backdrop?: boolean | 'static';
    height?: number | string;
    overflow?: boolean;
    actions?: ButtonProps[];
    vertical?: boolean;
    btnVariant?: ButtonProps['variant'];
    bgColor?: string;
    onClose?: () => void;
    onBackdropClick?: () => void;
    children?: React.ReactNode;
}
export interface BaseModalHandle {
    wrapperRef: React.RefObject<HTMLDivElement>;
}
export declare const Base: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<BaseModalHandle>>;
