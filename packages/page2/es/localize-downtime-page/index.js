import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
import downTimeGIF from './assets/downTimeGIF.gif';
import CallRoundedIcon from '@mui/icons-material/Call';
import { useBotAppColorPalates } from 'stencil-hooks';
// import { useFlags } from 'flagsmith/react'
import { useBotConfig } from 'stencil-hooks';
import { useLocalization } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var LocalDowntimePage = function LocalDowntimePage() {
  var _theme$primary, _theme$grey, _theme$grey2, _theme$grey3, _theme$primary2;
  var t = useLocalization();
  var theme = useBotAppColorPalates();
  var config = useBotConfig('component', 'downtimePage');
  // const flags = useFlags(['dialer_number'])
  var handleRefreshClick = useCallback(function () {
    var _window;
    (_window = window) === null || _window === void 0 || _window.location.reload();
  }, []);
  var handlePreviousClick = useCallback(function () {
    var _window2;
    (_window2 = window) === null || _window2 === void 0 || _window2.history.back();
  }, []);
  var handleContactUserClick = useCallback(function () {
    // const phoneNumber = `tel:${flags.dialer_number.value}`
    // window.location.href = phoneNumber
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs(Box, {
      className: styles.container,
      px: 18,
      py: 12,
      children: [/*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h5",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
          children: t('message.down_time_title')
        })
      }), /*#__PURE__*/_jsx(Box, {
        my: 4,
        children: /*#__PURE__*/_jsx("img", {
          src: (config === null || config === void 0 ? void 0 : config.downTimeImage) || (downTimeGIF === null || downTimeGIF === void 0 ? void 0 : downTimeGIF.src),
          alt: "downtimeGif",
          className: styles.imageContainer
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h6",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$grey = theme.grey) === null || _theme$grey === void 0 ? void 0 : _theme$grey[600],
          children: t('message.temporarily_down')
        })
      }), /*#__PURE__*/_jsxs(Box, {
        gap: 1,
        display: 'flex',
        my: 2,
        children: [/*#__PURE__*/_jsx(Box, {
          children: /*#__PURE__*/_jsx(Avatar, {
            sx: {
              bgcolor: theme.primary.main,
              width: '7vh',
              height: '7vh'
            },
            alt: "Call Icon",
            children: /*#__PURE__*/_jsx(CallRoundedIcon, {
              fontSize: "large"
            })
          })
        }), /*#__PURE__*/_jsx(Button, {
          variant: 'text',
          sx: {
            textTransform: 'none'
          },
          onClick: handleContactUserClick,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "h5",
            color: theme === null || theme === void 0 || (_theme$grey2 = theme.grey) === null || _theme$grey2 === void 0 ? void 0 : _theme$grey2[600],
            fontWeight: 600,
            sx: {
              textDecoration: 'underline'
            },
            children: t('label.call_amakrushi')
          })
        })]
      }), /*#__PURE__*/_jsxs(Box, {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        my: 4,
        children: [/*#__PURE__*/_jsx(Button, {
          className: styles.roundedButton,
          onClick: handleRefreshClick,
          variant: "contained",
          size: "large",
          style: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$grey3 = theme.grey) === null || _theme$grey3 === void 0 ? void 0 : _theme$grey3[600]
          },
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "body1",
            children: t('message.down_time_retry')
          })
        }), /*#__PURE__*/_jsx(Button, {
          className: styles.roundedButton,
          variant: "contained",
          size: "large",
          style: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
          },
          onClick: handlePreviousClick,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "body1",
            children: t('message.down_time_view_prev_chats')
          })
        })]
      })]
    })]
  });
};
export default LocalDowntimePage;