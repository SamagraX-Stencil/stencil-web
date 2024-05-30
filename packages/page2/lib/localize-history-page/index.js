"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _styleModule = _interopRequireDefault(require("./style.module.css"));
var _stencilMolecule = require("stencil-molecule");
var _Forum = _interopRequireDefault(require("@mui/icons-material/Forum"));
var _material = require("@mui/material");
var _DeleteOutline = _interopRequireDefault(require("@mui/icons-material/DeleteOutline"));
var _moment = _interopRequireDefault(require("moment"));
var _underscore = _interopRequireDefault(require("underscore"));
var _lodash = require("lodash");
var _stencilHooks = require("stencil-hooks");
var _axios = _interopRequireDefault(require("axios"));
var _index = _interopRequireDefault(require("../localize-coming-soon-page/index"));
var _router = _interopRequireDefault(require("next/router"));
var _stencilProvider = require("stencil-provider");
var _location = require("../resources/utils/location");
var _uuid = require("uuid");
var _jsxRuntime = require("react/jsx-runtime");
// import { toast } from 'react-hot-toast'

var LocalHistoryPage = function LocalHistoryPage() {
  var _theme$primary2, _theme$primary3, _t, _t2, _theme$primary4;
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isFetching = _useState2[0],
    setIsFetching = _useState2[1];
  var theme = (0, _stencilHooks.useBotAppColorPalates)();
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    conversations = _useState4[0],
    setConversations = _useState4[1];
  // const flags = useFlags(['show_chat_history_page'])
  var context = (0, _react.useContext)(_stencilProvider.AppContext);
  var t = (0, _stencilHooks.useLocalization)();
  var config = (0, _stencilHooks.useBotConfig)('component', 'historyPage');
  var handleClick = (0, _react.useCallback)(function (activeItem) {
    sessionStorage.setItem('conversationId', (activeItem === null || activeItem === void 0 ? void 0 : activeItem.conversationId) || 'null');
    context === null || context === void 0 || context.setConversationId(activeItem === null || activeItem === void 0 ? void 0 : activeItem.conversationId);
    _router.default.push('/chat');
  }, []);
  var deleteConversation = (0, _react.useCallback)(function (conversationId) {
    var _window;
    var confirmed = (_window = window) === null || _window === void 0 ? void 0 : _window.confirm("".concat(t('label.confirm_delete')));
    if (confirmed) {
      _axios.default.get("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/user/conversations/delete/").concat(conversationId), {
        headers: {
          authorization: "Bearer ".concat(localStorage.getItem('auth'))
        }
      }).then(function (res) {
        if (conversationId === sessionStorage.getItem('conversationId')) {
          (0, _location.recordUserLocation)();
          var newConversationId = (0, _uuid.v4)();
          sessionStorage.setItem('conversationId', newConversationId);
          context === null || context === void 0 || context.setConversationId(newConversationId);
          context === null || context === void 0 || context.setMessages([]);
        }
        deleteConversationById(conversationId);
        fetchHistory();
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, [context === null || context === void 0 ? void 0 : context.setConversationId, context === null || context === void 0 ? void 0 : context.setMessages, t]);
  var deleteConversationById = (0, _react.useCallback)(function (conversationIdToDelete) {
    var filteredConversations = (0, _toConsumableArray2.default)(conversations).filter(function (conversation) {
      return conversation.conversationId !== conversationIdToDelete;
    });
    setConversations(filteredConversations);
  }, [conversations]);
  (0, _react.useEffect)(function () {
    fetchHistory();
  }, []);
  var fetchHistory = function fetchHistory() {
    setIsFetching(true);
    _axios.default.get("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/history/conversations?userId=").concat(localStorage.getItem('userID')), {
      headers: {
        botId: process.env.NEXT_PUBLIC_BOT_ID || ''
      }
    }).then(function (res) {
      console.log('All chat history:', {
        res: res
      });
      var sortedConversations = _underscore.default.filter(res === null || res === void 0 ? void 0 : res.data, function (conv) {
        return (conv === null || conv === void 0 ? void 0 : conv.channelMessageId) !== null;
      }).sort(
      //@ts-ignore
      function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      console.log({
        sortedConversations: sortedConversations
      });
      var historyList = (0, _lodash.map)(sortedConversations, function (chatItem) {
        var _chatItem$payload, _theme$primary;
        var text = (chatItem === null || chatItem === void 0 || (_chatItem$payload = chatItem.payload) === null || _chatItem$payload === void 0 ? void 0 : _chatItem$payload.text.replace(/<end\/>/g, '')) || '';
        var label;
        if (text.startsWith('{') && text.endsWith('}')) {
          try {
            var parsedText = JSON.parse(text);
            var generalAdvice = parsedText === null || parsedText === void 0 ? void 0 : parsedText.generalAdvice;
            if (generalAdvice) {
              label = (generalAdvice === null || generalAdvice === void 0 ? void 0 : generalAdvice.split(' ').slice(0, 12).join(' ')) + ((generalAdvice === null || generalAdvice === void 0 ? void 0 : generalAdvice.split(' ').length) > 12 ? '...' : '');
            } else {
              label = text.split(' ').slice(0, 12).join(' ') + (text.split(' ').length > 12 ? '...' : '');
            }
          } catch (error) {
            label = text.split(' ').slice(0, 12).join(' ') + (text.split(' ').length > 12 ? '...' : '');
          }
        } else {
          label = text.split(' ').slice(0, 12).join(' ') + (text.split(' ').length > 12 ? '...' : '');
        }
        return {
          id: chatItem === null || chatItem === void 0 ? void 0 : chatItem.messageId,
          label: label,
          conversationId: chatItem === null || chatItem === void 0 ? void 0 : chatItem.channelMessageId,
          userId: chatItem === null || chatItem === void 0 ? void 0 : chatItem.from,
          secondaryLabel: (0, _moment.default)(chatItem === null || chatItem === void 0 ? void 0 : chatItem.timestamp).format('hh:mm A DD/MM/YYYY'),
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Forum.default, {
            style: {
              color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.light
            }
          }),
          secondaryAction: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
            edge: "end",
            "aria-label": "comments",
            children: (config === null || config === void 0 ? void 0 : config.allowDelete) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DeleteOutline.default, {
              onClick: function onClick() {
                return deleteConversation(chatItem === null || chatItem === void 0 ? void 0 : chatItem.conversationId);
              }
            })
          }),
          onClick: handleClick,
          isDivider: true
        };
      });
      //@ts-ignore
      setConversations(historyList);
      setIsFetching(false);
    }).catch(function (error) {
      console.error(error);
      setIsFetching(false);
    });
  };
  if (true) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {});
  }
  // if (!flags?.show_chat_history_page?.enabled) {
  //   return <LocalComingSoonPage />
  // }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _styleModule.default.main,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilMolecule.FullPageLoader, {
        loading: isFetching,
        color: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _styleModule.default.title,
        style: {
          color: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
        },
        children: (_t = t('label.chats')) !== null && _t !== void 0 ? _t : 'No Label Provided'
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _styleModule.default.chatList,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilMolecule.List, {
          items: conversations,
          noItem: {
            label: (_t2 = t('label.no_history')) !== null && _t2 !== void 0 ? _t2 : 'No History Found',
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Forum.default, {
              style: {
                color: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.light
              }
            })
          }
        })
      })]
    })
  });
};
var _default = exports.default = LocalHistoryPage;