import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { List, ListItem } from '@repo/chatui';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './index.module.css';
import RightIcon from './assets/right';
import { useColorPalates } from '@repo/hooks';
import { UpdatedBubble } from './bubble';

// import BlinkingSpinner from '../blinking-spinner/index';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var MessageItem = function MessageItem(_ref) {
  var _message$content, _message$content2, _message$content4;
  var message = _ref.message,
    themeColor = _ref.themeColor,
    chatUi = _ref.chatUi;
  var theme = useColorPalates();
  var _useState = useState(message === null || message === void 0 || (_message$content = message.content) === null || _message$content === void 0 || (_message$content = _message$content.data) === null || _message$content === void 0 ? void 0 : _message$content.reaction),
    _useState2 = _slicedToArray(_useState, 2),
    reaction = _useState2[0],
    setReaction = _useState2[1];
  // @ts-ignore
  var _useState3 = useState((message === null || message === void 0 || (_message$content2 = message.content) === null || _message$content2 === void 0 || (_message$content2 = _message$content2.data) === null || _message$content2 === void 0 ? void 0 : _message$content2.optionClicked) || false),
    _useState4 = _slicedToArray(_useState3, 2),
    optionDisabled = _useState4[0],
    setOptionDisabled = _useState4[1];
  useEffect(function () {
    var _message$content3;
    setReaction(message === null || message === void 0 || (_message$content3 = message.content) === null || _message$content3 === void 0 || (_message$content3 = _message$content3.data) === null || _message$content3 === void 0 ? void 0 : _message$content3.reaction);
  }, [message === null || message === void 0 || (_message$content4 = message.content) === null || _message$content4 === void 0 || (_message$content4 = _message$content4.data) === null || _message$content4 === void 0 ? void 0 : _message$content4.reaction]);
  var feedbackHandler = useCallback(function (_ref2) {
    var like = _ref2.like;
    if (reaction === 0) {
      return setReaction(like);
    }
    if (reaction === 1 && like === -1) {
      return setReaction(-1);
    }
    if (reaction === -1 && like === 1) {
      return setReaction(1);
    }
    setReaction(0);
  }, [reaction]);
  var getLists = useCallback(function (_ref3) {
    var choices = _ref3.choices;
    return /*#__PURE__*/_jsx(List, {
      className: "".concat(styles.list),
      children: choices === null || choices === void 0 ? void 0 : choices.map(function (choice, index) {
        var _content$data, _theme$primary, _theme$primary2, _theme$primary3;
        return (
          /*#__PURE__*/
          // {_.map(choices ?? [], (choice, index) => (
          _jsx(ListItem, {
            className: "".concat(styles.onHover, " ").concat(styles.listItem),
            onClick: function onClick(e) {
              e.preventDefault();
              if (optionDisabled) {
                toast.error("Cannot answer again");
              }
            },
            children: /*#__PURE__*/_jsxs("div", {
              style: {
                display: 'flex',
                alignItems: 'center',
                color: (content === null || content === void 0 || (_content$data = content.data) === null || _content$data === void 0 ? void 0 : _content$data.position) === 'right' ? theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main : optionDisabled ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
              },
              children: [/*#__PURE__*/_jsx("div", {
                children: choice
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  marginLeft: 'auto'
                },
                children: /*#__PURE__*/_jsx(RightIcon, {
                  width: "30px",
                  color: optionDisabled ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
                })
              })]
            })
          }, "".concat(index, "_").concat(choice === null || choice === void 0 ? void 0 : choice.key))
        );
      })
    });
  }, []);
  var content = message.content,
    type = message.type;
  console.log('here', content);
  var handleAudio = useCallback(function (url) {
    // console.log(url)
    if (!url) {
      toast.error('No audio');
      return;
    }
    // Write logic for handling audio here
  }, []);
  return /*#__PURE__*/_jsx(UpdatedBubble, {
    message: message,
    themeColor: themeColor,
    chatUi: chatUi,
    theme: theme,
    handleAudio: handleAudio,
    feedbackHandler: feedbackHandler,
    getLists: getLists,
    reaction: reaction
  });
};
export default MessageItem;