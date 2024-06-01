'use client';

import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import styles from './index.module.css';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppContext } from '@repo/provider';
import SendIcon from './assets/sendButton.svg';
import { useLocalization } from '@repo/hooks';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { VoiceRecorder } from '@repo/molecules';
import { recordUserLocation } from '../resources/utils/location';
import { useBotConfig } from '@repo/hooks';
import DowntimePage from '../downtime-page';
import { useBotAppColorPalates } from '@repo/hooks';
import kaliaStatusImg from './assets/kalia_status.png';
import plantProtectionImg from './assets/plant_protection.png';
import weatherAdvisoryImg from './assets/weather_advisory.png';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var LocalHomePage = function LocalHomePage() {
  var _theme$primary2;
  var router = useRouter();
  var context = useContext(AppContext);
  var botConfig = useBotConfig('component', 'chatUI');
  var config = useBotConfig('component', 'homePage');
  var micWidth = config.micWidth,
    micHeight = config.micHeight;
  var t = useLocalization();
  var inputRef = useRef(null);
  var placeholder = useMemo(function () {
    return t('message.ask_ur_question');
  }, [t]);
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    inputMsg = _useState2[0],
    setInputMsg = _useState2[1];
  var voiceRecorderRef = useRef(null);
  var chatBoxButton = useRef(null);
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    suggestions = _useState4[0],
    setSuggestions = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    suggestionClicked = _useState6[0],
    setSuggestionClicked = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    activeSuggestion = _useState8[0],
    setActiveSuggestion = _useState8[1];
  var _useState9 = useState(0),
    _useState10 = _slicedToArray(_useState9, 2),
    cursorPosition = _useState10[0],
    setCursorPosition = _useState10[1];
  var theme = useBotAppColorPalates();
  var secondaryColor = useMemo(function () {
    var _theme$primary;
    return theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main;
  }, [theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main]);
  var suggestionHandler = function suggestionHandler(e, index) {
    setActiveSuggestion(index);
  };
  useEffect(function () {
    if (inputMsg.length > 0 && botConfig !== null && botConfig !== void 0 && botConfig.allowTransliteration && localStorage.getItem('locale') === (botConfig === null || botConfig === void 0 ? void 0 : botConfig.transliterationOutputLanguage)) {
      if (suggestionClicked) {
        setSuggestionClicked(false);
        return;
      }
      setSuggestions([]);
      var words = inputMsg.split(' ');
      var wordUnderCursor = words.find(function (word, index) {
        return cursorPosition >= inputMsg.indexOf(word) && cursorPosition <= inputMsg.indexOf(word) + word.length;
      });
      if (!wordUnderCursor) return;
      var data = JSON.stringify({
        inputLanguage: botConfig === null || botConfig === void 0 ? void 0 : botConfig.transliterationInputLanguage,
        outputLanguage: botConfig === null || botConfig === void 0 ? void 0 : botConfig.transliterationOutputLanguage,
        input: wordUnderCursor,
        provider: (botConfig === null || botConfig === void 0 ? void 0 : botConfig.transliterationProvider) || 'bhashini',
        numSuggestions: (botConfig === null || botConfig === void 0 ? void 0 : botConfig.transliterationSuggestions) || 3
      });
      var axiosConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: "".concat(process.env.NEXT_PUBLIC_AI_TOOLS_API, "/transliterate"),
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      // axios
      //   .request(axiosConfig)
      //   .then((res: any) => {
      //     // console.log("hurray", res?.data?.output?.[0]?.target);
      //     setSuggestions(res?.data?.suggestions)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     toast.error('Bhashini transliteration failed')
      //   })
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMsg, cursorPosition]);

  // useEffect(() => {
  //   setMessages([getInitialMsgs(t, flags, context?.locale)]);
  // }, [t, context?.locale, flags]);

  useEffect(function () {
    context === null || context === void 0 || context.fetchIsDown(); // check if server is down

    if (!sessionStorage.getItem('conversationId')) {
      var newConversationId = uuidv4();
      sessionStorage.setItem('conversationId', newConversationId);
      context === null || context === void 0 || context.setConversationId(newConversationId);
    }
    recordUserLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var sendMessage = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(msg) {
      var _context$newSocket;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.length === 0)) {
              _context.next = 3;
              break;
            }
            toast.error(t('error.empty_msg'));
            return _context.abrupt("return");
          case 3:
            if (!(context !== null && context !== void 0 && (_context$newSocket = context.newSocket) !== null && _context$newSocket !== void 0 && (_context$newSocket = _context$newSocket.socket) !== null && _context$newSocket !== void 0 && _context$newSocket.connected)) {
              _context.next = 10;
              break;
            }
            console.log('clearing mssgs');
            context === null || context === void 0 || context.setMessages([]);
            router.push('/chat');
            if (context !== null && context !== void 0 && context.kaliaClicked) {
              context === null || context === void 0 || context.sendMessage('Aadhaar number - ' + msg, null, true, null, true);
            } else context === null || context === void 0 || context.sendMessage(msg);
            _context.next = 12;
            break;
          case 10:
            toast.error(t('error.disconnected'));
            return _context.abrupt("return");
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [context, t]);
  var handleInputChange = function handleInputChange(e) {
    var inputValue = e.target.value;
    if (context !== null && context !== void 0 && context.kaliaClicked) {
      if (!/^[0-9]*$/.test(inputValue) || inputValue.length > 12) {
        toast.error('Please enter valid aadhaar number');
        // setInputMsg(inputValue.slice(0, 12));
      } else setInputMsg(inputValue);
    } else setInputMsg(inputValue);
    // Store the cursor position
    var cursorPosition = e.target.selectionStart;
    setCursorPosition(cursorPosition);
    // setShowExampleMessages(inputValue.length === 0);
    // Adjust textarea height dynamically based on content
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.style.height = 'auto';
      //@ts-ignore
      inputRef.current.style.height = "".concat(inputRef.current.scrollHeight, "px");
    }
  };
  var handleDocumentClick = useCallback(function (event) {
    var _voiceRecorderRef$cur, _chatBoxButton$curren;
    var target = event.target;

    // Check if clicked outside voiceRecorder and exampleMessages
    if (
    //@ts-ignore
    !((_voiceRecorderRef$cur = voiceRecorderRef.current) !== null && _voiceRecorderRef$cur !== void 0 && _voiceRecorderRef$cur.contains(target)) &&
    //@ts-ignore
    !((_chatBoxButton$curren = chatBoxButton.current) !== null && _chatBoxButton$curren !== void 0 && _chatBoxButton$curren.contains(target))) {
      // setShowExampleMessages(false);
      setSuggestions([]);
      // setShowChatBox(false);
    }
  }, []);
  useEffect(function () {
    document.addEventListener('click', handleDocumentClick);
    return function () {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);
  var suggestionClickHandler = useCallback(function (e) {
    var words = inputMsg.split(' ');

    // Find the word at the cursor position
    //@ts-ignore
    var cursorPosition = inputRef.current.selectionStart;
    var currentIndex = 0;
    var selectedWord = '';
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (currentIndex <= cursorPosition && cursorPosition <= currentIndex + word.length) {
        selectedWord = word;
        break;
      }
      currentIndex += word.length + 1; // +1 to account for the space between words
    }

    // Replace the selected word with the transliterated suggestion
    if (selectedWord !== '') {
      var newInputMsg = inputMsg.replace(selectedWord, cursorPosition === inputMsg.length ? e + ' ' : e);
      setSuggestions([]);
      setSuggestionClicked(true);
      setActiveSuggestion(0);
      setInputMsg(newInputMsg);

      //@ts-ignore
      inputRef.current && inputRef.current.focus();
    }
  }, [inputMsg]);
  var handleKeyDown = useCallback(function (e) {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(function (prevActiveSuggestion) {
          return prevActiveSuggestion > 0 ? prevActiveSuggestion - 1 : prevActiveSuggestion;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(function (prevActiveSuggestion) {
          return prevActiveSuggestion < suggestions.length - 1 ? prevActiveSuggestion + 1 : prevActiveSuggestion;
        });
      } else if (e.key === ' ') {
        e.preventDefault();
        if (activeSuggestion >= 0 && activeSuggestion < (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length)) {
          suggestionClickHandler(suggestions[activeSuggestion]);
        } else {
          setInputMsg(function (prevInputMsg) {
            return prevInputMsg + ' ';
          });
        }
      }
    }
  }, [activeSuggestion, suggestionClickHandler, suggestions]);
  useEffect(function () {
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  if (context !== null && context !== void 0 && context.isDown) {
    return /*#__PURE__*/_jsx(DowntimePage, {});
  } else return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      onClick: handleDocumentClick,
      style: {
        color: secondaryColor
      },
      children: [context !== null && context !== void 0 && context.kaliaClicked ? /*#__PURE__*/_jsx("div", {
        className: styles.kaliaImg,
        children: /*#__PURE__*/_jsx("img", {
          src: (config === null || config === void 0 ? void 0 : config.kaliaStatusImg) || (kaliaStatusImg === null || kaliaStatusImg === void 0 ? void 0 : kaliaStatusImg.src),
          width: 200,
          height: 200,
          alt: "kaliastatus"
        })
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.title,
          dangerouslySetInnerHTML: {
            __html: t('label.ask_me')
          }
        }), ((config === null || config === void 0 ? void 0 : config.showKalia) || (config === null || config === void 0 ? void 0 : config.showWeatherAdvisory) || (config === null || config === void 0 ? void 0 : config.showPlantProtection)) && /*#__PURE__*/_jsxs("div", {
          className: styles.imgButtons,
          children: [/*#__PURE__*/_jsxs("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              maxWidth: '500px'
            },
            children: [(config === null || config === void 0 ? void 0 : config.showWeatherAdvisory) && /*#__PURE__*/_jsxs("div", {
              className: styles.imgBtn,
              onClick: function onClick() {
                sendMessage('Guided: weather');
              },
              children: [/*#__PURE__*/_jsx("p", {
                children: t('label.weather_advisory')
              }), /*#__PURE__*/_jsx("img", {
                src: (config === null || config === void 0 ? void 0 : config.weatherAdvisoryImg) || (weatherAdvisoryImg === null || weatherAdvisoryImg === void 0 ? void 0 : weatherAdvisoryImg.src),
                width: 50,
                height: 70,
                alt: "weatheradvisory"
              })]
            }), (config === null || config === void 0 ? void 0 : config.showPlantProtection) && /*#__PURE__*/_jsxs("div", {
              className: styles.imgBtn,
              onClick: function onClick() {
                sendMessage(t('Guided: pest'));
              },
              children: [/*#__PURE__*/_jsx("p", {
                children: t('label.plant_protection')
              }), /*#__PURE__*/_jsx("img", {
                src: (config === null || config === void 0 ? void 0 : config.plantProtectionImg) || (plantProtectionImg === null || plantProtectionImg === void 0 ? void 0 : plantProtectionImg.src),
                width: 60,
                height: 60,
                alt: "plantprotection"
              })]
            })]
          }), (config === null || config === void 0 ? void 0 : config.showKalia) && /*#__PURE__*/_jsxs("div", {
            className: styles.imgBtn,
            style: {
              marginTop: '10px'
            },
            onClick: function onClick() {
              context === null || context === void 0 || context.setKaliaClicked(function (props) {
                return !props;
              });
            },
            children: [/*#__PURE__*/_jsx("p", {
              children: t('label.kalia_status')
            }), /*#__PURE__*/_jsx("img", {
              src: (config === null || config === void 0 ? void 0 : config.kaliaStatusImg) || (kaliaStatusImg === null || kaliaStatusImg === void 0 ? void 0 : kaliaStatusImg.src),
              width: 80,
              height: 80,
              alt: "kaliastatus"
            })]
          })]
        }), (config === null || config === void 0 ? void 0 : config.showMic) && /*#__PURE__*/_jsx("div", {
          className: styles.voiceRecorder,
          style: {
            height: micHeight,
            width: micWidth
          },
          ref: voiceRecorderRef,
          children: /*#__PURE__*/_jsx(VoiceRecorder, {
            setInputMsg: setInputMsg,
            tapToSpeak: true
          })
        })]
      }), /*#__PURE__*/_jsx("form", {
        onSubmit: function onSubmit(event) {
          return event === null || event === void 0 ? void 0 : event.preventDefault();
        },
        children: /*#__PURE__*/_jsxs("div", {
          ref: chatBoxButton,
          className: "".concat("".concat(styles.inputBox, " ").concat(styles.inputBoxOpen)),
          children: [/*#__PURE__*/_jsx("div", {
            className: styles.suggestions,
            children: suggestions.map(function (elem, index) {
              return /*#__PURE__*/_jsx("div", {
                onClick: function onClick() {
                  return suggestionClickHandler(elem);
                },
                className: "".concat(styles.suggestion, " ").concat(activeSuggestion === index ? styles.active : ''),
                onMouseEnter: function onMouseEnter(e) {
                  return suggestionHandler(e, index);
                },
                children: elem
              }, index);
            })
          }), /*#__PURE__*/_jsx("textarea", {
            ref: inputRef,
            rows: 1,
            value: inputMsg,
            onChange: handleInputChange,
            placeholder: !(context !== null && context !== void 0 && context.kaliaClicked) ? placeholder : t('label.enter_aadhaar_number')
          }), /*#__PURE__*/_jsx("button", {
            type: "submit",
            className: styles.sendButton,
            children: /*#__PURE__*/_jsx(Image, {
              src: SendIcon,
              width: 50,
              height: 50,
              alt: "sendIcon",
              onClick: function onClick() {
                return sendMessage(inputMsg);
              }
            })
          })]
        })
      })]
    })
  });
};
export default LocalHomePage;