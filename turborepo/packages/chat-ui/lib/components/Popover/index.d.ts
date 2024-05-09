import React from 'react';
export type PopoverProps = {
    className?: string;
    active: boolean;
    target: HTMLElement;
    onClose: () => void;
    children?: React.ReactNode;
};
export declare const Popover: (props: PopoverProps) => React.ReactPortal | null;
