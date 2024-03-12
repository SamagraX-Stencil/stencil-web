import Chat from '@samagra-x/chatui';
import '@samagra-x/chatui/dist/index.css';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './index.module.css'
import { getMsgType } from './utils/getMsgType';
import MessageItem from '../MessageItem';
import toast from 'react-hot-toast';
import shareIcon from './assets/share.svg';
import downloadIcon from './assets/download.svg';
import { recordUserLocation } from './utils/location';
import CircularProgress from '@mui/material/CircularProgress';
import chatHistory from './chatHistory.json';
import config from './config.json';
import { Divider } from '@mui/material';

const ChatUiWindow: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [shareLoader, setShareLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);

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
        ].filter(Boolean)
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
          text: "This is a dummy response.",
          position: 'left',
          reaction: 0,
          isEnd: true // Used to determine whether a streaming response has ended
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
    [messages]
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

  const placeholder = useMemo(() => config?.component?.placeholder ?? "Ask Your Question", [config]);

  const downloadShareHandler = async (type: string) => {
    if(type === 'share'){
      toast.loading("Sharing chat", {duration: 1500});
      setShareLoader(true);
    }else if(type === 'download'){
      toast.loading("Downloading chat", {duration: 1500});
      setDownloadLoader(true);
    }
    setTimeout(() => {
      if(type === 'share'){
        toast.success("Chat shared successfully");
        setShareLoader(false);
      }else if(type === 'download'){
        toast.success("Chat downloaded successfully");
        setDownloadLoader(false);
      }
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Chat
        btnColor={config.theme.secondaryColor.value}
        background="white"
        disableSend={false}
        //@ts-ignore
        messages={msgToRender}
        renderMessageContent={(props): ReactElement => (
          <MessageItem message={props} config={config} />
        )}
        onSend={handleSend}
        locale="en-US"
        placeholder={placeholder}
      />
      {config.component.allowDownloadChat && config.component.allowShareChat && <div
        style={{
          position: 'absolute',
          right: 0,
          top: '40%',
          background: 'white',
          padding: '5px',
          borderRadius: '5px 0 0 5px',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        }}>
        {config.component.allowShareChat && <div
          onClick={() => downloadShareHandler('share')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* Share */}
          {shareLoader ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
              }}>
              <CircularProgress size="20px" />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <img src={shareIcon} alt="" width={22} height={22} />{' '}
            </div>
          )}
          <p
            style={{
              fontSize: '10px',
              margin: 0,
              // color: config.theme.primaryColor.value,
              fontFamily: 'Mulish-bold',
            }}>
            {config.component.shareChatText}
          </p>
        </div>}
        {/* Only render divider when both share and download allowed */}
        {config.component.allowDownloadChat && config.component.allowShareChat && <Divider />}
        {config.component.allowDownloadChat && <div
          onClick={() => downloadShareHandler('download')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* Download */}
          {downloadLoader ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
              }}>
              <CircularProgress size="20px" />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <img src={downloadIcon} alt="" width={24} height={24} />
            </div>
          )}
          <p
            style={{
              fontSize: '10px',
              margin: 0,
              // color: config.theme.primaryColor.value,
              fontFamily: 'Mulish-bold',
            }}>
            {config.component.downloadChatText}
          </p>
        </div>}
      </div>}
    </div>
  );
};

export default ChatUiWindow;
