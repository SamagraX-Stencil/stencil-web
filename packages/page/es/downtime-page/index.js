import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
// import CallRoundedIcon from '@mui/icons-material/Call'
import { CallRounded } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var DowntimePage = function DowntimePage() {
  var _theme$primary, _config$title, _config$downTimeImage, _theme$grey, _config$supportingTex, _theme$primary2, _theme$grey2, _config$contactLink2, _theme$grey3, _config$refreshText2, _theme$primary3, _config$previousPageT2;
  var config = useUiConfig('component', 'downtime');
  var theme = useColorPalates();
  console.log('testing at downtime page', config, theme);
  var handleRefreshClick = useCallback(function () {
    var _config$refreshText;
    // window?.location.reload()
    console.log((_config$refreshText = config.refreshText) !== null && _config$refreshText !== void 0 ? _config$refreshText : 'Contact Details');
  }, []);
  var handlePreviousClick = useCallback(function () {
    var _config$previousPageT;
    // window?.history.back();
    console.log((_config$previousPageT = config.previousPageText) !== null && _config$previousPageT !== void 0 ? _config$previousPageT : 'Contact Details');
  }, []);
  var handleContactUserClick = useCallback(function () {
    var _config$contactLink;
    console.log((_config$contactLink = config.contactLink) !== null && _config$contactLink !== void 0 ? _config$contactLink : 'Contact Details');
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs(Box, {
      className: styles.container,
      children: [/*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          fontSize: "1.5rem",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
          children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Downtime'
        })
      }), /*#__PURE__*/_jsx(Box, {
        my: 4,
        children: /*#__PURE__*/_jsx("img", {
          src: (_config$downTimeImage = config.downTimeImage) !== null && _config$downTimeImage !== void 0 ? _config$downTimeImage : 'src/molecules/downtime-page/assets/downTimeGIF.gif',
          alt: "downtimeGif",
          className: styles.imageContainer
        })
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h6",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$grey = theme.grey) === null || _theme$grey === void 0 ? void 0 : _theme$grey[600],
          children: (_config$supportingTex = config.supportingText) !== null && _config$supportingTex !== void 0 ? _config$supportingTex : 'Description'
        })
      }), /*#__PURE__*/_jsxs(Box, {
        gap: 1,
        display: 'flex',
        my: 2,
        children: [/*#__PURE__*/_jsx(Box, {
          children: /*#__PURE__*/_jsx(Avatar, {
            sx: {
              bgcolor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              width: '7vh',
              height: '7vh'
            },
            alt: "Call Icon",
            children: /*#__PURE__*/_jsx(CallRounded, {
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
            children: (_config$contactLink2 = config.contactLink) !== null && _config$contactLink2 !== void 0 ? _config$contactLink2 : 'Contact Details'
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
            children: (_config$refreshText2 = config.refreshText) !== null && _config$refreshText2 !== void 0 ? _config$refreshText2 : 'Reload Page'
          })
        }), /*#__PURE__*/_jsx(Button, {
          className: styles.roundedButton,
          variant: "contained",
          size: "large",
          style: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
          },
          onClick: handlePreviousClick,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "body1",
            children: (_config$previousPageT2 = config.previousPageText) !== null && _config$previousPageT2 !== void 0 ? _config$previousPageT2 : 'Previous Page'
          })
        })]
      })]
    })]
  });
};
export default DowntimePage;