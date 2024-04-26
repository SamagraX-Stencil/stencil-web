import Chat from "@samagra-x/chatui";
import "@samagra-x/chatui/dist/index.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";
import { getMsgType } from "./utils/getMsgType";
import MessageItem from "../message-item";
import toast from "react-hot-toast";
import { recordUserLocation } from "./utils/location";
import chatHistory from "./chatHistory.json";
import ShareButtons from "../share-buttons";
import { useUiConfig, useThemeConfig } from "../../hook/useConfig";

interface ChatMessage {
  text: string;
  position: "left" | "right";
  repliedTimestamp?: string;
  sentTimestamp?: string;
  reaction?: number;
  msgId?: string;
  messageId?: string;
  audio_url?: string;
  isEnd?: boolean;
  optionClicked?: boolean;
}

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const config = useUiConfig("component", "chatUi");
  const theme = useThemeConfig("theme");

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

  const normalizedChat = (chats: any): ChatMessage[] => {
    const history = chats.flatMap((item: any) =>
      [
        item.query?.length && {
          text: item.query,
          position: "right",
          repliedTimestamp: item.createdAt,
        },
        {
          text: item.response,
          position: "left",
          sentTimestamp: item.createdAt,
          reaction: item.reaction,
          msgId: item.id,
          messageId: item.id,
          audio_url: item.audioURL,
          isEnd: true,
          optionClicked: true,
        },
      ].filter(Boolean)
    );

    return history;
  };

  const sendMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        text,
        position: "right",
      },
    ]);
    setLoading(true);

    // dummy response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "This is a dummy response.",
          position: "left",
          reaction: 0,
          isEnd: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleSend = useCallback(async (type: string, msg: string) => {
    if (msg.length === 0) {
      toast.error("Please enter message");
      return;
    }
    if (type === "text" && msg.trim()) {
      sendMessage(msg.trim());
    }
  }, []);

  const normalizeMsgs = useMemo(
    () =>
      messages.map((msg) => ({
        type: getMsgType(msg),
        content: { text: msg.text, data: { ...msg } },
        position: msg.position ?? "right",
      })),
    [messages]
  );

  const msgToRender = useMemo(() => {
    return loading
      ? [
          ...normalizeMsgs,
          {
            type: "loader",
            position: "left",
          },
        ]
      : normalizeMsgs;
  }, [loading, normalizeMsgs]);

  const placeholder = useMemo(
    () => config.placeholder ?? "Ask Your Question",
    []
  );

  return (
    <div className={styles.container}>
      <Chat
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
        // @ts-ignore
        messages={msgToRender}
        renderMessageContent={(props) => (
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

export default ChatUI;
