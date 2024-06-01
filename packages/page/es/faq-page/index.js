import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Typography, Button, Box, Avatar } from '@mui/material';
import { CallRounded } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var FAQPage = function FAQPage() {
  var _theme$primary, _config$title, _theme$primary2, _theme$primary3, _config$userManualTex2, _config$contactDescri, _theme$primary4, _theme$primary5, _config$contactText2;
  var config = useUiConfig('component', 'faqs');
  var theme = useColorPalates();
  var downloadPDFHandler = useCallback(function () {
    var _config$userManualTex;
    console.log((_config$userManualTex = config.userManualText) !== null && _config$userManualTex !== void 0 ? _config$userManualTex : 'User Manual');
  }, []);
  var handleContactClick = useCallback(function () {
    var _config$contactText;
    console.log((_config$contactText = config.contactText) !== null && _config$contactText !== void 0 ? _config$contactText : 'Contact User');
  }, []);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(Box, {
      className: styles.main,
      children: [/*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h4",
          sx: {
            fontWeight: '600',
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
          },
          children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Faq'
        })
      }), (config === null || config === void 0 ? void 0 : config.userManualText) && /*#__PURE__*/_jsx(Box, {
        className: styles.manualButtons,
        children: /*#__PURE__*/_jsx(Button, {
          onClick: downloadPDFHandler,
          variant: "contained",
          sx: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
            '&:hover': {
              backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
            }
          },
          children: (_config$userManualTex2 = config.userManualText) !== null && _config$userManualTex2 !== void 0 ? _config$userManualTex2 : 'User Manual'
        })
      }), (config === null || config === void 0 ? void 0 : config.contactText) && /*#__PURE__*/_jsxs(Box, {
        className: styles.dialerBox,
        children: [/*#__PURE__*/_jsx(Box, {
          p: 1.5,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "body1",
            sx: {
              fontWeight: 'bold'
            },
            children: (_config$contactDescri = config.contactDescriptionText) !== null && _config$contactDescri !== void 0 ? _config$contactDescri : 'contact description'
          })
        }), /*#__PURE__*/_jsxs(Box, {
          px: 2,
          display: 'flex',
          alignItems: 'center',
          children: [/*#__PURE__*/_jsx(Box, {
            children: /*#__PURE__*/_jsx(Avatar, {
              sx: {
                bgcolor: theme.primary.main,
                width: '5vh',
                height: '5vh'
              },
              alt: "Call Icon",
              children: /*#__PURE__*/_jsx(CallRounded, {
                fontSize: "medium"
              })
            })
          }), /*#__PURE__*/_jsx(Button, {
            variant: "text",
            size: "large",
            onClick: handleContactClick,
            sx: {
              textTransform: 'none',
              color: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main,
              '&:hover': {
                color: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main
              }
            },
            children: /*#__PURE__*/_jsx(Typography, {
              variant: "h5",
              fontWeight: 600,
              children: (_config$contactText2 = config.contactText) !== null && _config$contactText2 !== void 0 ? _config$contactText2 : 'Contact User'
            })
          })]
        })]
      })]
    })
  });
};
export default FAQPage;