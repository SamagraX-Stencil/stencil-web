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
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var FAQPage = function FAQPage() {
  var _theme$primary, _config$title, _theme$primary2, _theme$primary3, _config$userManualTex2, _config$contactDescri, _theme$primary4, _theme$primary5, _config$contactText2;
  var config = (0, _hooks.useUiConfig)('component', 'faqs');
  var theme = (0, _hooks.useColorPalates)();
  var downloadPDFHandler = (0, _react.useCallback)(function () {
    var _config$userManualTex;
    console.log((_config$userManualTex = config.userManualText) !== null && _config$userManualTex !== void 0 ? _config$userManualTex : 'User Manual');
  }, []);
  var handleContactClick = (0, _react.useCallback)(function () {
    var _config$contactText;
    console.log((_config$contactText = config.contactText) !== null && _config$contactText !== void 0 ? _config$contactText : 'Contact User');
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      className: _indexModule.default.main,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          variant: "h4",
          sx: {
            fontWeight: '600',
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
          },
          children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Faq'
        })
      }), (config === null || config === void 0 ? void 0 : config.userManualText) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        className: _indexModule.default.manualButtons,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
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
      }), (config === null || config === void 0 ? void 0 : config.contactText) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        className: _indexModule.default.dialerBox,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
          p: 1.5,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            variant: "body1",
            sx: {
              fontWeight: 'bold'
            },
            children: (_config$contactDescri = config.contactDescriptionText) !== null && _config$contactDescri !== void 0 ? _config$contactDescri : 'contact description'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
          px: 2,
          display: 'flex',
          alignItems: 'center',
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
              sx: {
                bgcolor: theme.primary.main,
                width: '5vh',
                height: '5vh'
              },
              alt: "Call Icon",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.CallRounded, {
                fontSize: "medium"
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
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
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
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
var _default = exports.default = FAQPage;