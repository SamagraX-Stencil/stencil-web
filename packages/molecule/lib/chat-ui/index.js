"use strict";
'use-client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatUI = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _chatui = _interopRequireDefault(require("@repo/chatui"));
require("@repo/chatui/dist/index.css");
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _getMsgType = require("./utils/getMsgType");
var _reactHotToast = _interopRequireDefault(require("react-hot-toast"));
var _location = require("./utils/location");
var _chatHistory = _interopRequireDefault(require("./chatHistory.json"));
var _shareButtons = _interopRequireDefault(require("../share-buttons"));
var _hooks = require("@repo/hooks");
var _messageItem = _interopRequireDefault(require("../message-item"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ChatUI = exports.ChatUI = function ChatUI() {
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var config = (0, _hooks.useUiConfig)('component', 'chatUi');
  var theme = (0, _hooks.useThemeConfig)('theme');
  (0, _react.useEffect)(function () {
    var fetchHistory = function fetchHistory() {
      var normalizedChats = normalizedChat(_chatHistory.default);
      if (normalizedChats.length > 0) {
        setMessages(normalizedChats);
      }
    };
    fetchHistory();
    (0, _location.recordUserLocation)();
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
      return [].concat((0, _toConsumableArray2.default)(prev), [{
        text: text,
        position: 'right'
      }]);
    });
    setLoading(true);

    // dummy response
    setTimeout(function () {
      setMessages(function (prev) {
        return [].concat((0, _toConsumableArray2.default)(prev), [{
          text: 'This is a dummy response.',
          position: 'left',
          reaction: 0,
          isEnd: true // Used to determine whether a streaming response has ended
        }]);
      });
      setLoading(false);
    }, 1000);
  };
  var handleSend = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(type, msg) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.length === 0)) {
              _context.next = 3;
              break;
            }
            _reactHotToast.default.error('Please enter message');
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
  var normalizeMsgs = (0, _react.useMemo)(function () {
    return messages === null || messages === void 0 ? void 0 : messages.map(function (msg) {
      var _msg$position;
      return {
        type: (0, _getMsgType.getMsgType)(msg),
        content: {
          text: msg === null || msg === void 0 ? void 0 : msg.text,
          data: _objectSpread({}, msg)
        },
        position: (_msg$position = msg === null || msg === void 0 ? void 0 : msg.position) !== null && _msg$position !== void 0 ? _msg$position : 'right'
      };
    });
  }, [messages]);
  var msgToRender = (0, _react.useMemo)(function () {
    return loading ? [].concat((0, _toConsumableArray2.default)(normalizeMsgs), [{
      type: 'loader',
      position: 'left'
    }]) : normalizeMsgs;
  }, [loading, normalizeMsgs]);
  var placeholder = (0, _react.useMemo)(function () {
    var _config$placeholder;
    return (_config$placeholder = config === null || config === void 0 ? void 0 : config.placeholder) !== null && _config$placeholder !== void 0 ? _config$placeholder : 'Ask Your Question';
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _indexModule.default.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_chatui.default, {
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
          (0, _jsxRuntime.jsx)(_messageItem.default, {
            message: props,
            themeColor: theme,
            chatUi: config
          })
        );
      },
      onSend: handleSend,
      locale: "en-US",
      placeholder: placeholder
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_shareButtons.default, {})]
  });
};