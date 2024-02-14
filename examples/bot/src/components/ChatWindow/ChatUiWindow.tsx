import axios from 'axios';
//@ts-ignore
import Chat from '@samagra-x/chatui';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import { analytics } from '../../utils/firebase';
// import { logEvent } from 'firebase/analytics';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import { getMsgType } from '../../utils/getMsgType';
import ChatMessageItem from '../chat-message-item';
import { v4 as uuidv4 } from 'uuid';
import RenderVoiceRecorder from '../recorder/RenderVoiceRecorder';
import toast from 'react-hot-toast';
import shareIcon from '../../assets/icons/share.svg';
import downloadIcon from '../../assets/icons/download.svg';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Loader from '../loader';

const ChatUiWindow: React.FC = () => {
  const t = useLocalization();
  const [cookie] = useCookies();
  const context = useContext(AppContext);
  const [shareLoader, setShareLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await context?.fetchIsDown();
        if (!context?.isDown) {
          const chatHistory = await axios.get(
            `${
              process.env.NEXT_PUBLIC_BASE_URL
            }/user/chathistory/${sessionStorage.getItem('conversationId')}`,
            {
              headers: {
                authorization: `Bearer ${cookie['auth']}`,
              },
            }
          );

          console.log('ghji:', chatHistory);
          console.log('history:', chatHistory.data);

          const modifiedChatHistory = chatHistory.data.map((chat: any) => {
            if (!chat.response) {
              chat.response = `${t('message.no_signal')}`;
            }
            return chat;
          });

          const normalizedChats = normalizedChat(modifiedChatHistory);
          console.log('normalized chats', normalizedChats);
          if (normalizedChats.length > 0) {
            context?.setMessages(normalizedChats);
          }
        }
      } catch (error: any) {
          console.error(error);
      }
    };
    !context?.loading && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    context?.setMessages,
    context?.fetchIsDown,
    context?.isDown,
    cookie['auth'],
  ]);

  const normalizedChat = (chats: any): any => {
    console.log('in normalized', chats);
    const conversationId = sessionStorage.getItem('conversationId');
    const history = chats
      .filter(
        (item: any) =>
          conversationId === 'null' || item.conversationId === conversationId
      )
      .flatMap((item: any) =>
        [
          item.query?.length && {
            text: item.query,
            position: 'right',
            repliedTimestamp: item.createdAt,
            messageId: uuidv4(),
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
          },
        ].filter(Boolean)
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
        context?.sendMessage(msg.trim());
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
          },
        ]
      : normalizeMsgs;
  }, [context?.loading, normalizeMsgs]);

  console.log('debug:', { msgToRender });

  const placeholder = useMemo(() => t('message.ask_ur_question'), [t]);

  const downloadShareHandler = async (type: string) => {
    try {
      const url = `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/user/chathistory/generate-pdf/${sessionStorage.getItem(
        'conversationId'
      )}`;
      if (type === 'download') {
        setDownloadLoader(true);
      } else setShareLoader(true);
      const response = await axios.post(url, null, {
        headers: {
          authorization: `Bearer ${cookie['auth']}`,
        },
      });
      const pdfUrl = response.data.pdfUrl;

      if (!pdfUrl) {
        toast.error(`${t('message.no_link')}`);
        return;
      }

      if (type === 'download') {
        setDownloadLoader(false);
        //@ts-ignore
        // logEvent(analytics, 'download_chat_clicked');
        toast.success(`${t('message.downloading')}`);
        const link = document.createElement('a');
        
        link.href = pdfUrl;
        link.target = '_blank';
        // link.href = window.URL.createObjectURL(blob);
        
        link.download = 'Chat.pdf';
        link.click();
        setDownloadLoader(false);
        context?.downloadChat(pdfUrl);
      } else if (type === 'share') {
        setShareLoader(false);
        //@ts-ignore
        // logEvent(analytics, 'share_chat_clicked');
        
        const response = await axios.get(pdfUrl, {
          responseType: 'arraybuffer',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const file = new File([blob], 'Chat.pdf', { type: blob.type });
        
        setShareLoader(false);
        if (!navigator.canShare) {
          //@ts-ignore
          if (window?.AndroidHandler?.shareUrl) {
            //@ts-ignore
            window.AndroidHandler.shareUrl(pdfUrl);
          } else {
            context?.shareChat(pdfUrl);
          }
        } else if (navigator.canShare({ files: [file] })) {
          toast.success(`${t('message.sharing')}`);
          console.log('hurray', file);
          await navigator
            .share({
              files: [file],
              title: 'Chat',
              text: 'Check out my chat with UP-LIFT!',
            })
            .catch((error) => {
              toast.error(`${t('message.share_cancelled')}`);
              console.error('Error sharing', error);
            });
        } else {
          toast.error(`${t('message.cannot_share')}`);
          console.error("Your system doesn't support sharing this file.");
        }
      } else {
        setDownloadLoader(false);
        setShareLoader(false);
        console.log(response.data);
      }
    } catch (error: any) {
      console.error(error);
      setDownloadLoader(false);
      setShareLoader(false);

      if (
        error.message ===
        "Cannot read properties of undefined (reading 'shareUrl')"
      ) {
        toast.success(`${t('message.shareUrl_android_error')}`);
      } else toast.error(error.message);

      console.error(error);
    }
  };


    return (
      <div style={{ height: '100%', width: '100%' }}>
        {/* @ts-ignore */}
        <Chat
          btnColor="var(--secondarygreen)"
          background="var(--bg-color)"
          disableSend={context?.isMsgReceiving}
          // translation={t}
          // showTransliteration={!(localStorage.getItem('locale') === 'en')}
          //@ts-ignore
          messages={msgToRender}
          // voiceToText={RenderVoiceRecorder}
          renderMessageContent={(props): ReactElement => (
            //@ts-ignore
            <ChatMessageItem key={props} message={props} onSend={handleSend} />
          )}
          onSend={handleSend}
          locale="en-US"
          placeholder={placeholder}
        />
      </div>
    );
};

export default ChatUiWindow;
