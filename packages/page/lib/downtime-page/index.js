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
var _iconsMaterial = require("@mui/icons-material");
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import CallRoundedIcon from '@mui/icons-material/Call'

var DowntimePage = function DowntimePage() {
  var _theme$primary, _config$title, _config$downTimeImage, _theme$grey, _config$supportingTex, _theme$primary2, _theme$grey2, _config$contactLink2, _theme$grey3, _config$refreshText2, _theme$primary3, _config$previousPageT2;
  var config = (0, _stencilHooks.useUiConfig)('component', 'downtime');
  var theme = (0, _stencilHooks.useColorPalates)();
  console.log('testing at downtime page', config, theme);
  var handleRefreshClick = (0, _react.useCallback)(function () {
    var _config$refreshText;
    // window?.location.reload()
    console.log((_config$refreshText = config.refreshText) !== null && _config$refreshText !== void 0 ? _config$refreshText : 'Contact Details');
  }, []);
  var handlePreviousClick = (0, _react.useCallback)(function () {
    var _config$previousPageT;
    // window?.history.back();
    console.log((_config$previousPageT = config.previousPageText) !== null && _config$previousPageT !== void 0 ? _config$previousPageT : 'Contact Details');
  }, []);
  var handleContactUserClick = (0, _react.useCallback)(function () {
    var _config$contactLink;
    console.log((_config$contactLink = config.contactLink) !== null && _config$contactLink !== void 0 ? _config$contactLink : 'Contact Details');
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      className: _indexModule.default.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          fontSize: "1.5rem",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
          children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Downtime'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        my: 4,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: (_config$downTimeImage = config.downTimeImage) !== null && _config$downTimeImage !== void 0 ? _config$downTimeImage : 'src/molecules/downtime-page/assets/downTimeGIF.gif',
          alt: "downtimeGif",
          className: _indexModule.default.imageContainer
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          variant: "h6",
          fontWeight: 600,
          color: theme === null || theme === void 0 || (_theme$grey = theme.grey) === null || _theme$grey === void 0 ? void 0 : _theme$grey[600],
          children: (_config$supportingTex = config.supportingText) !== null && _config$supportingTex !== void 0 ? _config$supportingTex : 'Description'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        gap: 1,
        display: 'flex',
        my: 2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
            sx: {
              bgcolor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              width: '7vh',
              height: '7vh'
            },
            alt: "Call Icon",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.CallRounded, {
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
            children: (_config$contactLink2 = config.contactLink) !== null && _config$contactLink2 !== void 0 ? _config$contactLink2 : 'Contact Details'
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
            children: (_config$refreshText2 = config.refreshText) !== null && _config$refreshText2 !== void 0 ? _config$refreshText2 : 'Reload Page'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          className: _indexModule.default.roundedButton,
          variant: "contained",
          size: "large",
          style: {
            textTransform: 'none',
            backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
          },
          onClick: handlePreviousClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            variant: "body1",
            children: (_config$previousPageT2 = config.previousPageText) !== null && _config$previousPageT2 !== void 0 ? _config$previousPageT2 : 'Previous Page'
          })
        })]
      })]
    })]
  });
};
var _default = exports.default = DowntimePage;