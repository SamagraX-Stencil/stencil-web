import React from 'react';
export interface FileCardProps {
    className?: string;
    file: File;
    extension?: string;
    children?: React.ReactNode;
}
export declare const FileCard: (props: FileCardProps) => React.JSX.Element;
