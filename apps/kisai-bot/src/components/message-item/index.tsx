import {
  Bubble,
  Image as Img,
  ScrollView,
  List,
  ListItem,
  FileCard,
  Typing,
  Popup,
  RichText,
} from '@samagra-x/chatui';
import { FC, ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './index.module.css';
import RightIcon from './assets/right';
import SpeakerIcon from './assets/speaker';
import SpeakerPauseIcon from './assets/speakerPause';
import MsgThumbsUp from './assets/msg-thumbs-up';
import MsgThumbsDown from './assets/msg-thumbs-down';
import Button from '@material-ui/core/Button';
import { MessageItemPropType } from './index.d';
import { JsonToTable } from '../json-to-table';
import moment from 'moment';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useConfig } from '../../hooks/useConfig';
import { useLocalization } from '../../hooks';
import { AppContext } from '../../context';
import axios from 'axios';
import saveTelemetryEvent from '../../utils/telemetry';
import BlinkingSpinner from '../blinking-spinner/index';
import Loader from '../loader';
import { MessageType, XMessage } from '@samagra-x/xmessage';
import { v4 as uuidv4 } from 'uuid';
import router from 'next/router';
// import TransliterationInput from '../transliteration-input';
import { TransliterationInput } from '@samagra-x/stencil-molecules/lib/transliteration-input';

const MessageItem: FC<MessageItemPropType> = ({ message }) => {
  const { content, type } = message;
  const config = useConfig('component', 'chatUI');
  const context = useContext(AppContext);
  const [reaction, setReaction] = useState(content?.data?.reaction?.type);
  const [optionDisabled, setOptionDisabled] = useState(content?.data?.optionClicked || false);
  const [audioFetched, setAudioFetched] = useState(false);
  const [ttsLoader, setTtsLoader] = useState(false);
  const [popupActive, setPopupActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChoices, setFilteredChoices] = useState([]);
  const t = useLocalization();
  const theme = useColorPalates();
  const secondaryColor = useMemo(() => {
    return theme?.primary?.light;
  }, [theme?.primary?.light]);

  const contrastText = useMemo(() => {
    return theme?.primary?.contrastText;
  }, [theme?.primary?.contrastText]);

  // const getToastMessage = (t: any, reaction: number): string => {
  //   if (reaction === 1) return t('toast.reaction_like');
  //   return t('toast.reaction_reset');
  // };

  const handleSearchChange = () => {
    const query = searchQuery;
    setSearchQuery(query);

    if (query) {
      const results = content?.data?.choices?.choices
        .filter((item: any) => item.text.toLowerCase().includes(query.toLowerCase().trim()))
        .slice(0, 3);
      setFilteredChoices(results);
    } else {
      setFilteredChoices([]);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearchChange();
    }
  }, [searchQuery]);

  const displayedChoices = searchQuery
    ? filteredChoices
    : content?.data?.choices?.choices?.slice(
        0,
        content?.data?.choices?.isSearchable ? content?.data?.choices?.choices?.length : undefined
      );

  useEffect(() => {
    setReaction(content?.data?.reaction);
  }, [content?.data?.reaction]);

  const onLikeDislike = useCallback(
    ({ value, msgId }: { value: 0 | 1 | -1; msgId: string }) => {
      if (value === 1) {
        context?.newSocket.sendMessage({
          payload: {
            app: process.env.NEXT_PUBLIC_BOT_ID || '',
            from: {
              userID: localStorage.getItem('userID'),
            },
            messageType: MessageType.FEEDBACK_POSITIVE,
            messageId: {
              replyId: msgId,
              channelMessageId: sessionStorage.getItem('conversationId'),
            },
          } as Partial<XMessage>,
        });
      } else if (value === -1) {
        context?.setCurrentQuery(msgId);
        context?.setShowFeedbackPopup(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const feedbackHandler = useCallback(
    ({ like, msgId }: { like: 0 | 1 | -1; msgId: string }) => {
      console.log('vbnm:', { reaction, like });
      // Don't let user change reaction once given
      if (reaction !== 0) return toast.error('Cannot give feedback again');
      if (reaction === 0) {
        setReaction(like);
        return onLikeDislike({ value: like, msgId });
      }
      if (reaction === 1 && like === -1) {
        console.log('vbnm triggered 1');
        setReaction(-1);
        return onLikeDislike({ value: -1, msgId });
      }
      if (reaction === -1 && like === 1) {
        console.log('vbnm triggered 2');
        setReaction(1);
        return onLikeDislike({ value: 1, msgId });
      }
    },
    [onLikeDislike, reaction]
  );

  const getLists = useCallback(
    ({ choices, isWeather = false }: { choices: any; isWeather: Boolean }) => {
      return (
        <List className={`${styles.list}`}>
          {choices?.map((choice: any, index: string) => (
            // {_.map(choices ?? [], (choice, index) => (
            <ListItem
              key={`${index}_${choice?.key}`}
              className={`${styles.onHover} ${styles.listItem}`}
              // @ts-ignore
              style={
                optionDisabled
                  ? {
                      background: 'var(--lightgrey)',
                      color: 'var(--font)',
                      boxShadow: 'none',
                    }
                  : null
              }
              onClick={(e: any): void => {
                e.preventDefault();
                console.log('Option Disabled', optionDisabled);
                if (optionDisabled) {
                  toast.error(
                    `${
                      isWeather
                        ? t('message.wait_before_choosing')
                        : t('message.cannot_answer_again')
                    }`
                  );
                } else {
                  context?.sendMessage(choice?.key, choice?.text);
                  setOptionDisabled(true);
                  setTimeout(
                    () =>
                      document.getElementsByClassName('PullToRefresh')?.[0]?.scrollTo({
                        top: 999999,
                        left: 0,
                        behavior: 'smooth',
                      }),
                    500
                  );
                  if (isWeather) {
                    setTimeout(() => {
                      console.log('Enabling options again');
                      setOptionDisabled(false);
                    }, 4001);
                  }
                }
              }}
            >
              <div
                className="onHover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color:
                    content?.data?.position === 'right'
                      ? 'white'
                      : optionDisabled
                        ? 'var(--font)'
                        : 'var(--secondarygreen)',
                }}
              >
                <div>{choice?.text}</div>
                <div style={{ marginLeft: 'auto' }}>
                  <RightIcon
                    width="30px"
                    color={optionDisabled ? 'var(--font)' : 'var(--secondarygreen)'}
                  />
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      );
    },
    [context, t, optionDisabled]
  );

  // useEffect(() => {
  //   if (content?.data?.choices?.choices?.length > 0) {
  //     setPopupActive(true);
  //   }
  // }, [content]);

  console.log('here', content);

  const handleAudio = useCallback(
    (url: any) => {
      // console.log(url)
      if (!url) {
        if (audioFetched) toast.error('No audio');
        return;
      }
      context?.playAudio(url, content);
      setTtsLoader(false);
      saveTelemetryEvent('0.1', 'E015', 'userQuery', 'timesAudioUsed', {
        botId: process.env.NEXT_PUBLIC_BOT_ID || '',
        orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
        userId: localStorage.getItem('userID') || '',
        phoneNumber: localStorage.getItem('phoneNumber') || '',
        conversationId: sessionStorage.getItem('conversationId') || '',
        messageId: content?.data?.replyId,
        text: content?.text,
        timesAudioUsed: 1,
      });
    },
    [audioFetched, content, context?.playAudio]
  );

  const downloadAudio = useCallback(() => {
    const fetchAudio = async (text: string) => {
      const startTime = Date.now();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AI_TOOLS_API}/text-to-speech`,
          {
            text: text,
            language: context?.locale,
            messageId: content?.data?.replyId,
            conversationId: sessionStorage.getItem('conversationId') || '',
          },
          {
            headers: {
              botId: process.env.NEXT_PUBLIC_BOT_ID || '',
              orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
              userId: localStorage.getItem('userID') || '',
            },
          }
        );
        setAudioFetched(true);
        const endTime = Date.now();
        const latency = endTime - startTime;
        await saveTelemetryEvent('0.1', 'E045', 'aiToolProxyToolLatency', 't2sLatency', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: sessionStorage.getItem('conversationId') || '',
          text: text,
          messageId: content?.data?.replyId,
          timeTaken: latency,
          createdAt: Math.floor(startTime / 1000),
          audioUrl: response?.data?.url || 'No audio URL',
        });
        // cacheAudio(response.data);
        return response?.data?.url;
      } catch (error: any) {
        console.error('Error fetching audio:', error);
        setAudioFetched(true);
        const endTime = Date.now();
        const latency = endTime - startTime;
        await saveTelemetryEvent('0.1', 'E045', 'aiToolProxyToolLatency', 't2sLatency', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: sessionStorage.getItem('conversationId') || '',
          text: text,
          msgId: content?.data?.replyId,
          timeTaken: latency,
          createdAt: Math.floor(startTime / 1000),
          error: error?.message || 'Error fetching audio',
        });
        return null;
      }
    };

    const fetchData = async () => {
      if (!content?.data?.audio_url && content?.data?.position === 'left') {
        const toastId = toast.loading(`${t('message.download_audio')}`);
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 1500);
        const text = content?.data?.card?.content?.cells
          ? content?.data?.card?.content?.cells
              ?.map((cell: any) => {
                const texts = [];
                if (cell.header) texts.push(cell.header);
                if (cell.footer) texts.push(cell.footer);
                return texts.join(' ');
              })
              .join(' ')
          : content?.text;
        const audioUrl = await fetchAudio(text ?? 'No text found');

        setTtsLoader(false);
        if (audioUrl) {
          content.data.audio_url = audioUrl;
          handleAudio(audioUrl);
        } else setTtsLoader(false);
      }
    };

    if (content?.data?.audio_url) {
      handleAudio(content.data.audio_url);
    } else {
      setTtsLoader(true);
      fetchData();
    }
  }, [handleAudio, content?.data, content?.text, t]);

  // Hide input box if there are buttons
  useEffect(() => {
    if (content?.data?.choices?.choices?.length > 0) {
      context?.setShowInputBox(false);
    }
  }, [content?.data?.choices?.choices]);

  const parseWeatherJson = (data: any) => {
    if (!data || data.length === 0) {
      console.error('Data is undefined or empty.');
      return [];
    }
    const firstKey = Object.keys(data[0])[0] || 'datetime';
    const result = Object.keys(data[0]).reduce((acc: any, key) => {
      if (key !== firstKey) {
        acc.push({
          [firstKey]: key,
          ...data.reduce((obj: any, item: any) => {
            obj[item[firstKey]] = item[key];
            return obj;
          }, {}),
        });
      }
      return acc;
    }, []);
    console.log({ result, data });
    return result;
  };

  switch (type) {
    case 'loader':
      return <Typing />;
    case 'text':
      return (
        <div
          style={{
            position: 'relative',
            maxWidth: '50vh',
            fontFamily: 'NotoSans-Medium',
          }}
        >
          <Bubble
            id={content?.data?.messageId || uuidv4()}
            type="text"
            style={
              content?.data?.position === 'right'
                ? {
                    background: contrastText,
                    boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                    borderRadius: '15px 15px 0px 15px',
                    padding: '10px, 15px, 10px, 15px',
                    gap: '10px',
                  }
                : {
                    background: content?.data?.card ? contrastText : secondaryColor,
                    boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                    borderRadius: '15px 15px 15px 0px',
                    padding: content?.data?.card ? '0' : '10px, 15px, 10px, 15px',
                    gap: '10px',
                  }
            }
          >
            {content?.data?.card ? (
              <div>
                {content?.data?.card?.banner && (
                  <div
                    style={{
                      background: content?.data?.card?.banner?.color ?? '#EDEDF1',
                      padding: '10px',
                      fontWeight: 600,
                      color: 'black',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '15px 15px 0 0',
                      borderBottom: '1px solid black',
                      fontSize: '18px',
                    }}
                  >
                    {content?.data?.card?.banner?.logo && (
                      <img
                        src={content?.data?.card?.banner?.logo}
                        alt=""
                        height="35px"
                        style={{ flex: 0.12 }}
                      />
                    )}
                    <div
                      style={{
                        flex: 1,
                        marginRight: content?.data?.card?.banner?.logo ? '30px' : '0',
                      }}
                    >
                      {content?.data?.card?.banner?.title}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    background: content?.data?.card?.banner?.color ?? '#EDEDF1',
                    padding: '10px',
                    fontWeight: 600,
                    color: 'black',
                    textAlign: 'center',
                    // borderRadius: '15px 15px 0 0'
                  }}
                >
                  <div>{content?.data?.card?.header?.title}</div>
                  <div>{content?.data?.card?.header?.description}</div>
                </div>
                <div>
                  {content?.data?.card?.content?.cells?.map((cell: any, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          border: '1px solid #EDEDF1',
                          padding: '10px',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          style={{
                            color: theme?.primary?.main,
                          }}
                        >
                          <RichText content={cell?.header} />
                        </div>
                        <div
                          style={{
                            color: 'var(--font)',
                          }}
                        >
                          <RichText content={cell?.footer} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {content?.data?.card?.footer && (
                  <div
                    style={{
                      padding: '20px',
                      borderTop: '1px solid #EDEDF1',
                    }}
                  >
                    <div>
                      <RichText content={content?.data?.card?.footer?.title} />
                    </div>
                    <div>
                      <RichText content={content?.data?.card?.footer?.description} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span
                style={{
                  // fontWeight: 600,
                  fontSize: '16px',
                  color: content?.data?.position === 'right' ? 'var(--font)' : contrastText,
                }}
              >
                {content?.text}{' '}
                {content?.data?.position === 'right'
                  ? null
                  : !content?.data?.isEnd && <BlinkingSpinner />}
                {process.env.NEXT_PUBLIC_DEBUG === 'true' && (
                  <div
                    style={{
                      color: content?.data?.position === 'right' ? 'var(--font)' : 'yellow',
                      fontSize: '12px',
                      fontWeight: 'normal',
                    }}
                  >
                    <br></br>
                    <span>messageId: {content?.data?.messageId}</span>
                    <br></br>
                    <span>conversationId: {content?.data?.conversationId}</span>
                  </div>
                )}
              </span>
            )}

            {/* {getLists({
              choices:
                content?.data?.payload?.buttonChoices ?? content?.data?.choices,
                isWeather: false
            })} */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  color: content?.data?.position === 'right' ? 'var(--font)' : contrastText,
                  fontSize: '12px',
                }}
              >
                {moment(content?.data?.timestamp).format('hh:mma ')}
              </span>
            </div>
          </Bubble>
          {content?.data?.btns ? (
            <div className={styles.offlineBtns}>
              <button
                onClick={() => window?.location?.reload()}
                style={{
                  border: `2px solid ${secondaryColor}`,
                }}
              >
                Refresh
              </button>
            </div>
          ) : (
            content?.data?.position === 'left' && (
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  top: '-10px',
                  justifyContent: 'space-between',
                }}
              >
                {config?.allowTextToSpeech && (
                  <div style={{ display: 'flex' }}>
                    <div
                      // style={{
                      //   border: `1px solid ${theme?.primary?.main}`,
                      // }}
                      data-testid="message-speaker-button"
                      className={styles.msgSpeaker}
                      onClick={downloadAudio}
                      style={
                        !content?.data?.isEnd
                          ? {
                              pointerEvents: 'none',
                              filter: 'grayscale(100%)',
                              opacity: '0.5',
                              border: `1px solid ${theme?.primary?.main}`,
                            }
                          : {
                              pointerEvents: 'auto',
                              opacity: '1',
                              filter: 'grayscale(0%)',
                              border: `1px solid ${theme?.primary?.main}`,
                            }
                      }
                    >
                      {context?.clickedAudioUrl === content?.data?.audio_url ? (
                        !context?.audioPlaying ? (
                          <SpeakerIcon color={theme?.primary?.main} />
                        ) : (
                          <SpeakerPauseIcon color={theme?.primary?.main} />
                        )
                      ) : ttsLoader ? (
                        <Loader color={theme?.primary?.main} />
                      ) : (
                        <SpeakerIcon color={theme?.primary?.main} />
                      )}

                      <p
                        style={{
                          fontSize: '12px',
                          // color: contrastText,
                          fontFamily: 'NotoSans-Bold',
                          display: 'flex',
                          alignItems: 'flex-end',
                          margin: '0 1px 0 0',
                          padding: '0 5px',
                        }}
                      >
                        {t('message.speaker')}
                      </p>
                    </div>
                  </div>
                )}
                {config?.allowFeedback && (!content?.data?.isGuided || content?.data?.card) && (
                  <div className={styles.msgFeedback}>
                    <div
                      className={styles.msgFeedbackIcons}
                      style={{
                        border: `1px solid ${theme?.primary?.main}`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                        data-testid="message-like-button"
                        onClick={() =>
                          feedbackHandler({
                            like: 1,
                            msgId: content?.data?.messageId,
                          })
                        }
                      >
                        <MsgThumbsUp fill={reaction === 1} width="20px" />
                        <p
                          style={{
                            fontSize: '12px',
                            fontFamily: 'NotoSans-Bold',
                            margin: 0,
                          }}
                        >
                          {t('label.helpful')}
                        </p>
                      </div>
                      <div
                        style={{
                          height: '32px',
                          width: '1px',
                          backgroundColor: theme?.primary?.main,
                          margin: '6px 0',
                        }}
                      ></div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                        data-testid="message-dislike-button"
                        onClick={() =>
                          feedbackHandler({
                            like: -1,
                            msgId: content?.data?.messageId,
                          })
                        }
                      >
                        <MsgThumbsDown fill={reaction === -1} width="20px" />
                        <p
                          style={{
                            fontSize: '12px',
                            fontFamily: 'NotoSans-Bold',
                            margin: 0,
                          }}
                        >
                          {t('label.not_helpful')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          {content?.data?.choices?.choices?.length > 0 && (
            <>
              <Popup
                showBack={content?.data?.choices?.choices?.find(
                  (choice: any) => choice?.key?.toLowerCase() === 'guided: back'
                )}
                handleBack={() => {
                  setPopupActive(false);
                  context?.sendMessage('Guided: back', 'Back');
                  if (
                    content?.data?.choices?.choices?.find(
                      (choice: any) => choice?.key?.toLowerCase() === 'guided: back'
                    )?.showTextInput
                  ) {
                    context?.setShowInputBox(true);
                  }
                }}
                bottom={content?.data?.choices?.isSearchable ? '65px' : '0px'}
                isCollapsed={content?.data?.choices?.isCollapsed ?? false}
                height={'20vh'}
                onClose={() => {
                  setPopupActive(false);
                }}
                active={popupActive}
                backdrop={false}
                showClose={false}
                bgColor="transparent"
                title={content?.data?.choices?.header}
                titleColor="var(--font)"
                titleSize="16px"
              >
                {displayedChoices.map((item: any, index: number) => {
                  if (item?.key?.toLowerCase() === 'guided: back') return null;
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px',
                        color: 'var(--font)',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        borderBottom: '2px solid #DDDDDD',
                        textAlign: 'center',
                      }}
                      onClick={() => {
                        setPopupActive(false);
                        if (item?.showTextInput) {
                          context?.setShowInputBox(true);
                          context?.sendMessage(item?.key, item?.text);
                        } else if (item?.action === 'home') {
                          const newConversationId = uuidv4();
                          sessionStorage.setItem('conversationId', newConversationId);
                          sessionStorage.removeItem('tags');
                          context?.setShowInputBox(true);
                          if (context?.audioElement) context?.audioElement.pause();
                          if (context?.setAudioPlaying) context?.setAudioPlaying(false);
                          context?.setConversationId(newConversationId);
                          context?.setMessages([]);
                          context?.setIsMsgReceiving(false);
                          context?.setLoading(false);
                          router.push('/');
                        } else {
                          context?.sendMessage(item?.key, item?.text);
                        }
                      }}
                    >
                      {item.text}
                    </div>
                  );
                })}
              </Popup>
              {content?.data?.choices?.isSearchable && popupActive && (
                <div
                  style={{
                    padding: '10px',
                    background: 'white',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                  }}
                >
                  <TransliterationInput
                    placeholder={t('label.buttons_search_placeholder') || 'Search'}
                    value={searchQuery}
                    setValue={setSearchQuery}
                    config={config}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '35px',
                      padding: '6px',
                      color: 'var(--font)',
                      fontFamily: 'NotoSans-Medium',
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                      border: '1px solid var(--font)',
                      outline: 'none',
                      borderRadius: '10px',
                    }}
                    // onChange={handleSearchChange}
                  />
                </div>
              )}
            </>
          )}
          {content?.data?.choices?.choices?.length > 0 && (
            <div
              style={{
                height: popupActive ? '250px' : '0px',
                width: '100vw',
              }}
            ></div>
          )}
        </div>
      );

    case 'image': {
      const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;
      return (
        <div style={{ fontFamily: 'NotoSans-Regular' }}>
          {content?.data?.position === 'left' && (
            <div
              style={{
                width: '40px',
                marginRight: '4px',
                textAlign: 'center',
              }}
            ></div>
          )}
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <Img src={url} width="299" height="200" alt="image" lazy fluid />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}
              >
                <span
                  style={{
                    color: contrastText,
                    fontSize: '10px',
                  }}
                >
                  {moment(content?.data?.timestamp).format('hh:mm A DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </Bubble>
        </div>
      );
    }

    case 'file': {
      const url = content?.data?.payload?.media?.url || content?.data?.fileUrl;
      return (
        <div style={{ fontFamily: 'NotoSans-Regular' }}>
          {content?.data?.position === 'left' && (
            <div
              style={{
                width: '40px',
                marginRight: '4px',
                textAlign: 'center',
              }}
            ></div>
          )}
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <FileCard file={url} extension="pdf" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}
              >
                <span
                  style={{
                    color: contrastText,
                    fontSize: '10px',
                  }}
                >
                  {moment(content?.data?.timestamp).format('hh:mm A DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </Bubble>
        </div>
      );
    }

    case 'video': {
      const url = content?.data?.payload?.media?.url || content?.data?.videoUrl;
      const videoId = url.split('=')[1];
      return (
        <div style={{ fontFamily: 'NotoSans-Regular' }}>
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <iframe
                width="100%"
                height="fit-content"
                src={`https://www.youtube.com/embed/` + videoId}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}
              >
                <span
                  style={{
                    color: contrastText,
                    fontSize: '10px',
                  }}
                >
                  {moment(content?.data?.timestamp).format('hh:mm A DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </Bubble>
        </div>
      );
    }
    case 'options': {
      return (
        <div style={{ fontFamily: 'NotoSans-Regular' }}>
          <Bubble type="text" className={styles.textBubble}>
            <div style={{ display: 'flex' }}>
              <span className={styles.optionsText}>
                {content?.data?.payload?.text}
                {process.env.NEXT_PUBLIC_DEBUG === 'true' && (
                  <div
                    style={{
                      color: 'var(--font)',
                      fontSize: '12px',
                      fontWeight: 'normal',
                    }}
                  >
                    <br></br>
                    <span>messageId: {content?.data?.messageId}</span>
                    <br></br>
                    <span>conversationId: {content?.data?.conversationId}</span>
                  </div>
                )}
              </span>
            </div>
            {getLists({
              choices: content?.data?.choices?.choices,
              isWeather: false,
            })}
          </Bubble>
        </div>
      );
    }

    case 'table': {
      console.log({ table: content });
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '90vw',
            fontFamily: 'NotoSans-Regular',
          }}
        >
          <Bubble
            id={content?.data?.messageId || uuidv4()}
            type="text"
            style={
              content?.data?.position === 'right'
                ? {
                    background: secondaryColor,
                    boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                    borderRadius: '15px 15px 0px 15px',
                    padding: '10px, 15px, 10px, 15px',
                    gap: '10px',
                  }
                : {
                    background: contrastText,
                    boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                    borderRadius: '15px 15px 15px 0px',
                    padding: '10px, 15px, 10px, 15px',
                    gap: '10px',
                  }
            }
          >
            <div className={styles.tableContainer} style={{ overflowX: 'scroll' }}>
              {<JsonToTable json={parseWeatherJson(JSON.parse(content?.text)?.table)} />}
              <style>
                {`
          div::-webkit-scrollbar-thumb {
            background-color: #d4aa70;
            border-radius: 10px;
          }
        `}
              </style>
            </div>
            <span
              style={{
                // fontWeight: 600,
                fontSize: '16px',
                color: content?.data?.position === 'right' ? contrastText : 'var(--font)',
              }}
            >
              {`\n` + JSON.parse(content?.text)?.generalAdvice ||
                '' + `\n\n` + JSON.parse(content?.text)?.buttonDescription ||
                ''}
              {/* {getLists({
                choices: JSON.parse(content?.text)?.buttons,
                isWeather: true,
              })} */}
              {process.env.NEXT_PUBLIC_DEBUG === 'true' && (
                <div
                  style={{
                    color: 'var(--font)',
                    fontSize: '12px',
                    fontWeight: 'normal',
                  }}
                >
                  <br></br>
                  <span>messageId: {content?.data?.messageId}</span>
                  <br></br>
                  <span>conversationId: {content?.data?.conversationId}</span>
                </div>
              )}
            </span>
          </Bubble>
          {content?.data?.choices?.choices?.length > 0 && (
            <>
              <Popup
                showBack={content?.data?.choices?.choices?.find(
                  (choice: any) => choice?.key?.toLowerCase() === 'guided: back'
                )}
                handleBack={() => {
                  setPopupActive(false);
                  context?.sendMessage('Guided: back', 'Back');
                  if (
                    content?.data?.choices?.choices?.find(
                      (choice: any) => choice?.key?.toLowerCase() === 'guided: back'
                    )?.showTextInput
                  ) {
                    context?.setShowInputBox(true);
                  }
                }}
                bottom={content?.data?.choices?.isSearchable ? '65px' : '0px'}
                isCollapsed={content?.data?.choices?.isCollapsed ?? false}
                height={'20vh'}
                onClose={() => {
                  setPopupActive(false);
                }}
                active={popupActive}
                backdrop={false}
                showClose={false}
                bgColor="transparent"
                title={content?.data?.choices?.header}
                titleColor="var(--font)"
                titleSize="16px"
              >
                {displayedChoices.map((item: any, index: number) => {
                  if (item?.key?.toLowerCase() === 'guided: back') return null;
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px',
                        color: 'var(--font)',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        borderBottom: '2px solid #DDDDDD',
                        textAlign: 'center',
                      }}
                      onClick={() => {
                        setPopupActive(false);
                        if (item?.showTextInput) {
                          context?.setShowInputBox(true);
                          context?.sendMessage(item?.key, item?.text);
                        } else if (item?.action === 'home') {
                          const newConversationId = uuidv4();
                          sessionStorage.setItem('conversationId', newConversationId);
                          sessionStorage.removeItem('tags');
                          context?.setShowInputBox(true);
                          if (context?.audioElement) context?.audioElement.pause();
                          if (context?.setAudioPlaying) context?.setAudioPlaying(false);
                          context?.setConversationId(newConversationId);
                          context?.setMessages([]);
                          context?.setIsMsgReceiving(false);
                          context?.setLoading(false);
                          router.push('/');
                        } else {
                          context?.sendMessage(item?.key, item?.text);
                        }
                      }}
                    >
                      {item.text}
                    </div>
                  );
                })}
              </Popup>
              {content?.data?.choices?.isSearchable && (
                <div
                  style={{
                    padding: '10px',
                    background: 'white',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                  }}
                >
                  <TransliterationInput
                    placeholder={t('label.buttons_search_placeholder') || 'Search'}
                    value={searchQuery}
                    setValue={setSearchQuery}
                    config={config}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '45px',
                      padding: '4px',
                      color: 'var(--font)',
                      fontFamily: 'NotoSans-Medium',
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                      border: 'none',
                      outline: 'none',
                      borderRadius: '10px',
                    }}
                    // onChange={handleSearchChange}
                  />
                </div>
              )}
            </>
          )}
          {content?.data?.choices?.choices?.length > 0 && (
            <div
              style={{
                height: popupActive ? '250px' : '0px',
                width: '100vw',
              }}
            ></div>
          )}
        </div>
      );
    }
    default:
      return (
        <ScrollView
          data={[]}
          renderItem={(item): ReactElement => (
            // @ts-ignore
            <Button label={item.text} />
          )}
        />
      );
  }
};

export default MessageItem;
