import React from 'react';
export type SendConfirmProps = {
    file: Blob;
    onCancel: () => void;
    onSend: () => void;
};
export declare const SendConfirm: (props: SendConfirmProps) => React.JSX.Element;
