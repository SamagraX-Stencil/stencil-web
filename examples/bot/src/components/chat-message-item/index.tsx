import {
  Bubble,
  Image as Img,
  ScrollView,
  List,
  ListItem,
  FileCard,
  Video,
  Typing,
  //@ts-ignore
} from '@samagra-x/chatui';
import axios from 'axios';
import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-hot-toast';
import colorConfig from '../../../config/colors.json';
import styles from './index.module.css';
// import { analytics } from '../../utils/firebase';
// import { logEvent } from 'firebase/analytics';
import RightIcon from '../../assets/icons/right.jsx';
import SpeakerIcon from '../../assets/icons/speaker.svg';
import SpeakerPauseIcon from '../../assets/icons/speakerPause.png';
import MsgThumbsUp from '../../assets/icons/msg-thumbs-up.jsx';
import MsgThumbsDown from '../../assets/icons/msg-thumbs-down.jsx';
// import reload from '../../assets/icons/reload.svg';
import { AppContext } from '../../context';
import { ChatMessageItemPropType } from '../../types';
import { getFormatedTime } from '../../utils/getUtcTime';
import { useLocalization } from '../../hooks/useLocalization';
import { getReactionUrl } from '../../utils/getUrls';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';
import { Button, color } from '@chakra-ui/react';
import flagsmith from 'flagsmith/isomorphic';
import Loader from '../loader';
import { useCookies } from 'react-cookie';
import BlinkingSpinner from '../blinking-spinner/index';

const getToastMessage = (t: any, reaction: number): string => {
  if (reaction === 1) return t('toast.reaction_like');
  return t('toast.reaction_reset');
};
const ChatMessageItem: FC<ChatMessageItemPropType> = ({ message, onSend }) => {
  const flags = useFlags(['show_msg_id', 'dialer_number']);

  const t = useLocalization();
  const [cookie] = useCookies();
  const context = useContext(AppContext);
  const [reaction, setReaction] = useState(message?.content?.data?.reaction);
  const [audioFetched, setAudioFetched] = useState(false);
  const [ttsLoader, setTtsLoader] = useState(false);
  const [reloadImg, setReloadImg] = useState<any>();

  useEffect(() => {
    setReaction(message?.content?.data?.reaction);
  }, [message?.content?.data?.reaction]);

  const LinkifyText = ({ text }: any) => {
    // Regular expression to find URLs in the text
    const urlRegex = /(https?:\/\/[^\s]+[^\s.,])/g;

    // Split the text into an array of text and links
    const parts = text.split(urlRegex);

    // Map through the parts and create clickable links
    const content = parts.map((part: any, index: any) => {
      if (part.match(urlRegex)) {
        // If part is a link, return a clickable link
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        // If part is text, return the text
        return <span key={index}>{part}</span>;
      }
    });

    return <div>{content}</div>;
  };

  const onLikeDislike = useCallback(
    ({ value, msgId }: { value: 0 | 1 | -1; msgId: string }) => {
      let url = getReactionUrl({ msgId, reaction: value });

      axios
        .get(url, {
          headers: {
            authorization: `Bearer ${cookie['auth']}`,
          },
        })
        .then((res: any) => {
          if (value === -1) {
            context?.setCurrentQuery(msgId);
            context?.setShowDialerPopup(true);
          } else {
            toast.success(`${getToastMessage(t, value)}`);
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, cookie['auth']]
  );

  async function copyTextToClipboard(text: string) {
    console.log('here');
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const feedbackHandler = useCallback(
    ({ like, msgId }: { like: 0 | 1 | -1; msgId: string }) => {
      console.log('vbnm:', { reaction, like });
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

      console.log('vbnm triggered');
      onLikeDislike({ value: 0, msgId });
      setReaction(0);
    },
    [onLikeDislike, reaction]
  );

  const getLists = useCallback(
    ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => {
      console.log('qwer12:', { choices, isDisabled });
      return (
        <List className={`${styles.list}`}>
          {choices?.map((choice: any, index: string) => (
            // {_.map(choices ?? [], (choice, index) => (
            <ListItem
              key={`${index}_${choice?.key}`}
              className={`${styles.onHover} ${styles.listItem}`}
              onClick={(e: any): void => {
                e.preventDefault();
                console.log('qwer12 trig', { key: choice.key, isDisabled });
                if (isDisabled) {
                  toast.error(`${t('message.cannot_answer_again')}`);
                } else {
                  if (context?.messages?.[0]?.exampleOptions) {
                    console.log('clearing chat');
                    context?.setMessages([]);
                  }
                  context?.sendMessage(choice.text);
                }
              }}>
              <div className="onHover" style={{ display: 'flex' }}>
                <div>{choice.text}</div>
                <div style={{ marginLeft: 'auto' }}>
                  <RightIcon width="45px" color="var(--primary)" />
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      );
    },
    [context, t]
  );
  const { content, type } = message;

  const handleAudio = useCallback(
    (url: any) => {
      // console.log(url)
      if (!url) {
        if (audioFetched) toast.error('No audio');
        // else {
        //   const toastId = toast.loading('Downloading audio');
        //   setTimeout(() => {
        //     toast.dismiss(toastId);
        //   }, 1000);
        // }
        return;
      }
      context?.playAudio(url, content);
      setTtsLoader(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioFetched, content, context?.playAudio]
  );

  const downloadAudio = useCallback(() => {
    const cacheAudio = async (url: string) => {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/storeaudio`;

      const requestData = {
        queryId: message?.content?.data?.messageId,
        audioUrl: url,
      };

      axios
        .post(apiUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Cache Audio Response:', response.data);
        })
        .catch((error) => {
          console.error('Cache Audio Error:', error);
        });
    };

    const fetchAudio = async (text: string) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/aitools/t2s`,
          {
            text: text,
          }
        );
        setAudioFetched(true);
        cacheAudio(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching audio:', error);
        setAudioFetched(true);
        return null;
      }
    };

    const fetchData = async () => {
      if (
        !message?.content?.data?.audio_url &&
        message?.content?.data?.position === 'left' &&
        message?.content?.text
      ) {
        const toastId = toast.loading(`${t('message.download_audio')}`);
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 1500);
        const audioUrl = await fetchAudio(message?.content?.text);
        setTtsLoader(false);
        if (audioUrl) {
          message.content.data.audio_url = audioUrl;
          handleAudio(audioUrl);
        } else setTtsLoader(false);
      }
    };
    if (message.content?.data?.audio_url) {
      handleAudio(message.content.data.audio_url);
    } else {
      setTtsLoader(true);
      fetchData();
    }
  }, [handleAudio, message.content?.data, message.content?.text, t]);

  interface HyperlinkProps {
    content: string;
  }

  //@ts-ignore
  const HyperlinkText = ({ content }: HyperlinkProps) => {
    const URL_REGEX = /https?:\/\/[^\s]+/;
    let words = content.split(' ');
    if (words?.[0] == ':') {
      words = words.slice(1);
    }
    return (
      <p>
        {words.map((word) => {
          let href = word.match(URL_REGEX)?.[0];
          if (href) {
            if (href[0] == '.') href = href.slice(1);
            if (href[href.length - 1] == '.' || href[href.length - 1] == ',')
              href = href.slice(0, href.length - 1);
            if (href[0] == '(') href = href.slice(1);
            if (href[href.length - 1] == ')')
              href = href.slice(0, href.length - 1);
          }
          return word.match(URL_REGEX) ? (
            <>
              <a
                href={href}
                target="_blank"
                style={{ color: '#4286f4' }}
                rel="noopener noreferrer">
                {word}
              </a>{' '}
            </>
          ) : (
            word + ' '
          );
        })}
      </p>
    );
  };

  // console.log('#-debug:', content);
  switch (type) {
    case 'loader':
      return <Typing />;
    case 'text':
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '80vw',
          }}>
          <div
            className={
              content?.data?.position === 'right'
                ? styles.messageTriangleRight
                : styles.messageTriangleLeft
            }
            style={
              content?.data?.position === 'right'
                ? {
                    borderColor: `${colorConfig.colors.secondary} transparent transparent transparent`,
                  }
                : {
                    borderColor: `${colorConfig.colors.primary} transparent transparent transparent`,
                  }
            }></div>
          <Bubble
            type="text"
            style={
              content?.data?.position === 'right'
                ? { background: colorConfig.colors.secondary }
                : { background: colorConfig.colors.primary }
            }>
            <span
              className="onHover"
              style={{
                // fontWeight: 600,
                fontSize: '1rem',
                color:
                  content?.data?.position === 'right'
                    ? 'white'
                    : colorConfig.colors.font,
              }}>
              {content?.data?.btns ? (
                <>
                  {localStorage.getItem('locale') === 'en'
                    ? `No signal. \nPlease check your internet connection`
                    : `सिग्नल नहीं। \nकृपया अपना इंटरनेट कनेक्शन चेक करें।`}
                </>
              ) : (
                <>
                  <HyperlinkText content={content?.text} />{' '}
                  {content?.data?.position === 'right'
                    ? null
                    : !content?.data?.isEnd && <BlinkingSpinner />}
                </>
              )}
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              {content?.data?.position === 'left' &&
                flags?.show_msg_id?.enabled && (
                  <span>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="xs"
                      onClick={() =>
                        copyTextToClipboard(content?.data?.messageId)
                          .then(() => {
                            toast.success('coppied');
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                      }>
                      {content?.data?.messageId}
                    </Button>
                  </span>
                )}

              <span
                style={{
                  color:
                    content?.data?.position === 'right'
                      ? 'white'
                      : colorConfig.colors.font,
                  fontSize: '10px',
                }}>
                {getFormatedTime(
                  content?.data?.sentTimestamp ||
                    content?.data?.repliedTimestamp
                )}
              </span>
            </div>
          </Bubble>
          {content?.data?.btns ? (
            <div className={styles.offlineBtns}>
              <button onClick={() => window?.location?.reload()}>
                {localStorage.getItem('locale') === 'en'
                  ? `Refresh`
                  : `रिफ्रेश करें`}
                {/* {reloadImg} */}
                {/* <Image src={reloadImg.src} alt="reload" width={20} height={20} /> */}
              </button>
              {/* <button onClick={() => context?.stopMsg(content?.data?.messageId)}>
                {t('label.stop')}
                <Image src={reload} alt="reload" width={20} height={20} />
              </button> */}
              {/* <button>
                <a href={`tel:${flags.dialer_number.value}`}>
                  {t('label.call_stencil')}
                </a>
              </button> */}
            </div>
          ) : (
            content?.data?.position === 'left' && (
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  top: '-10px',
                  justifyContent: 'space-between',
                }}>
                {/* <div style={{ display: 'flex' }}>
                  <div
                    className={styles.msgSpeaker}
                    onClick={!ttsLoader ? downloadAudio : () => { }}
                    style={
                      !content?.data?.isEnd
                        ? {
                          pointerEvents: 'none',
                          filter: 'grayscale(100%)',
                          opacity: '0.5',
                        }
                        : {
                          pointerEvents: 'auto',
                          opacity: '1',
                          filter: 'grayscale(0%)',
                        }
                    }>
                    {context?.clickedAudioUrl === content?.data?.audio_url ? (
                      <Image
                        src={
                          !context?.audioPlaying
                            ? SpeakerIcon
                            : SpeakerPauseIcon
                        }
                        width={!context?.audioPlaying ? 15 : 15}
                        height={!context?.audioPlaying ? 15 : 15}
                        alt=""
                      />
                    ) : ttsLoader ? (
                      <Loader />
                    ) : (
                      <Image src={SpeakerIcon} width={15} height={15} alt="" />
                    )}
                    <p
                      style={{
                        fontSize: '11px',
                        color: colorConfig.colors.font,
                        fontFamily: 'Mulish-bold',
                        display: 'flex',
                        alignItems: 'flex-end',
                        marginRight: '1px',
                        padding: '0 5px',
                      }}>
                      {t('message.speaker')}
                    </p>
                  </div>
                </div> */}
                {/* <div className={styles.msgFeedback}>
                  <div className={styles.msgFeedbackIcons}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingRight: '6px',
                      }}
                      onClick={() =>
                        feedbackHandler({
                          like: 1,
                          msgId: content?.data?.messageId,
                        })
                      }>
                      <MsgThumbsUp
                        fill={reaction === 1}
                        width="20px"
                        color=colorConfig.colors.primary
                      />
                      <p
                        style={{ fontSize: '11px', fontFamily: 'Mulish-bold' }}>
                        {t('label.helpful')}
                      </p>
                    </div>
                    <div
                      style={{
                        height: '32px',
                        width: '1px',
                        backgroundColor: 'var(--primary)',
                        margin: '6px 0',
                      }}></div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                      onClick={() =>
                        feedbackHandler({
                          like: -1,
                          msgId: content?.data?.messageId,
                        })
                      }>
                      <MsgThumbsDown
                        fill={reaction === -1}
                        width="20px"
                        color="var(--primary)"
                      />
                      <p
                        style={{ fontSize: '11px', fontFamily: 'Mulish-bold' }}>
                        {t('label.not_helpful')}
                      </p>
                    </div>
                  </div>
                  &nbsp; */}
                {/* <p>{t('message.helpful')}</p> */}
                {/* </div> */}
              </div>
            )
          )}
        </div>
      );

    case 'image': {
      const urls = content?.data?.imageUrls;
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '80vw',
          }}>
          <div
            className={
              content?.data?.position === 'right'
                ? styles.messageTriangleRight
                : styles.messageTriangleLeft
            }></div>
          <Bubble type="text">
            <div style={{ padding: '7px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {urls?.map((url: string, index: number) => {
                  return (
                    <Img
                      key={index}
                      style={{ marginBottom: '10px' }}
                      src={url}
                      width="auto"
                      height="auto"
                      alt="image"
                      lazy
                      fluid
                    />
                  );
                })}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <div
                  style={{
                    // fontWeight: 600,
                    fontSize: '1rem',
                    color:
                      content?.data?.position === 'right'
                        ? 'white'
                        : colorConfig.colors.primary,
                  }}>
                  {content?.data?.btns ? (
                    <>
                      {localStorage.getItem('locale') === 'en'
                        ? `No signal. \nPlease check your internet connection`
                        : `सिग्नल नहीं। \nकृपया अपना इंटरनेट कनेक्शन चेक करें।`}
                    </>
                  ) : (
                    <>
                      <HyperlinkText content={content?.text} />{' '}
                      {content?.data?.position === 'right'
                        ? null
                        : !content?.data?.isEnd && <BlinkingSpinner />}
                    </>
                  )}
                </div>
                <span
                  style={{
                    color: colorConfig.colors.font,
                    fontSize: '10px',
                    marginLeft: 'auto',
                  }}>
                  {getFormatedTime(
                    content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                  )}
                </span>
              </div>
            </div>
          </Bubble>
          {content?.data?.btns ? (
            <div className={styles.offlineBtns}>
              <button onClick={() => window?.location?.reload()}>
                {localStorage.getItem('locale') === 'en'
                  ? `Refresh`
                  : `रिफ्रेश करें`}
                {/* <Image src={reloadImg.src} alt="reload" width={20} height={20} /> */}
              </button>
              {/* <button onClick={() => context?.stopMsg(content?.data?.messageId)}>
                {t('label.stop')}
                <Image src={reload} alt="reload" width={20} height={20} />
              </button> */}
              {/* <button>
              <a href={`tel:${flags.dialer_number.value}`}>
                {t('label.call_stencil')}
              </a>
            </button> */}
            </div>
          ) : (
            content?.data?.position === 'left' && (
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  top: '-10px',
                  justifyContent: 'space-between',
                }}>
                <div style={{ display: 'flex' }}>
                  <div
                    className={styles.msgSpeaker}
                    onClick={!ttsLoader ? downloadAudio : () => {}}
                    style={
                      !content?.data?.isEnd
                        ? {
                            pointerEvents: 'none',
                            filter: 'grayscale(100%)',
                            opacity: '0.5',
                          }
                        : {
                            pointerEvents: 'auto',
                            opacity: '1',
                            filter: 'grayscale(0%)',
                          }
                    }>
                    {context?.clickedAudioUrl === content?.data?.audio_url ? (
                      <Image
                        src={
                          !context?.audioPlaying
                            ? SpeakerIcon
                            : SpeakerPauseIcon
                        }
                        width={!context?.audioPlaying ? 15 : 15}
                        height={!context?.audioPlaying ? 15 : 15}
                        alt=""
                      />
                    ) : ttsLoader ? (
                      <Loader />
                    ) : (
                      <Image src={SpeakerIcon} width={15} height={15} alt="" />
                    )}
                    <p
                      style={{
                        fontSize: '11px',
                        color: colorConfig.colors.font,
                        fontFamily: 'Mulish-bold',
                        display: 'flex',
                        alignItems: 'flex-end',
                        marginRight: '1px',
                        padding: '0 5px',
                      }}>
                      {t('message.speaker')}
                    </p>
                  </div>
                </div>
                <div className={styles.msgFeedback}>
                  <div className={styles.msgFeedbackIcons}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingRight: '6px',
                      }}
                      onClick={() =>
                        feedbackHandler({
                          like: 1,
                          msgId: content?.data?.messageId,
                        })
                      }>
                      <MsgThumbsUp
                        fill={reaction === 1}
                        width="20px"
                        color={colorConfig.colors.primary}
                      />
                      <p
                        style={{ fontSize: '11px', fontFamily: 'Mulish-bold' }}>
                        {t('label.helpful')}
                      </p>
                    </div>
                    <div
                      style={{
                        height: '32px',
                        width: '1px',
                        backgroundColor: 'var(--primary)',
                        margin: '6px 0',
                      }}></div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                      onClick={() =>
                        feedbackHandler({
                          like: -1,
                          msgId: content?.data?.messageId,
                        })
                      }>
                      <MsgThumbsDown
                        fill={reaction === -1}
                        width="20px"
                        color="var(--primary)"
                      />
                      <p
                        style={{ fontSize: '11px', fontFamily: 'Mulish-bold' }}>
                        {t('label.not_helpful')}
                      </p>
                    </div>
                  </div>
                  &nbsp;
                  {/* <p>{t('message.helpful')}</p> */}
                </div>
              </div>
            )
          )}
        </div>
      );
    }

    case 'file': {
      const url = content?.data?.payload?.media?.url || content?.data?.fileUrl;
      return (
        <>
          {content?.data?.position === 'left' && (
            <div
              style={{
                width: '40px',
                marginRight: '4px',
                textAlign: 'center',
              }}></div>
          )}
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <FileCard file={url} extension="pdf" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}>
                <span
                  style={{ color: colorConfig.colors.font, fontSize: '10px' }}>
                  {getFormatedTime(
                    content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                  )}
                </span>
              </div>
            </div>
          </Bubble>
        </>
      );
    }

    case 'video': {
      const url = content?.data?.payload?.media?.url || content?.data?.videoUrl;
      return (
        <>
          {content?.data?.position === 'left' && (
            <div
              style={{
                width: '40px',
                marginRight: '4px',
                textAlign: 'center',
              }}></div>
          )}
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <Video
                cover="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/video-icon.png"
                src={url}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}>
                <span
                  style={{ color: colorConfig.colors.font, fontSize: '10px' }}>
                  {getFormatedTime(
                    content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                  )}
                </span>
              </div>
            </div>
          </Bubble>
        </>
      );
    }
    case 'options': {
      console.log('qwe12:', { content });
      return (
        <>
          {/* <div
            style={{ width: "95px", marginRight: "4px", textAlign: "center" }}
          ></div> */}
          <Bubble type="text" className={styles.textBubble}>
            <div style={{ display: 'flex' }}>
              <span className={styles.optionsText}>
                {content?.data?.payload?.text}
              </span>
            </div>
            {getLists({
              choices:
                content?.data?.payload?.buttonChoices ?? content?.data?.choices,
              isDisabled: false,
            })}
          </Bubble>
        </>
      );
    }
    default:
      return (
        <ScrollView
          data={[]}
          // @ts-ignore
          renderItem={(item): ReactElement => <Button label={item.text} />}
        />
      );
  }
};

export default ChatMessageItem;
