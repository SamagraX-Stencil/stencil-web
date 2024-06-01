import React, { useCallback } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Hourglass from './hourglass';
import { useBotAppColorPalates } from '@repo/hooks';
import { useLocalization } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var ComingSoonPage = function ComingSoonPage() {
  var _theme$primary, _theme$primary2, _theme$primary3;
  var t = useLocalization();
  var theme = useBotAppColorPalates();
  var handleBack = useCallback(function () {
    var _window;
    (_window = window) === null || _window === void 0 || (_window = _window.history) === null || _window === void 0 || _window.back();
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs(Box, {
      my: 15,
      className: styles.container,
      children: [/*#__PURE__*/_jsx(Box, {
        mt: 5,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h4",
          sx: {
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
            fontWeight: '700'
          },
          children: t('message.coming_soon')
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Hourglass, {
          fillColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "body1",
          sx: {
            fontWeight: '600'
          },
          children: t('message.coming_soon_description')
        })
      }), /*#__PURE__*/_jsx(Box, {
        my: 5,
        children: /*#__PURE__*/_jsx(Button, {
          variant: "contained",
          className: styles.backButton,
          size: "large",
          style: {
            backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
          },
          onClick: handleBack,
          children: t('label.back')
        })
      })]
    })]
  });
};
export default ComingSoonPage;