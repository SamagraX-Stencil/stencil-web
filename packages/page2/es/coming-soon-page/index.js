import React, { useCallback } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Hourglass from './hourglass';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var ComingSoonPage = function ComingSoonPage() {
  var _theme$primary, _config$title, _theme$primary2, _config$description, _theme$primary3, _config$backText2;
  var theme = useColorPalates();
  var config = useUiConfig('component', 'comingSoon');
  var handleBack = useCallback(function () {
    var _config$backText;
    // window?.history?.back()
    console.log((_config$backText = config.backText) !== null && _config$backText !== void 0 ? _config$backText : 'Back Button');
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs(Box, {
      className: styles.container,
      children: [/*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h4",
          sx: {
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
            fontWeight: '700'
          },
          children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Coming Soon'
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Hourglass, {
          fillColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "body1",
          sx: {
            fontWeight: '600',
            textAlign: 'center'
          },
          children: (_config$description = config.description) !== null && _config$description !== void 0 ? _config$description : 'Coming Soon Description'
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Button, {
          variant: "contained",
          className: styles.backButton,
          size: "large",
          style: {
            backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
          },
          onClick: handleBack,
          children: (_config$backText2 = config.backText) !== null && _config$backText2 !== void 0 ? _config$backText2 : 'Back Button'
        })
      })]
    })]
  });
};
export default ComingSoonPage;