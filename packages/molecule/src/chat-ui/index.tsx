'use-client';
import Chat from '@repo/chatui';
import '@repo/chatui/dist/index.css';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.css';
import { getMsgType } from './utils/getMsgType';
import toast from 'react-hot-toast';
import { recordUserLocation } from './utils/location';
import chatHistory from './chatHistory.json';
import ShareButtons from '../share-buttons';
import { useUiConfig, useThemeConfig } from '@repo/hooks';
import MessageItem from '../message-item';

export const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const config = useUiConfig('component', 'chatUi');
  const theme = useThemeConfig('theme');

  useEffect(() => {
    const fetchHistory = () => {
      const normalizedChats = normalizedChat(chatHistory);
      if (normalizedChats.length > 0) {
        setMessages(normalizedChats);
      }
    };
    fetchHistory();
    recordUserLocation();
  }, []);

  const normalizedChat = (chats: any): any => {
    console.log('in normalized', chats);
    const history = chats.flatMap((item: any) =>
      [
        item.query?.length && {
          text: item.query,
          position: 'right',
          repliedTimestamp: item.createdAt,
          // messageId: uuidv4(),
        },
        {
          text: item.response,
          position: 'left',
          sentTimestamp: item.createdAt,
          reaction: item.reaction,
          msgId: item.id,
          messageId: item.id,
          audio_url: item.audioURL,
          isEnd: true,
          optionClicked: true,
        },
      ].filter(Boolean),
    );

    return history;
  };

  const sendMessage = (text: string) => {
    setMessages((prev: any) => [
      ...prev,
      {
        text,
        position: 'right',
      },
    ]);
    setLoading(true);

    // dummy response
    setTimeout(() => {
      setMessages((prev: any) => [
        ...prev,
        {
          text: 'This is a dummy response.',
          position: 'left',
          reaction: 0,
          isEnd: true, // Used to determine whether a streaming response has ended
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleSend = useCallback(async (type: string, msg: any) => {
    if (msg.length === 0) {
      toast.error('Please enter message');
      return;
    }
    if (type === 'text' && msg.trim()) {
      sendMessage(msg.trim());
    }
  }, []);

  const normalizeMsgs = useMemo(
    () =>
      messages?.map((msg: any) => ({
        type: getMsgType(msg),
        content: { text: msg?.text, data: { ...msg } },
        position: msg?.position ?? 'right',
      })),
    [messages],
  );

  const msgToRender = useMemo(() => {
    return loading
      ? [
          ...normalizeMsgs,
          {
            type: 'loader',
            position: 'left',
          },
        ]
      : normalizeMsgs;
  }, [loading, normalizeMsgs]);

  const placeholder = useMemo(() => config?.placeholder ?? 'Ask Your Question', []);

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <Chat
        showInput={true}
        btnColor={theme.secondaryColor.value}
        background="white"
        disableSend={false}
        showTransliteration={config.allowTransliteration}
        transliterationConfig={{
          transliterationApi: config.transliterationApi,
          transliterationInputLanguage: config.transliterationInputLanguage,
          transliterationOutputLanguage: config.transliterationOutputLanguage,
          transliterationProvider: config.transliterationProvider,
          transliterationSuggestions: config.transliterationSuggestions,
        }}
        //@ts-ignore
        messages={msgToRender}
        renderMessageContent={(props): ReactElement => (
          // <MessageItem message={props} themeColor={theme} chatUi={config} />
          // @ts-ignore
          <MessageItem message={props} themeColor={theme} chatUi={config} />
        )}
        onSend={handleSend}
        locale="en-US"
        placeholder={placeholder}
      />

      <ShareButtons />
    </div>
  );
};
