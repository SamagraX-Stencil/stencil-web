import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { CallRounded } from '@mui/icons-material';
import downTimeGit from './assets/downTimeGIF.gif';
import { useUiConfig, useColorPalates } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var DowntimePage = function DowntimePage() {
  var _theme$primary, _config$title, _theme$grey, _config$supportingTex, _config$contactLink2, _theme$grey2, _config$refreshText2, _theme$primary2, _config$previousPageT2;
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
  return /*#__PURE__*/_jsxs(Box, {
    className: styles.container,
    children: [/*#__PURE__*/_jsx(Typography, {
      variant: "h4",
      fontWeight: 600,
      textAlign: "center",
      color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
      children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Downtime'
    }), /*#__PURE__*/_jsx(Box, {
      textAlign: "center",
      children: /*#__PURE__*/_jsx("img", {
        // src={config?.downTimeImage ?? './assets/downTimeGIF.gif'}
        src: downTimeGit.src,
        alt: "downtimeGif",
        className: styles.imageContainer,
        style: {
          maxWidth: '100%',
          height: 'auto'
        }
      })
    }), /*#__PURE__*/_jsx(Typography, {
      fontWeight: 600,
      fontSize: 18,
      color: theme === null || theme === void 0 || (_theme$grey = theme.grey) === null || _theme$grey === void 0 ? void 0 : _theme$grey[600],
      textAlign: "center",
      mb: 2,
      children: (_config$supportingTex = config.supportingText) !== null && _config$supportingTex !== void 0 ? _config$supportingTex : 'Description'
    }), /*#__PURE__*/_jsxs(Box, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      children: [/*#__PURE__*/_jsx(Avatar, {
        sx: {
          bgcolor: theme.primary.main
        },
        children: /*#__PURE__*/_jsx(CallRounded, {
          fontSize: "small"
        })
      }), /*#__PURE__*/_jsx(Button, {
        variant: "text",
        sx: {
          textTransform: 'none',
          ml: 1
        },
        onClick: handleContactUserClick,
        children: /*#__PURE__*/_jsx(Typography, {
          fontSize: 17,
          fontWeight: 600,
          children: (_config$contactLink2 = config.contactLink) !== null && _config$contactLink2 !== void 0 ? _config$contactLink2 : 'Contact Details'
        })
      })]
    }), /*#__PURE__*/_jsxs(Box, {
      display: "flex",
      justifyContent: "center",
      marginTop: 1,
      children: [/*#__PURE__*/_jsx(Button, {
        className: styles.roundedButton,
        onClick: handleRefreshClick,
        variant: "contained",
        size: "large",
        style: {
          backgroundColor: theme === null || theme === void 0 || (_theme$grey2 = theme.grey) === null || _theme$grey2 === void 0 ? void 0 : _theme$grey2[600],
          marginRight: '10px'
        },
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "body1",
          fontWeight: 'bold',
          children: (_config$refreshText2 = config.refreshText) !== null && _config$refreshText2 !== void 0 ? _config$refreshText2 : 'Reload Page'
        })
      }), /*#__PURE__*/_jsx(Button, {
        className: styles.roundedButton,
        variant: "contained",
        size: "medium",
        style: {
          backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
        },
        onClick: handlePreviousClick,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "body1",
          fontWeight: 'bold',
          children: (_config$previousPageT2 = config.previousPageText) !== null && _config$previousPageT2 !== void 0 ? _config$previousPageT2 : 'Previous Page'
        })
      })]
    })]
  });
};
export default DowntimePage;