"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _chatui = require("@repo/chatui");
var _react = require("react");
var _reactHotToast = require("react-hot-toast");
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _right = _interopRequireDefault(require("./assets/right"));
var _hooks = require("@repo/hooks");
var _bubble = require("./bubble");
var _jsxRuntime = require("react/jsx-runtime");
// import BlinkingSpinner from '../blinking-spinner/index';
var MessageItem = function MessageItem(_ref) {
  var _message$content, _message$content2, _message$content4;
  var message = _ref.message,
    themeColor = _ref.themeColor,
    chatUi = _ref.chatUi;
  var theme = (0, _hooks.useColorPalates)();
  var _useState = (0, _react.useState)(message === null || message === void 0 || (_message$content = message.content) === null || _message$content === void 0 || (_message$content = _message$content.data) === null || _message$content === void 0 ? void 0 : _message$content.reaction),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    reaction = _useState2[0],
    setReaction = _useState2[1];
  // @ts-ignore
  var _useState3 = (0, _react.useState)((message === null || message === void 0 || (_message$content2 = message.content) === null || _message$content2 === void 0 || (_message$content2 = _message$content2.data) === null || _message$content2 === void 0 ? void 0 : _message$content2.optionClicked) || false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    optionDisabled = _useState4[0],
    setOptionDisabled = _useState4[1];
  (0, _react.useEffect)(function () {
    var _message$content3;
    setReaction(message === null || message === void 0 || (_message$content3 = message.content) === null || _message$content3 === void 0 || (_message$content3 = _message$content3.data) === null || _message$content3 === void 0 ? void 0 : _message$content3.reaction);
  }, [message === null || message === void 0 || (_message$content4 = message.content) === null || _message$content4 === void 0 || (_message$content4 = _message$content4.data) === null || _message$content4 === void 0 ? void 0 : _message$content4.reaction]);
  var feedbackHandler = (0, _react.useCallback)(function (_ref2) {
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
  var getLists = (0, _react.useCallback)(function (_ref3) {
    var choices = _ref3.choices;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_chatui.List, {
      className: "".concat(_indexModule.default.list),
      children: choices === null || choices === void 0 ? void 0 : choices.map(function (choice, index) {
        var _content$data, _theme$primary, _theme$primary2, _theme$primary3;
        return (
          /*#__PURE__*/
          // {_.map(choices ?? [], (choice, index) => (
          (0, _jsxRuntime.jsx)(_chatui.ListItem, {
            className: "".concat(_indexModule.default.onHover, " ").concat(_indexModule.default.listItem),
            onClick: function onClick(e) {
              e.preventDefault();
              if (optionDisabled) {
                _reactHotToast.toast.error("Cannot answer again");
              }
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                display: 'flex',
                alignItems: 'center',
                color: (content === null || content === void 0 || (_content$data = content.data) === null || _content$data === void 0 ? void 0 : _content$data.position) === 'right' ? theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main : optionDisabled ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                children: choice
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  marginLeft: 'auto'
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_right.default, {
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
  var handleAudio = (0, _react.useCallback)(function (url) {
    // console.log(url)
    if (!url) {
      _reactHotToast.toast.error('No audio');
      return;
    }
    // Write logic for handling audio here
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_bubble.UpdatedBubble, {
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
var _default = exports.default = MessageItem;