import axios from 'axios';
//@ts-ignore
import Chat from '@samagra-x/chatui';
import React, { ReactElement, useCallback, useContext, useMemo, useEffect } from 'react';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import MessageItem from '../message-item';
import RenderVoiceRecorder from '../recorder/RenderVoiceRecorder';
import toast from 'react-hot-toast';
import { useConfig } from '../../hooks/useConfig';
import ShareButtons from '../share-buttons';
import DowntimePage from '../../pageComponents/downtime-page';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { getMsgType } from '../../utils/getMsgType';
import { recordUserLocation } from '../../utils/location';

const ChatUiWindow: React.FC = () => {
  const config = useConfig('component', 'chatUI');
  const theme = useColorPalates();
  const secondaryColor = useMemo(() => {
    return theme?.primary?.light;
  }, [theme?.primary?.light]);
  const t = useLocalization();
  const context = useContext(AppContext);
  const { isDown, isMsgReceiving } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await context?.fetchIsDown();
        if (!context?.isDown) {
          const chatHistory = await axios.get(
            `${process.env.NEXT_PUBLIC_BFF_API_URL}/history?userId=${localStorage.getItem(
              'userID'
            )}&conversationId=${sessionStorage.getItem('conversationId')}`,
            {
              headers: {
                botId: '74b41966-c74a-43e7-ba43-07f038893cb4' || '',
              },
            }
          );

          console.log('ghji:', chatHistory);
          console.log('history:', chatHistory.data);

          const normalizedChats = normalizedChat(chatHistory?.data);
          console.log('normalized chats', normalizedChats);
          if (normalizedChats.length > 0) {
            context?.setMessages(normalizedChats);
          }
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    recordUserLocation();
    !context?.loading && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.setMessages, context?.fetchIsDown, context?.isDown]);

  const normalizedChat = (chats: any): any => {
    console.log('in normalized', chats);
    const conversationId = sessionStorage.getItem('conversationId');
    const history = chats
      .filter(
        (item: any) =>
          (conversationId === 'null' || item?.channelMessageId === conversationId) &&
          (item?.to !== 'admin' || !item.payload?.metaData?.hideMessage)
      )
      .map((item: any) => ({
        text: (item?.to === 'admin'
          ? (item?.payload?.metaData?.originalText ?? item?.payload?.text)
          : item?.payload?.text
        )
          ?.replace(/<end\/>/g, '')
          ?.replace(/^Guided:/, ''),
        position: item.to === 'admin' ? 'right' : 'left',
        timestamp: item.timestamp,
        reaction:
          item?.feedback?.type === 'FEEDBACK_POSITIVE'
            ? 1
            : item?.feedback?.type === 'FEEDBACK_NEGATIVE'
              ? -1
              : 0,
        msgId: item.messageId,
        messageId: item.messageId,
        replyId: item.replyId,
        audio_url: item?.audioURL,
        isEnd: true,
        optionClicked: true,
        // choices: item?.payload?.buttonChoices,
        isGuided: item?.metaData?.isGuided,
        card: item?.payload?.card,
        choices: [],
        conversationId: item?.channelMessageId,
      }))
      .sort(
        //@ts-ignore
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

    console.log('historyyy', history);
    console.log('history length:', history.length);

    return history;
  };

  const handleSend = useCallback(
    async (type: string, msg: any) => {
      if (msg.length === 0) {
        toast.error(t('error.empty_msg'));
        return;
      }
      console.log('mssgs:', context?.messages);
      if (type === 'text' && msg.trim()) {
        context?.sendMessage(msg.trim(), msg.trim());
      }
    },
    [context, t]
  );
  const normalizeMsgs = useMemo(
    () =>
      context?.messages?.map((msg: any) => ({
        type: getMsgType(msg),
        content: { text: msg?.text, data: { ...msg } },
        position: msg?.position ?? 'right',
      })),
    [context?.messages]
  );
  console.log('fghj:', { messages: context?.messages });
  const msgToRender = useMemo(() => {
    return context?.loading
      ? [
          ...normalizeMsgs,
          {
            type: 'loader',
            position: 'left',
            botUuid: '1',
          },
        ]
      : normalizeMsgs;
  }, [context?.loading, normalizeMsgs]);

  if (isDown) {
    return <DowntimePage />;
  } else
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Chat
          btnColor={secondaryColor || 'black'}
          background="var(--bg-color)"
          disableSend={isMsgReceiving}
          showInput={context?.showInputBox}
          //@ts-ignore
          translation={t}
          showTransliteration={
            config?.allowTransliteration &&
            localStorage.getItem('locale') === config?.transliterationOutputLanguage
          }
          transliterationConfig={{
            transliterationApi: config?.transliterationApi + '/transliterate',
            transliterationInputLanguage: config?.transliterationInputLanguage,
            transliterationOutputLanguage: config?.transliterationOutputLanguage,
            transliterationProvider: config?.transliterationProvider,
            transliterationSuggestions: config?.transliterationSuggestions,
          }}
          //@ts-ignore
          messages={msgToRender}
          voiceToText={RenderVoiceRecorder}
          //@ts-ignore
          renderMessageContent={(props): ReactElement => <MessageItem message={props} />}
          onSend={handleSend}
          locale="en-US"
          placeholder={t('message.ask_ur_question')}
        />
        <ShareButtons />
      </div>
    );
};

export default ChatUiWindow;
