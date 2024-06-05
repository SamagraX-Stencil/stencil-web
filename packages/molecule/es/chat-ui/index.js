'use-client';

import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import _regeneratorRuntime from "@babel/runtime/regenerator";
import Chat from '@repo/chatui';
import '@repo/chatui/dist/index.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.css';
import { getMsgType } from './utils/getMsgType';
import toast from 'react-hot-toast';
import { recordUserLocation } from './utils/location';
import chatHistory from './chatHistory.json';
import ShareButtons from '../share-buttons';
import { useUiConfig, useThemeConfig } from '@repo/hooks';
import MessageItem from '../message-item';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var ChatUI = function ChatUI() {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var config = useUiConfig('component', 'chatUi');
  var theme = useThemeConfig('theme');
  useEffect(function () {
    var fetchHistory = function fetchHistory() {
      var normalizedChats = normalizedChat(chatHistory);
      if (normalizedChats.length > 0) {
        setMessages(normalizedChats);
      }
    };
    fetchHistory();
    recordUserLocation();
  }, []);
  var normalizedChat = function normalizedChat(chats) {
    console.log('in normalized', chats);
    var history = chats.flatMap(function (item) {
      var _item$query;
      return [((_item$query = item.query) === null || _item$query === void 0 ? void 0 : _item$query.length) && {
        text: item.query,
        position: 'right',
        repliedTimestamp: item.createdAt
        // messageId: uuidv4(),
      }, {
        text: item.response,
        position: 'left',
        sentTimestamp: item.createdAt,
        reaction: item.reaction,
        msgId: item.id,
        messageId: item.id,
        audio_url: item.audioURL,
        isEnd: true,
        optionClicked: true
      }].filter(Boolean);
    });
    return history;
  };
  var sendMessage = function sendMessage(text) {
    setMessages(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        text: text,
        position: 'right'
      }]);
    });
    setLoading(true);

    // dummy response
    setTimeout(function () {
      setMessages(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          text: 'This is a dummy response.',
          position: 'left',
          reaction: 0,
          isEnd: true // Used to determine whether a streaming response has ended
        }]);
      });
      setLoading(false);
    }, 1000);
  };
  var handleSend = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(type, msg) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.length === 0)) {
              _context.next = 3;
              break;
            }
            toast.error('Please enter message');
            return _context.abrupt("return");
          case 3:
            if (type === 'text' && msg.trim()) {
              sendMessage(msg.trim());
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  var normalizeMsgs = useMemo(function () {
    return messages === null || messages === void 0 ? void 0 : messages.map(function (msg) {
      var _msg$position;
      return {
        type: getMsgType(msg),
        content: {
          text: msg === null || msg === void 0 ? void 0 : msg.text,
          data: _objectSpread({}, msg)
        },
        position: (_msg$position = msg === null || msg === void 0 ? void 0 : msg.position) !== null && _msg$position !== void 0 ? _msg$position : 'right'
      };
    });
  }, [messages]);
  var msgToRender = useMemo(function () {
    return loading ? [].concat(_toConsumableArray(normalizeMsgs), [{
      type: 'loader',
      position: 'left'
    }]) : normalizeMsgs;
  }, [loading, normalizeMsgs]);
  var placeholder = useMemo(function () {
    var _config$placeholder;
    return (_config$placeholder = config === null || config === void 0 ? void 0 : config.placeholder) !== null && _config$placeholder !== void 0 ? _config$placeholder : 'Ask Your Question';
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: styles.container,
    children: [/*#__PURE__*/_jsx(Chat, {
      showInput: true,
      btnColor: theme.secondaryColor.value,
      background: "white",
      disableSend: false,
      showTransliteration: config.allowTransliteration,
      transliterationConfig: {
        transliterationApi: config.transliterationApi,
        transliterationInputLanguage: config.transliterationInputLanguage,
        transliterationOutputLanguage: config.transliterationOutputLanguage,
        transliterationProvider: config.transliterationProvider,
        transliterationSuggestions: config.transliterationSuggestions
      }
      //@ts-ignore
      ,
      messages: msgToRender,
      renderMessageContent: function renderMessageContent(props) {
        return (
          /*#__PURE__*/
          // <MessageItem message={props} themeColor={theme} chatUi={config} />
          // @ts-ignore
          _jsx(MessageItem, {
            message: props,
            themeColor: theme,
            chatUi: config
          })
        );
      },
      onSend: handleSend,
      locale: "en-US",
      placeholder: placeholder
    }), /*#__PURE__*/_jsx(ShareButtons, {})]
  });
};