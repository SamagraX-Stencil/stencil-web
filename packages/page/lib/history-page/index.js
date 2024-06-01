"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _styleModule = _interopRequireDefault(require("./style.module.css"));
var _molecules = require("@repo/molecules");
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _moment = _interopRequireDefault(require("moment"));
var _lodash = require("lodash");
var _sample = _interopRequireDefault(require("./sample.json"));
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
var HistoryPage = function HistoryPage() {
  var _theme$primary2, _theme$primary3, _theme$primary4, _config$title, _theme$primary5;
  var config = (0, _hooks.useUiConfig)('component', 'historyPage');
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isFetching = _useState2[0],
    setIsFetching = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    list = _useState4[0],
    setList = _useState4[1];
  var theme = (0, _hooks.useColorPalates)();
  var handleClick = (0, _react.useCallback)(function (activeItem) {
    console.log({
      activeItem: activeItem
    });
  }, []);
  var onSecondaryActionClick = (0, _react.useCallback)(function (activeItem) {
    return function () {
      if (window.confirm('Are you sure you want to delete this conversation?')) {
        setList(function (prev) {
          return prev.filter(function (item) {
            return item.conversationId !== activeItem.conversationId;
          });
        });
      }
    };
  }, []);
  (0, _react.useEffect)(function () {
    setIsFetching(true);
    var historyList = (0, _lodash.map)(_sample.default, function (chatItem) {
      var _theme$primary;
      return {
        id: chatItem === null || chatItem === void 0 ? void 0 : chatItem.id,
        label: chatItem === null || chatItem === void 0 ? void 0 : chatItem.query,
        conversationId: chatItem === null || chatItem === void 0 ? void 0 : chatItem.conversationId,
        userId: chatItem === null || chatItem === void 0 ? void 0 : chatItem.userId,
        secondaryLabel: config.showTimestamp ? (0, _moment.default)(chatItem === null || chatItem === void 0 ? void 0 : chatItem.updatedAt).format('hh:mm A DD/MM/YYYY') : '',
        icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Forum, {
          style: {
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.light
          }
        }),
        secondaryAction: config.allowDelete && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
          edge: "end",
          "aria-label": "comments",
          onClick: onSecondaryActionClick(chatItem),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.DeleteOutline, {})
        }),
        onClick: handleClick,
        isDivider: true
      };
    });
    setTimeout(function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setList(historyList);
      setIsFetching(false);
    }, 2000);
  }, [handleClick, onSecondaryActionClick, config.showTimestamp, config.allowDelete, theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.light]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _styleModule.default.main,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.FullPageLoader, {
        loading: isFetching,
        color: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _styleModule.default.title,
        style: {
          color: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main
        },
        children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'No Label Provided'
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _styleModule.default.chatList,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.List, {
          items: list,
          noItem: {
            label: config.noItemsText,
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Forum, {
              style: {
                color: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.light
              }
            })
          }
        })
      })]
    })
  });
};
var _default = exports.default = HistoryPage;