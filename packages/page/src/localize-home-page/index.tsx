import styles from './index.module.css';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import SendButton from './assets/sendButton';
import router from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import DowntimePage from '../downtime-page';
import kaliaStatusImg from './assets/kalia_status.png';
import plantProtectionImg from './assets/plant_protection.png';
import weatherAdvisoryImg from './assets/weather_advisory.png';
import { AppContext } from '@repo/provider';
import { useColorPalates, useConfig, useLocalization } from '@repo/hooks';
import { recordUserLocation } from '../resources/utils/location';
import { VoiceRecorder } from '@repo/molecules';

const LocalHomePage: NextPage = () => {
  const context = useContext(AppContext);
  const botConfig = useConfig('component', 'chatUI');
  const config = useConfig('component', 'homePage');
  const { micWidth, micHeight } = config;
  const t = useLocalization();
  const inputRef = useRef(null);
  const placeholder = useMemo(() => t('message.ask_ur_question'), [t]);
  const [inputMsg, setInputMsg] = useState('');
  const voiceRecorderRef = useRef(null);
  const chatBoxButton = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const theme = useColorPalates();
  const secondaryColor = useMemo(() => {
    return theme?.primary?.main;
  }, [theme?.primary?.main]);

  const suggestionHandler = (e: any, index: number) => {
    setActiveSuggestion(index);
  };

  useEffect(() => {
    if (
      inputMsg.length > 0 &&
      botConfig?.allowTransliteration &&
      localStorage.getItem('locale') === botConfig?.transliterationOutputLanguage
    ) {
      if (suggestionClicked) {
        setSuggestionClicked(false);
        return;
      }

      setSuggestions([]);

      const words = inputMsg.split(' ');
      const wordUnderCursor = words.find(
        (word, index) =>
          cursorPosition >= inputMsg.indexOf(word) &&
          cursorPosition <= inputMsg.indexOf(word) + word.length,
      );

      if (!wordUnderCursor) return;
      let data = JSON.stringify({
        inputLanguage: botConfig?.transliterationInputLanguage,
        outputLanguage: botConfig?.transliterationOutputLanguage,
        input: wordUnderCursor,
        provider: botConfig?.transliterationProvider || 'bhashini',
        numSuggestions: botConfig?.transliterationSuggestions || 3,
      });

      let axiosConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_AI_TOOLS_API}/transliterate`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios
        .request(axiosConfig)
        .then((res: any) => {
          // console.log("hurray", res?.data?.output?.[0]?.target);
          setSuggestions(res?.data?.suggestions);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Transliteration failed');
        });
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMsg, cursorPosition]);

  useEffect(() => {
    context?.fetchIsDown(); // check if server is down

    if (!sessionStorage.getItem('conversationId')) {
      const newConversationId = uuidv4();
      sessionStorage.setItem('conversationId', newConversationId);
      context?.setConversationId(newConversationId);
    }
    recordUserLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(
    async (msg: string) => {
      if (msg.length === 0) {
        toast.error(t('error.empty_msg'));
        return;
      }
      if (context?.newSocket?.socket?.connected) {
        console.log('clearing mssgs');
        context?.setMessages([]);
        router.push('/chat');
        if (context?.kaliaClicked) {
          context?.sendMessage('Aadhaar number - ' + msg, 'Aadhaar number - ' + msg, null, true);
        } else context?.sendMessage(msg, msg);
      } else {
        toast.error(t('error.disconnected'));
        return;
      }
    },
    [context, t],
  );

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    if (context?.kaliaClicked) {
      if (!/^[0-9]*$/.test(inputValue) || inputValue.length > 12) {
        toast.error('Please enter valid aadhaar number');
        // setInputMsg(inputValue.slice(0, 12));
      } else setInputMsg(inputValue);
    } else setInputMsg(inputValue);
    // Store the cursor position
    const cursorPosition = e.target.selectionStart;
    setCursorPosition(cursorPosition);
    // setShowExampleMessages(inputValue.length === 0);
    // Adjust textarea height dynamically based on content
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.style.height = 'auto';
      //@ts-ignore
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleDocumentClick = useCallback((event: any) => {
    const target = event.target;

    // Check if clicked outside voiceRecorder and exampleMessages
    if (
      //@ts-ignore
      !voiceRecorderRef.current?.contains(target) &&
      //@ts-ignore
      !chatBoxButton.current?.contains(target)
    ) {
      // setShowExampleMessages(false);
      setSuggestions([]);
      // setShowChatBox(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  const suggestionClickHandler = useCallback(
    (e: any) => {
      const words = inputMsg.split(' ');

      // Find the word at the cursor position
      //@ts-ignore
      const cursorPosition = inputRef.current.selectionStart;
      let currentIndex = 0;
      let selectedWord = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (currentIndex <= cursorPosition && cursorPosition <= currentIndex + word.length) {
          selectedWord = word;
          break;
        }
        currentIndex += word.length + 1; // +1 to account for the space between words
      }

      // Replace the selected word with the transliterated suggestion
      if (selectedWord !== '') {
        const newInputMsg = inputMsg.replace(
          selectedWord,
          cursorPosition === inputMsg.length ? e + ' ' : e,
        );

        setSuggestions([]);
        setSuggestionClicked(true);
        setActiveSuggestion(0);

        setInputMsg(newInputMsg);

        //@ts-ignore
        inputRef.current && inputRef.current.focus();
      }
    },
    [inputMsg],
  );

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.keyCode === 229) return;
      // console.log(e);
      if (suggestions.length > 0) {
        if (e.code === 'ArrowUp') {
          e.preventDefault();
          setActiveSuggestion((prevActiveSuggestion) =>
            prevActiveSuggestion > 0 ? prevActiveSuggestion - 1 : prevActiveSuggestion,
          );
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          setActiveSuggestion((prevActiveSuggestion) =>
            prevActiveSuggestion < suggestions.length - 1
              ? prevActiveSuggestion + 1
              : prevActiveSuggestion,
          );
        } else if (e.data === ' ') {
          e.preventDefault && e.preventDefault();
          if (activeSuggestion >= 0 && activeSuggestion < suggestions?.length) {
            suggestionClickHandler(suggestions[activeSuggestion]);
          } else {
            setInputMsg((prevInputMsg) => prevInputMsg + ' ');
          }
        }
      }
    },
    [activeSuggestion, suggestionClickHandler, suggestions],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    let input = document.getElementById('inputBox');
    input?.addEventListener('textInput', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      input?.removeEventListener('textInput', handleKeyDown);
    };
  }, [handleKeyDown]);

  const sendGuidedMsg = (type: string) => {
    // convert the string type into stringified array
    context?.setShowInputBox(false);
    const tags = [type];
    sessionStorage.setItem('tags', JSON.stringify(tags));
    sendMessage(`Guided: ${t('label.' + type)}`);
  };

  if (context?.isDown) {
    return <DowntimePage />;
  } else
    return (
      <>
        <div
          className={styles.main}
          onClick={handleDocumentClick}
          style={{ color: secondaryColor }}
        >
          {context?.kaliaClicked ? (
            <div className={styles.kaliaImg}>
              <img
                src={config?.kaliaStatusImg || kaliaStatusImg?.src}
                width={200}
                height={200}
                alt="kaliastatus"
              />
            </div>
          ) : (
            <>
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: t('label.ask_me') }}
              ></div>
              {(config?.showKalia ||
                config?.showWeatherAdvisory ||
                config?.showPlantProtection) && (
                <div className={styles.imgButtons}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      width: '100%',
                      maxWidth: '500px',
                    }}
                  >
                    {config?.showWeatherAdvisory && (
                      <div className={styles.imgBtn} onClick={() => router.push('/weather')}>
                        <p>{t('label.weather_advisory')}</p>
                        <img
                          src={config?.weatherAdvisoryImg || weatherAdvisoryImg?.src}
                          width={50}
                          height={70}
                          alt="weatheradvisory"
                        />
                      </div>
                    )}
                    {config?.showPlantProtection && (
                      <div className={styles.imgBtn} onClick={() => sendGuidedMsg('pest')}>
                        <p>{t('label.plant_protection')}</p>
                        <img
                          src={config?.plantProtectionImg || plantProtectionImg?.src}
                          width={60}
                          height={60}
                          alt="plantprotection"
                        />
                      </div>
                    )}
                  </div>
                  {config?.showKalia && (
                    <div
                      className={styles.imgBtn}
                      style={{ marginTop: '10px' }}
                      onClick={() => {
                        context?.setKaliaClicked((props: boolean) => !props);
                      }}
                    >
                      <p>{t('label.kalia_status')}</p>
                      <img
                        src={config?.kaliaStatusImg || kaliaStatusImg?.src}
                        width={80}
                        height={80}
                        alt="kaliastatus"
                      />
                    </div>
                  )}
                </div>
              )}

              {config?.showMic && (
                <div
                  className={styles.voiceRecorder}
                  style={{ height: micHeight, width: micWidth }}
                  ref={voiceRecorderRef}
                >
                  <VoiceRecorder
                    setInputMsg={setInputMsg}
                    tapToSpeak={config?.showTapToSpeakText}
                  />
                </div>
              )}
            </>
          )}

          <form onSubmit={(event) => event?.preventDefault()}>
            <div ref={chatBoxButton} className={`${`${styles.inputBox} ${styles.inputBoxOpen}`}`}>
              <div className={styles.suggestions}>
                {suggestions.map((elem, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => suggestionClickHandler(elem)}
                      className={`${styles.suggestion} ${
                        activeSuggestion === index ? styles.active : ''
                      }`}
                      onMouseEnter={(e) => suggestionHandler(e, index)}
                    >
                      {elem}
                    </div>
                  );
                })}
              </div>
              <textarea
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage(inputMsg);
                  }
                }}
                id="inputBox"
                ref={inputRef}
                rows={1}
                value={inputMsg}
                onChange={handleInputChange}
                placeholder={!context?.kaliaClicked ? placeholder : t('label.enter_aadhaar_number')}
              />
              <button
                type="submit"
                className={styles.sendButton}
                onClick={() => sendMessage(inputMsg)}
              >
                <SendButton width={40} height={40} color={theme?.primary?.light} />
              </button>
            </div>
          </form>
        </div>
      </>
    );
};
export default LocalHomePage;
