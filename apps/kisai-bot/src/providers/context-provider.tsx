'use client';
import { FC, ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../context';
import _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import { useLocalization } from '../hooks';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { UCI } from 'socket-package';
import { XMessage } from '@samagra-x/xmessage';

import WelcomePage from '../pageComponents/welcome-page';
import { ImportedFullPageLoader } from '../components/fullpage-loader';

const ContextProvider: FC<{
  config: any;
  locale: any;
  localeMsgs: any;
  setLocale: any;
  children: ReactElement;
  setLocaleMsgs: any;
}> = ({ config, locale, children, localeMsgs, setLocale, setLocaleMsgs }) => {
  const t = useLocalization();
  const [loading, setLoading] = useState(false);
  const [isMsgReceiving, setIsMsgReceiving] = useState(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [newSocket, setNewSocket] = useState<any>();
  const [showWelcomePage, setShowWelcomePage] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(
    sessionStorage.getItem('conversationId') || uuidv4()
  );
  const [isDown, setIsDown] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  // const [isConnected, setIsConnected] = useState(newSocket?.connected || false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [audioElement, setAudioElement] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [clickedAudioUrl, setClickedAudioUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [s2tMsgId, sets2tMsgId] = useState('');
  const [kaliaClicked, setKaliaClicked] = useState(false);
  const [showInputBox, setShowInputBox] = useState(true);

  useEffect(() => {
    if (
      //@ts-ignore
      config?.component?.welcomePage &&
      //@ts-ignore
      config?.component?.welcomePage?.showWelcomePage
    ) {
      setShowWelcomePage(true);
      setTimeout(() => {
        setShowWelcomePage(false);
      }, 2000);
    }
  }, [config]);

  const downloadChat = useMemo(() => {
    return (e: string) => {
      try {
        //@ts-ignore
        downloadHandler.postMessage(e);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
  useEffect(() => {
    console.log('trigger', { locale });
    //@ts-ignore
    if (config?.translation && locale) {
      onLocaleUpdate();
    }
  }, [config, locale]);

  const onLocaleUpdate = useCallback(() => {
    //@ts-ignore
    console.log('trigger', { trans: config?.translation, locale });
    //@ts-ignore
    setLocaleMsgs(config?.translation?.[locale]);
  }, [config, locale]);

  const shareChat = useMemo(() => {
    return (e: string) => {
      try {
        //@ts-ignore
        shareUrl.postMessage(e);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  const playAudio = useMemo(() => {
    return (url: string, content: any) => {
      if (!url) {
        console.error('Audio URL not provided.');
        return;
      }
      if (audioElement) {
        //@ts-ignore
        if (audioElement.src === url) {
          // If the same URL is provided and audio is paused, resume playback
          //@ts-ignore
          if (audioElement.paused) {
            setClickedAudioUrl(url);
            // setTtsLoader(true);
            audioElement
              //@ts-ignore
              .play()
              .then(() => {
                // setTtsLoader(false);
                setAudioPlaying(true);
                console.log('Resumed audio:', url);
              })
              //@ts-ignore
              .catch((error) => {
                setAudioPlaying(false);
                // setTtsLoader(false);
                setAudioElement(null);
                setClickedAudioUrl(null);
                console.error('Error resuming audio:', error);
              });
          } else {
            // Pause the current audio if it's playing
            //@ts-ignore
            audioElement.pause();
            setAudioPlaying(false);
            console.log('Paused audio:', url);
          }
          return;
        } else {
          // Pause the older audio if it's playing
          //@ts-ignore
          audioElement.pause();
          setAudioPlaying(false);
        }
      }
      setClickedAudioUrl(url);
      // setTtsLoader(true);
      const audio = new Audio(url);
      audio.playbackRate = config?.component?.botDetails?.audioPlayback || 1.5;
      audio.addEventListener('ended', () => {
        setAudioElement(null);
        setAudioPlaying(false);
      });
      audio
        .play()
        .then(() => {
          // setTtsLoader(false);
          setAudioPlaying(true);
          console.log('Audio played:', url);
          // Update the current audio to the new audio element
          //@ts-ignore
          setAudioElement(audio);
        })
        .catch((error) => {
          setAudioPlaying(false);
          // setTtsLoader(false);
          setAudioElement(null);
          setClickedAudioUrl(null);
          console.error('Error playing audio:', error);
        });
    };
  }, [audioElement, config?.component?.botDetails?.audioPlayback]);

  useEffect(() => {
    if (!isOnline) {
      setMessages((prev) => [
        ...prev,
        {
          text: t('message.no_signal'),
          choices: [],
          position: 'left',
          reaction: 0,
          messageId: uuidv4(),
          conversationId: conversationId,
          sentTimestamp: Date.now(),
          btns: true,
          audio_url: '',
        },
      ]);
    }
  }, [isOnline]);

  const checkInternetConnection = () => {
    if (!navigator.onLine) {
      setIsOnline(false);
      setLoading(false);
      setIsMsgReceiving(false);
    } else {
      setIsOnline(true);
    }
  };

  useEffect(() => {
    // Initial check
    checkInternetConnection();

    // Set up event listeners to detect changes in the internet connection status
    window.addEventListener('online', checkInternetConnection);
    window.addEventListener('offline', checkInternetConnection);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('online', checkInternetConnection);
      window.removeEventListener('offline', checkInternetConnection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('userID')) {
      //use socket connect to test here
      // setNewSocket(
      //   new UCI(
      //     URL,
      //     {
      //       transportOptions: {
      //         polling: {
      //           extraHeaders: {
      //             // Authorization: `Bearer ${cookie.access_token}`,
      //             channel: 'akai',
      //           },
      //         },
      //       },
      //       path: '',
      //       query: {
      //         deviceId: localStorage.getItem('userID'),
      //       },
      //       autoConnect: false,
      //       transports: ['polling', 'websocket'],
      //       upgrade: true,
      //       reconnection: true,
      //       timeout: 2000,
      //     },
      //     onMessageReceived
      //   )
      // );
    }
    function cleanup() {
      if (newSocket)
        newSocket.onDisconnect(() => {
          console.log('Socket disconnected');
        });
    }
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('userID')]);

  const updateMsgState = useCallback(
    async ({ msg, media }: { msg: any; media: any }) => {
      console.log('updatemsgstate:', msg);
      if (msg?.messageId?.Id && msg?.messageId?.channelMessageId && msg?.messageId?.replyId) {
        if (sessionStorage.getItem('conversationId') === msg.messageId.channelMessageId) {
          const word = msg.payload.text;

          setMessages((prev: any) => {
            const updatedMessages = [...prev];
            const existingMsgIndex = updatedMessages.findIndex(
              (m: any) => m.messageId === msg.messageId.Id
            );
            console.log('existingMsgIndex', existingMsgIndex);

            if (existingMsgIndex !== -1) {
              // Update the existing message with the new word
              if (word.endsWith('<end/>')) {
                updatedMessages[existingMsgIndex].isEnd = true;
              }
              updatedMessages[existingMsgIndex].text = word.replace(/<end\/>/g, '') + ' ';
            } else {
              // If the message doesn't exist, create a new one
              const newMsg = {
                text: word.replace(/<end\/>/g, '') + ' ',
                isEnd: word.endsWith('<end/>') ? true : false,
                choices: msg?.payload?.buttonChoices,
                position: 'left',
                reaction: 0,
                messageId: msg?.messageId.Id,
                replyId: msg?.messageId.replyId,
                conversationId: msg.messageId.channelMessageId,
                sentTimestamp: Date.now(),
                card: msg?.payload?.card,
                isGuided: msg?.transformer?.metaData?.isGuided || false,
                // btns: msg?.payload?.buttonChoices,
                // audio_url: msg?.content?.audio_url,
                // metaData: msg.payload?.metaData
                //     ? JSON.parse(msg.payload?.metaData)
                //     : null,
                ...media,
              };

              updatedMessages.push(newMsg);
            }
            return updatedMessages;
          });
          setIsMsgReceiving(false);
          if (msg.payload.text.endsWith('<end/>')) {
            setEndTime(Date.now());
          }
          setLoading(false);
        }
      }
    },
    [messages]
  );

  console.log('erty:', { conversationId });

  const onMessageReceived = useCallback(
    async (msg: any) => {
      // if (!msg?.content?.id) msg.content.id = '';
      if (msg.messageType.toUpperCase() === 'IMAGE') {
        if (
          // msg.content.timeTaken + 1000 < timer2 &&
          isOnline
        ) {
          await updateMsgState({
            msg: msg,
            media: { imageUrls: msg?.content?.media_url },
          });
        }
      } else if (msg.messageType.toUpperCase() === 'AUDIO') {
        updateMsgState({
          msg,
          media: { audioUrl: msg?.content?.media_url },
        });
      } else if (msg.messageType.toUpperCase() === 'HSM') {
        updateMsgState({
          msg,
          media: { audioUrl: msg?.content?.media_url },
        });
      } else if (msg.messageType.toUpperCase() === 'VIDEO') {
        updateMsgState({
          msg,
          media: { videoUrl: msg?.content?.media_url },
        });
      } else if (
        msg.messageType.toUpperCase() === 'DOCUMENT' ||
        msg.messageType.toUpperCase() === 'FILE'
      ) {
        updateMsgState({
          msg,
          media: { fileUrl: msg?.content?.media_url },
        });
      } else if (msg.messageType.toUpperCase() === 'TEXT') {
        if (
          // msg.content.timeTaken + 1000 < timer2 &&
          isOnline
        ) {
          await updateMsgState({
            msg: msg,
            media: null,
          });
        }
      }
    },
    [isOnline, updateMsgState]
  );

  console.log('config:', { config });
  //@ts-ignore
  const sendMessage = useCallback(
    async (textToSend: string, textToShow: string, media: any, isVisibile = true) => {
      if (!textToShow) textToShow = textToSend;

      // if (!localStorage.getItem('userID')) {
      //   removeCookie('access_token', { path: '/' });
      //   location?.reload();
      //   return;
      // }
      // console.log('mssgs:', messages)
      setLoading(true);
      setIsMsgReceiving(true);
      console.log('my mssg:', textToSend, textToShow);
      console.log('s2tMsgId:', s2tMsgId);
      const messageId = s2tMsgId ? s2tMsgId : uuidv4();
      console.log('s2t messageId:', messageId);
      const cId = uuidv4();
      newSocket.sendMessage({
        payload: {
          app: '74b41966-c74a-43e7-ba43-07f038893cb4' || '',
          payload: {
            text: textToSend?.replace('&', '%26')?.replace(/^\s+|\s+$/g, ''),
            metaData: {
              phoneNumber: localStorage.getItem('phoneNumber') || '',
              latitude: localStorage.getItem('latitude'),
              longitude: localStorage.getItem('longitude'),
              city: localStorage.getItem('city'),
              state: localStorage.getItem('state'),
              ip: localStorage.getItem('ip'),
              hideMessage: textToSend?.startsWith('Guided:') || false,
              originalText: textToShow?.replace(/^\s+|\s+$/g, ''),
            },
          },
          tags: JSON.parse(sessionStorage.getItem('tags') || '[]') || [],
          from: {
            userID: localStorage.getItem('userID'),
          },
          messageId: {
            Id: messageId,
            channelMessageId: sessionStorage.getItem('conversationId') || cId,
          },
        } as Partial<XMessage>,
      });

      if (!sessionStorage.getItem('conversationId')) {
        console.log('convId', cId);
        setConversationId(() => {
          sessionStorage.setItem('conversationId', cId);
          return cId;
        });
      } else sessionStorage.setItem('conversationId', conversationId || '');

      setStartTime(Date.now());
      if (isVisibile)
        if (media) {
          if (media.mimeType.slice(0, 5) === 'image') {
          } else if (media.mimeType.slice(0, 5) === 'audio' && isVisibile) {
          } else if (media.mimeType.slice(0, 5) === 'video') {
          } else if (media.mimeType.slice(0, 11) === 'application') {
          } else {
          }
        } else {
          if (!textToSend?.startsWith('Guided:')) {
            setMessages((prev: any) => [
              ...prev.map((prevMsg: any) => ({
                ...prevMsg,
              })),
              {
                text: textToShow?.replace(/^\s+|\s+$/g, ''),
                // ?.replace(/^Guided:/, ''),
                position: 'right',
                payload: { textToShow },
                time: Date.now(),
                messageId: messageId,
                conversationId: conversationId,
                repliedTimestamp: Date.now(),
              },
            ]);
          }
        }

      sets2tMsgId('');
    },
    [conversationId, newSocket, removeCookie, s2tMsgId]
  );

  const fetchIsDown = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BFF_API_URL}/health/${
          config?.component?.botDetails?.healthCheckTime || 5
        }`
      );
      const status = res.data.status;
      console.log('hie', status);
      if (status === 'OK') {
        setIsDown(false);
      } else {
        setIsDown(true);
        console.log('Server status is not OK');
      }
    } catch (error: any) {
      console.error(error);
    }
  }, [config?.component?.botDetails?.healthCheckTime]);

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

  useEffect(() => {
    if (isDown) return;
    let secondTimer: any = null;
    let timer: any = null;
    if (timer || secondTimer) {
      clearTimeout(secondTimer);
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (loading) {
        toast.loading(t('message.taking_longer'), { duration: 3000 });
      }
      secondTimer = setTimeout(async () => {
        fetchIsDown();
        console.log('log: here');
        if (loading) {
          console.log('log:', loading);
          try {
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

            if (!chatHistory.data[chatHistory.data.length - 1].response) {
              chatHistory.data[chatHistory.data.length - 1].response = `${t('message.no_signal')}`;
            }
            const normalizedChats = normalizedChat(chatHistory);
            console.log('normalized chats', normalizedChats);
            if (normalizedChats.length > 0) {
              setIsMsgReceiving(false);
              setLoading(false);
              setMessages(normalizedChats);
            }
          } catch (error: any) {
            setIsMsgReceiving(false);
            setLoading(false);
            console.error(error);
          }
        } else if (isMsgReceiving) {
          console.log('log: here');
          const secondLastMsg = messages.length > 2 ? messages[messages.length - 2] : null;
          setMessages((prev: any) => {
            if (prev.length > 0) {
              // Create a new array without the last element
              const updatedMessages = prev.slice(0, -1);
              // Update the state with the new array
              return updatedMessages;
            } else {
              return prev;
            }
          });
          setLoading(true);
          console.log('log:', secondLastMsg);
          if (secondLastMsg) {
            newSocket.sendMessage({
              payload: {
                app: '74b41966-c74a-43e7-ba43-07f038893cb4' || '',
                payload: {
                  text: secondLastMsg.text,
                },
                from: {
                  userID: localStorage.getItem('userID'),
                },
                messageId: {
                  channelMessageId: sessionStorage.getItem('conversationId'),
                },
              } as Partial<XMessage>,
            });
          }
        } else {
          setLoading(false);
          setIsMsgReceiving(false);
        }
      }, config?.component?.botDetails?.timer2 || 45000);
    }, config?.component?.botDetails?.timer1 || 30000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isDown,
    isMsgReceiving,
    loading,
    t,
    config?.component?.botDetails?.timer1,
    config?.component?.botDetails?.timer2,
  ]);

  const values = useMemo(
    () => ({
      sendMessage,
      messages,
      setMessages,
      loading,
      setLoading,
      isMsgReceiving,
      setIsMsgReceiving,
      locale,
      setLocale,
      localeMsgs,
      setConversationId,
      newSocket,
      isDown,
      fetchIsDown,
      showFeedbackPopup,
      setShowFeedbackPopup,
      currentQuery,
      setCurrentQuery,
      playAudio,
      audioElement,
      shareChat,
      clickedAudioUrl,
      downloadChat,
      audioPlaying,
      setAudioPlaying,
      config,
      kaliaClicked,
      setKaliaClicked,
      s2tMsgId,
      sets2tMsgId,
      showInputBox,
      setShowInputBox,
    }),
    [
      locale,
      setLocale,
      localeMsgs,
      sendMessage,
      messages,
      loading,
      setLoading,
      isMsgReceiving,
      setIsMsgReceiving,
      setConversationId,
      newSocket,
      isDown,
      fetchIsDown,
      showFeedbackPopup,
      setShowFeedbackPopup,
      currentQuery,
      setCurrentQuery,
      playAudio,
      audioElement,
      shareChat,
      clickedAudioUrl,
      downloadChat,
      audioPlaying,
      setAudioPlaying,
      config,
      kaliaClicked,
      setKaliaClicked,
      s2tMsgId,
      sets2tMsgId,
      showInputBox,
      setShowInputBox,
    ]
  );

  // if (!config)
  //   return (
  //     <InputComponent
  //       buttonText="Login Here"
  //       handleNextTask={async () => {
  //         return '';
  //       }}
  //       onChange={() => {}}
  //       placeholder="Mobile Number Come here"
  //       type="mobile"
  //       value=""
  //     />
  //   );
  if (!config) return <ImportedFullPageLoader loading label="Loading configuration.." />;

  if (showWelcomePage) return <WelcomePage config={config} />;

  return (
    //@ts-ignore
    <AppContext.Provider value={values}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
