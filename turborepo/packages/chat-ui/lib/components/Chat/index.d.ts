import React, { ReactElement } from 'react';
import { NavbarProps } from '../Navbar';
import { MessageContainerProps, MessageContainerHandle } from '../MessageContainer';
import { QuickReplyItemProps } from '../QuickReplies';
import { ComposerProps, ComposerHandle } from '../Composer';
export type TransliterationConfig = {
    transliterationApi: string;
    transliterationSuggestions?: number;
    transliterationInputLanguage: string;
    transliterationOutputLanguage: string;
    transliterationProvider?: string;
};
export type ChatProps = Omit<ComposerProps, 'onFocus' | 'onChange' | 'onBlur'> & MessageContainerProps & {
    /**
     * 宽版模式断点
     */
    /**
     * 当前语言
     */
    locale?: string;
    /**
     * 多语言
     */
    locales?: any;
    /**
     * 导航栏配置
     */
    navbar?: NavbarProps;
    /**
     * 导航栏渲染函数
     */
    renderNavbar?: () => React.ReactNode;
    voiceToText?: ReactElement;
    voiceToTextProps?: any;
    /**
     * 加载更多文案
     */
    /**
     * 在消息列表上面的渲染函数
     */
    /**
     * 消息列表 ref
     */
    messagesRef?: React.RefObject<MessageContainerHandle>;
    /**
     * 下拉加载回调
     */
    /**
     * 滚动消息列表回调
     */
    /**
     * 消息列表
     */
    /**
     * 消息内容渲染函数
     */
    /**
     * 快捷短语
     */
    quickReplies?: QuickReplyItemProps[];
    /**
     * 快捷短语是否可见
     */
    quickRepliesVisible?: boolean;
    /**
     * 快捷短语的点击回调
     */
    onQuickReplyClick?: (item: QuickReplyItemProps, index: number) => void;
    /**
     * 快捷短语的滚动回调
     */
    onQuickReplyScroll?: () => void;
    /**
     * 快捷短语渲染函数
     */
    renderQuickReplies?: () => void;
    /**
     * 输入区 ref
     */
    composerRef?: React.RefObject<ComposerHandle>;
    /**
     * 输入框初始内容
     */
    /**
     * 输入框占位符
     */
    /**
     * 输入框聚焦回调
     */
    onInputFocus?: ComposerProps['onFocus'];
    /**
     * 输入框更新回调
     */
    onInputChange?: ComposerProps['onChange'];
    /**
     * 输入框失去焦点回调
     */
    onInputBlur?: ComposerProps['onBlur'];
    /**
     * 发送消息回调
     */
    /**
     * 发送图片回调
     */
    /**
     * 输入方式
     */
    /**
     * 输入方式切换回调
     */
    /**
     * 语音输入
     */
    /**
     * 工具栏
     */
    /**
     * 点击工具栏回调
     */
    /**
     * 点击附加内容回调
     */
    /**
     * 输入组件
     */
    Composer?: React.ElementType;
    disableSend?: boolean;
    btnColor?: string;
    background?: string;
    showTransliteration?: boolean;
    transliterationConfig?: TransliterationConfig;
    showInput: boolean;
};
export declare const Chat: React.ForwardRefExoticComponent<Omit<ComposerProps, "onFocus" | "onBlur" | "onChange"> & MessageContainerProps & {
    /**
     * 宽版模式断点
     */
    /**
     * 当前语言
     */
    locale?: string | undefined;
    /**
     * 多语言
     */
    locales?: any;
    /**
     * 导航栏配置
     */
    navbar?: NavbarProps | undefined;
    /**
     * 导航栏渲染函数
     */
    renderNavbar?: (() => React.ReactNode) | undefined;
    voiceToText?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    voiceToTextProps?: any;
    /**
     * 加载更多文案
     */
    /**
     * 在消息列表上面的渲染函数
     */
    /**
     * 消息列表 ref
     */
    messagesRef?: React.RefObject<MessageContainerHandle> | undefined;
    /**
     * 下拉加载回调
     */
    /**
     * 滚动消息列表回调
     */
    /**
     * 消息列表
     */
    /**
     * 消息内容渲染函数
     */
    /**
     * 快捷短语
     */
    quickReplies?: QuickReplyItemProps[] | undefined;
    /**
     * 快捷短语是否可见
     */
    quickRepliesVisible?: boolean | undefined;
    /**
     * 快捷短语的点击回调
     */
    onQuickReplyClick?: ((item: QuickReplyItemProps, index: number) => void) | undefined;
    /**
     * 快捷短语的滚动回调
     */
    onQuickReplyScroll?: (() => void) | undefined;
    /**
     * 快捷短语渲染函数
     */
    renderQuickReplies?: (() => void) | undefined;
    /**
     * 输入区 ref
     */
    composerRef?: React.RefObject<ComposerHandle> | undefined;
    /**
     * 输入框初始内容
     */
    /**
     * 输入框占位符
     */
    /**
     * 输入框聚焦回调
     */
    onInputFocus?: ComposerProps['onFocus'];
    /**
     * 输入框更新回调
     */
    onInputChange?: ComposerProps['onChange'];
    /**
     * 输入框失去焦点回调
     */
    onInputBlur?: ComposerProps['onBlur'];
    /**
     * 发送消息回调
     */
    /**
     * 发送图片回调
     */
    /**
     * 输入方式
     */
    /**
     * 输入方式切换回调
     */
    /**
     * 语音输入
     */
    /**
     * 工具栏
     */
    /**
     * 点击工具栏回调
     */
    /**
     * 点击附加内容回调
     */
    /**
     * 输入组件
     */
    Composer?: React.ElementType<any> | undefined;
    disableSend?: boolean | undefined;
    btnColor?: string | undefined;
    background?: string | undefined;
    showTransliteration?: boolean | undefined;
    transliterationConfig?: TransliterationConfig | undefined;
    showInput: boolean;
} & React.RefAttributes<HTMLDivElement>>;
