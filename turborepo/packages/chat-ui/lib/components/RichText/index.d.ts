import React from 'react';
import DOMPurify from 'dompurify';
import './configDOMPurify';
export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
    className?: string;
    options?: DOMPurify.Config;
}
export declare const RichText: React.ForwardRefExoticComponent<RichTextProps & React.RefAttributes<HTMLDivElement>>;
