import React from 'react';
import { IconButtonProps } from '../IconButton';
import { RecorderProps } from '../Recorder';
import { ToolbarItemProps } from '../Toolbar';
import { InputProps } from '../Input';
import { TransliterationConfig } from '../Chat';
export declare const CLASS_NAME_FOCUSING = "S--focusing";
export type InputType = 'voice' | 'text';
export type ComposerProps = {
    wideBreakpoint?: string;
    text?: string;
    textOnce?: string;
    inputOptions?: InputProps;
    placeholder?: string;
    inputType?: InputType;
    onInputTypeChange?: (inputType: InputType) => void;
    recorder?: RecorderProps;
    onSend: (type: string, content: string) => void;
    onImageSend?: (file: File) => Promise<any>;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onChange?: (value: string, event: React.ChangeEvent<Element>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    toolbar?: ToolbarItemProps[];
    onToolbarClick?: (item: ToolbarItemProps, event: React.MouseEvent) => void;
    onAccessoryToggle?: (isAccessoryOpen: boolean) => void;
    rightAction?: IconButtonProps;
    disableSend: boolean;
    showTransliteration: boolean;
    transliterationConfig: TransliterationConfig | null;
    btnColor: string;
    voiceToText?: any;
    voiceToTextProps?: any;
};
export interface ComposerHandle {
    setText: (text: string) => void;
}
export declare const Composer: React.ForwardRefExoticComponent<ComposerProps & React.RefAttributes<ComposerHandle>>;
