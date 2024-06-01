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
var _downTimeGIF = _interopRequireDefault(require("./assets/downTimeGIF.gif"));
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var DowntimePage = function DowntimePage() {
  var _theme$primary, _config$title, _theme$grey, _config$supportingTex, _config$contactLink2, _theme$grey2, _config$refreshText2, _theme$primary2, _config$previousPageT2;
  var config = (0, _hooks.useUiConfig)('component', 'downtime');
  var theme = (0, _hooks.useColorPalates)();
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
    className: _indexModule.default.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
      variant: "h4",
      fontWeight: 600,
      textAlign: "center",
      color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
      children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Downtime'
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
      textAlign: "center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        // src={config?.downTimeImage ?? './assets/downTimeGIF.gif'}
        src: _downTimeGIF.default.src,
        alt: "downtimeGif",
        className: _indexModule.default.imageContainer,
        style: {
          maxWidth: '100%',
          height: 'auto'
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
      fontWeight: 600,
      fontSize: 18,
      color: theme === null || theme === void 0 || (_theme$grey = theme.grey) === null || _theme$grey === void 0 ? void 0 : _theme$grey[600],
      textAlign: "center",
      mb: 2,
      children: (_config$supportingTex = config.supportingText) !== null && _config$supportingTex !== void 0 ? _config$supportingTex : 'Description'
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
        sx: {
          bgcolor: theme.primary.main
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.CallRounded, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        variant: "text",
        sx: {
          textTransform: 'none',
          ml: 1
        },
        onClick: handleContactUserClick,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          fontSize: 17,
          fontWeight: 600,
          children: (_config$contactLink2 = config.contactLink) !== null && _config$contactLink2 !== void 0 ? _config$contactLink2 : 'Contact Details'
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      display: "flex",
      justifyContent: "center",
      marginTop: 1,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        className: _indexModule.default.roundedButton,
        onClick: handleRefreshClick,
        variant: "contained",
        size: "large",
        style: {
          backgroundColor: theme === null || theme === void 0 || (_theme$grey2 = theme.grey) === null || _theme$grey2 === void 0 ? void 0 : _theme$grey2[600],
          marginRight: '10px'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          variant: "body1",
          fontWeight: 'bold',
          children: (_config$refreshText2 = config.refreshText) !== null && _config$refreshText2 !== void 0 ? _config$refreshText2 : 'Reload Page'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        className: _indexModule.default.roundedButton,
        variant: "contained",
        size: "medium",
        style: {
          backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
        },
        onClick: handlePreviousClick,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          variant: "body1",
          fontWeight: 'bold',
          children: (_config$previousPageT2 = config.previousPageText) !== null && _config$previousPageT2 !== void 0 ? _config$previousPageT2 : 'Previous Page'
        })
      })]
    })]
  });
};
var _default = exports.default = DowntimePage;