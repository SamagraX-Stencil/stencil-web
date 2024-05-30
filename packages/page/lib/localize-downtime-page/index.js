"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _material = require("@mui/material");
var _downTimeGIF = _interopRequireDefault(require("./assets/downTimeGIF.gif"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { useFlags } from 'flagsmith/react'

var LocalDowntimePage = function LocalDowntimePage() {
  var _theme$primary, _theme$grey, _theme$grey2, _theme$grey3, _theme$primary2;
  var t = (0, _stencilHooks.useLocalization)();
  var theme = (0, _stencilHooks.useBotAppColorPalates)();
  var config = (0, _stencilHooks.useBotConfig)('component', 'downtimePage');
  // const flags = useFlags(['dialer_number'])
  var handleRefreshClick = (0, _react.useCallback)(function () {
    var _window;
    (_window = window) === null || _window === void 0 || _window.location.reload();
  }, []);
  var handlePreviousClick = (0, _react.useCallback)(function () {
    var _window2;
    (_window2 = window) === null || _window2 === void 0 || _window2.history.back();
  }, []);
  var handleContactUserClick = (0, _react.useCallback)(function () {
    // const phoneNumber = `tel:${flags.dialer_number.value}`
    // window.location.href = phoneNumber
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      className: _indexModule.default.container,
      px: 18,
      py: 12,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          variant: "h5",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
          children: t('message.down_time_title')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        my: 4,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: (config === null || config === void 0 ? void 0 : config.downTimeImage) || (_downTimeGIF.default === null || _downTimeGIF.default === void 0 ? void 0 : _downTimeGIF.default.src),
          alt: "downtimeGif",
          className: _indexModule.default.imageContainer
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          variant: "h6",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$grey = theme.grey) === null || _theme$grey === void 0 ? void 0 : _theme$grey[600],
          children: t('message.temporarily_down')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        gap: 1,
        display: 'flex',
        my: 2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
            sx: {
              bgcolor: theme.primary.main,
              width: '7vh',
              height: '7vh'
            },
            alt: "Call Icon",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Call.default, {
              fontSize: "large"
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          variant: 'text',
          sx: {
            textTransform: 'none'
          },
          onClick: handleContactUserClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            variant: "h5",
            color: theme === null || theme === void 0 || (_theme$grey2 = theme.grey) === null || _theme$grey2 === void 0 ? void 0 : _theme$grey2[600],
            fontWeight: 600,
            sx: {
              textDecoration: 'underline'
            },
            children: t('label.call_amakrushi')
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        my: 4,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          className: _indexModule.default.roundedButton,
          onClick: handleRefreshClick,
          variant: "contained",
          size: "large",
          style: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$grey3 = theme.grey) === null || _theme$grey3 === void 0 ? void 0 : _theme$grey3[600]
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            variant: "body1",
            children: t('message.down_time_retry')
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          className: _indexModule.default.roundedButton,
          variant: "contained",
          size: "large",
          style: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
          },
          onClick: handlePreviousClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            variant: "body1",
            children: t('message.down_time_view_prev_chats')
          })
        })]
      })]
    })]
  });
};
var _default = exports.default = LocalDowntimePage;