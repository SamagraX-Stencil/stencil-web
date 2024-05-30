import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useCallback, useEffect, useState } from 'react';
import styles from './style.module.css';
import { List } from 'stencil-molecule';
import { IconButton } from '@mui/material';
import { DeleteOutline, Forum } from '@mui/icons-material';
import moment from 'moment';
import { FullPageLoader } from 'stencil-molecule';
import { map } from 'lodash';
import sample from './sample.json';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var HistoryPage = function HistoryPage() {
  var _theme$primary2, _theme$primary3, _theme$primary4, _config$title, _theme$primary5;
  var config = useUiConfig('component', 'historyPage');
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isFetching = _useState2[0],
    setIsFetching = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    list = _useState4[0],
    setList = _useState4[1];
  var theme = useColorPalates();
  var handleClick = useCallback(function (activeItem) {
    console.log({
      activeItem: activeItem
    });
  }, []);
  var onSecondaryActionClick = useCallback(function (activeItem) {
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
  useEffect(function () {
    setIsFetching(true);
    var historyList = map(sample, function (chatItem) {
      var _theme$primary;
      return {
        id: chatItem === null || chatItem === void 0 ? void 0 : chatItem.id,
        label: chatItem === null || chatItem === void 0 ? void 0 : chatItem.query,
        conversationId: chatItem === null || chatItem === void 0 ? void 0 : chatItem.conversationId,
        userId: chatItem === null || chatItem === void 0 ? void 0 : chatItem.userId,
        secondaryLabel: config.showTimestamp ? moment(chatItem === null || chatItem === void 0 ? void 0 : chatItem.updatedAt).format('hh:mm A DD/MM/YYYY') : '',
        icon: /*#__PURE__*/_jsx(Forum, {
          style: {
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.light
          }
        }),
        secondaryAction: config.allowDelete && /*#__PURE__*/_jsx(IconButton, {
          edge: "end",
          "aria-label": "comments",
          onClick: onSecondaryActionClick(chatItem),
          children: /*#__PURE__*/_jsx(DeleteOutline, {})
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
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      children: [/*#__PURE__*/_jsx(FullPageLoader, {
        loading: isFetching,
        color: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
      }), /*#__PURE__*/_jsx("div", {
        className: styles.title,
        style: {
          color: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main
        },
        children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'No Label Provided'
      }), /*#__PURE__*/_jsx("div", {
        className: styles.chatList,
        children: /*#__PURE__*/_jsx(List, {
          items: list,
          noItem: {
            label: config.noItemsText,
            icon: /*#__PURE__*/_jsx(Forum, {
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
export default HistoryPage;