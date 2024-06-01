"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _react = _interopRequireWildcard(require("react"));
var _provider = require("@repo/provider");
var _sendButton = _interopRequireDefault(require("./assets/sendButton.svg"));
var _hooks = require("@repo/hooks");
var _navigation = require("next/navigation");
var _image = _interopRequireDefault(require("next/image"));
var _reactHotToast = _interopRequireDefault(require("react-hot-toast"));
var _uuid = require("uuid");
var _molecules = require("@repo/molecules");
var _location = require("../resources/utils/location");
var _downtimePage = _interopRequireDefault(require("../downtime-page"));
var _kalia_status = _interopRequireDefault(require("./assets/kalia_status.png"));
var _plant_protection = _interopRequireDefault(require("./assets/plant_protection.png"));
var _weather_advisory = _interopRequireDefault(require("./assets/weather_advisory.png"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LocalHomePage = function LocalHomePage() {
  var _theme$primary2;
  var router = (0, _navigation.useRouter)();
  var context = (0, _react.useContext)(_provider.AppContext);
  var botConfig = (0, _hooks.useBotConfig)('component', 'chatUI');
  var config = (0, _hooks.useBotConfig)('component', 'homePage');
  var micWidth = config.micWidth,
    micHeight = config.micHeight;
  var t = (0, _hooks.useLocalization)();
  var inputRef = (0, _react.useRef)(null);
  var placeholder = (0, _react.useMemo)(function () {
    return t('message.ask_ur_question');
  }, [t]);
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    inputMsg = _useState2[0],
    setInputMsg = _useState2[1];
  var voiceRecorderRef = (0, _react.useRef)(null);
  var chatBoxButton = (0, _react.useRef)(null);
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    suggestions = _useState4[0],
    setSuggestions = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    suggestionClicked = _useState6[0],
    setSuggestionClicked = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    activeSuggestion = _useState8[0],
    setActiveSuggestion = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    cursorPosition = _useState10[0],
    setCursorPosition = _useState10[1];
  var theme = (0, _hooks.useBotAppColorPalates)();
  var secondaryColor = (0, _react.useMemo)(function () {
    var _theme$primary;
    return theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main;
  }, [theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main]);
  var suggestionHandler = function suggestionHandler(e, index) {
    setActiveSuggestion(index);
  };
  (0, _react.useEffect)(function () {
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

  (0, _react.useEffect)(function () {
    context === null || context === void 0 || context.fetchIsDown(); // check if server is down

    if (!sessionStorage.getItem('conversationId')) {
      var newConversationId = (0, _uuid.v4)();
      sessionStorage.setItem('conversationId', newConversationId);
      context === null || context === void 0 || context.setConversationId(newConversationId);
    }
    (0, _location.recordUserLocation)();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var sendMessage = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(msg) {
      var _context$newSocket;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.length === 0)) {
              _context.next = 3;
              break;
            }
            _reactHotToast.default.error(t('error.empty_msg'));
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
            _reactHotToast.default.error(t('error.disconnected'));
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
        _reactHotToast.default.error('Please enter valid aadhaar number');
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
  var handleDocumentClick = (0, _react.useCallback)(function (event) {
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
  (0, _react.useEffect)(function () {
    document.addEventListener('click', handleDocumentClick);
    return function () {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);
  var suggestionClickHandler = (0, _react.useCallback)(function (e) {
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
  var handleKeyDown = (0, _react.useCallback)(function (e) {
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
  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  if (context !== null && context !== void 0 && context.isDown) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_downtimePage.default, {});
  } else return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _indexModule.default.main,
      onClick: handleDocumentClick,
      style: {
        color: secondaryColor
      },
      children: [context !== null && context !== void 0 && context.kaliaClicked ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _indexModule.default.kaliaImg,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: (config === null || config === void 0 ? void 0 : config.kaliaStatusImg) || (_kalia_status.default === null || _kalia_status.default === void 0 ? void 0 : _kalia_status.default.src),
          width: 200,
          height: 200,
          alt: "kaliastatus"
        })
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.title,
          dangerouslySetInnerHTML: {
            __html: t('label.ask_me')
          }
        }), ((config === null || config === void 0 ? void 0 : config.showKalia) || (config === null || config === void 0 ? void 0 : config.showWeatherAdvisory) || (config === null || config === void 0 ? void 0 : config.showPlantProtection)) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _indexModule.default.imgButtons,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              maxWidth: '500px'
            },
            children: [(config === null || config === void 0 ? void 0 : config.showWeatherAdvisory) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: _indexModule.default.imgBtn,
              onClick: function onClick() {
                sendMessage('Guided: weather');
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: t('label.weather_advisory')
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: (config === null || config === void 0 ? void 0 : config.weatherAdvisoryImg) || (_weather_advisory.default === null || _weather_advisory.default === void 0 ? void 0 : _weather_advisory.default.src),
                width: 50,
                height: 70,
                alt: "weatheradvisory"
              })]
            }), (config === null || config === void 0 ? void 0 : config.showPlantProtection) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: _indexModule.default.imgBtn,
              onClick: function onClick() {
                sendMessage(t('Guided: pest'));
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: t('label.plant_protection')
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: (config === null || config === void 0 ? void 0 : config.plantProtectionImg) || (_plant_protection.default === null || _plant_protection.default === void 0 ? void 0 : _plant_protection.default.src),
                width: 60,
                height: 60,
                alt: "plantprotection"
              })]
            })]
          }), (config === null || config === void 0 ? void 0 : config.showKalia) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _indexModule.default.imgBtn,
            style: {
              marginTop: '10px'
            },
            onClick: function onClick() {
              context === null || context === void 0 || context.setKaliaClicked(function (props) {
                return !props;
              });
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('label.kalia_status')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: (config === null || config === void 0 ? void 0 : config.kaliaStatusImg) || (_kalia_status.default === null || _kalia_status.default === void 0 ? void 0 : _kalia_status.default.src),
              width: 80,
              height: 80,
              alt: "kaliastatus"
            })]
          })]
        }), (config === null || config === void 0 ? void 0 : config.showMic) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.voiceRecorder,
          style: {
            height: micHeight,
            width: micWidth
          },
          ref: voiceRecorderRef,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.VoiceRecorder, {
            setInputMsg: setInputMsg,
            tapToSpeak: true
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("form", {
        onSubmit: function onSubmit(event) {
          return event === null || event === void 0 ? void 0 : event.preventDefault();
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          ref: chatBoxButton,
          className: "".concat("".concat(_indexModule.default.inputBox, " ").concat(_indexModule.default.inputBoxOpen)),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _indexModule.default.suggestions,
            children: suggestions.map(function (elem, index) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                onClick: function onClick() {
                  return suggestionClickHandler(elem);
                },
                className: "".concat(_indexModule.default.suggestion, " ").concat(activeSuggestion === index ? _indexModule.default.active : ''),
                onMouseEnter: function onMouseEnter(e) {
                  return suggestionHandler(e, index);
                },
                children: elem
              }, index);
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
            ref: inputRef,
            rows: 1,
            value: inputMsg,
            onChange: handleInputChange,
            placeholder: !(context !== null && context !== void 0 && context.kaliaClicked) ? placeholder : t('label.enter_aadhaar_number')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            type: "submit",
            className: _indexModule.default.sendButton,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_image.default, {
              src: _sendButton.default,
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
var _default = exports.default = LocalHomePage;