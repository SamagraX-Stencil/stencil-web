import React from 'react';
import { InputProps } from '../Input';
import { TransliterationConfig } from '../Chat';
interface ComposerInputProps extends InputProps {
    invisible: boolean;
    inputRef: React.MutableRefObject<HTMLTextAreaElement>;
    onImageSend?: (file: File) => Promise<any>;
    showTransliteration: boolean;
    transliterationConfig: TransliterationConfig | null;
    cursorPosition: number;
    setCursorPosition: any;
}
export declare const ComposerInput: ({ inputRef, invisible, onImageSend, disabled, showTransliteration, transliterationConfig, value, onChange, cursorPosition, setCursorPosition, ...rest }: ComposerInputProps) => React.JSX.Element;
export {};
