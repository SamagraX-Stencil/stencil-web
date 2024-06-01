import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useCallback, useEffect, useState, useContext } from 'react';
import styles from './style.module.css';
import { FullPageLoader, List } from '@repo/molecules';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';
import _ from 'underscore';
import { map } from 'lodash';
import { useBotAppColorPalates } from '@repo/hooks';
import { useLocalization } from '@repo/hooks';
import axios from 'axios';
import LocalComingSoonPage from '../localize-coming-soon-page/index';
import { useBotConfig } from '@repo/hooks';
import router from 'next/router';
// import { toast } from 'react-hot-toast'
import { AppContext } from '@repo/provider';
import { recordUserLocation } from '../resources/utils/location';
import { v4 as uuidv4 } from 'uuid';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var LocalHistoryPage = function LocalHistoryPage() {
  var _theme$primary2, _theme$primary3, _t, _t2, _theme$primary4;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isFetching = _useState2[0],
    setIsFetching = _useState2[1];
  var theme = useBotAppColorPalates();
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    conversations = _useState4[0],
    setConversations = _useState4[1];
  // const flags = useFlags(['show_chat_history_page'])
  var context = useContext(AppContext);
  var t = useLocalization();
  var config = useBotConfig('component', 'historyPage');
  var handleClick = useCallback(function (activeItem) {
    sessionStorage.setItem('conversationId', (activeItem === null || activeItem === void 0 ? void 0 : activeItem.conversationId) || 'null');
    context === null || context === void 0 || context.setConversationId(activeItem === null || activeItem === void 0 ? void 0 : activeItem.conversationId);
    router.push('/chat');
  }, []);
  var deleteConversation = useCallback(function (conversationId) {
    var _window;
    var confirmed = (_window = window) === null || _window === void 0 ? void 0 : _window.confirm("".concat(t('label.confirm_delete')));
    if (confirmed) {
      axios.get("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/user/conversations/delete/").concat(conversationId), {
        headers: {
          authorization: "Bearer ".concat(localStorage.getItem('auth'))
        }
      }).then(function (res) {
        if (conversationId === sessionStorage.getItem('conversationId')) {
          recordUserLocation();
          var newConversationId = uuidv4();
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
  var deleteConversationById = useCallback(function (conversationIdToDelete) {
    var filteredConversations = _toConsumableArray(conversations).filter(function (conversation) {
      return conversation.conversationId !== conversationIdToDelete;
    });
    setConversations(filteredConversations);
  }, [conversations]);
  useEffect(function () {
    fetchHistory();
  }, []);
  var fetchHistory = function fetchHistory() {
    setIsFetching(true);
    axios.get("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/history/conversations?userId=").concat(localStorage.getItem('userID')), {
      headers: {
        botId: process.env.NEXT_PUBLIC_BOT_ID || ''
      }
    }).then(function (res) {
      console.log('All chat history:', {
        res: res
      });
      var sortedConversations = _.filter(res === null || res === void 0 ? void 0 : res.data, function (conv) {
        return (conv === null || conv === void 0 ? void 0 : conv.channelMessageId) !== null;
      }).sort(
      //@ts-ignore
      function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      console.log({
        sortedConversations: sortedConversations
      });
      var historyList = map(sortedConversations, function (chatItem) {
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
          secondaryLabel: moment(chatItem === null || chatItem === void 0 ? void 0 : chatItem.timestamp).format('hh:mm A DD/MM/YYYY'),
          icon: /*#__PURE__*/_jsx(ForumIcon, {
            style: {
              color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.light
            }
          }),
          secondaryAction: /*#__PURE__*/_jsx(IconButton, {
            edge: "end",
            "aria-label": "comments",
            children: (config === null || config === void 0 ? void 0 : config.allowDelete) && /*#__PURE__*/_jsx(DeleteOutlineIcon, {
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
    return /*#__PURE__*/_jsx(LocalComingSoonPage, {});
  }
  // if (!flags?.show_chat_history_page?.enabled) {
  //   return <LocalComingSoonPage />
  // }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      children: [/*#__PURE__*/_jsx(FullPageLoader, {
        loading: isFetching,
        color: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
      }), /*#__PURE__*/_jsx("div", {
        className: styles.title,
        style: {
          color: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
        },
        children: (_t = t('label.chats')) !== null && _t !== void 0 ? _t : 'No Label Provided'
      }), /*#__PURE__*/_jsx("div", {
        className: styles.chatList,
        children: /*#__PURE__*/_jsx(List, {
          items: conversations,
          noItem: {
            label: (_t2 = t('label.no_history')) !== null && _t2 !== void 0 ? _t2 : 'No History Found',
            icon: /*#__PURE__*/_jsx(ForumIcon, {
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
export default LocalHistoryPage;