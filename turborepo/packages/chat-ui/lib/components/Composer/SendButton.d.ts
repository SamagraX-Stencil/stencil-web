import React from 'react';
interface SendButtonProps {
    btnColor: string;
    disabled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export declare const SendButton: ({ disabled, onClick, btnColor }: SendButtonProps) => React.JSX.Element;
export {};
