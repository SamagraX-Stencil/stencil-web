"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _hourglass = _interopRequireDefault(require("./hourglass"));
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LocalComingSoonPage = function LocalComingSoonPage() {
  var _theme$primary, _theme$primary2, _theme$primary3;
  var t = (0, _hooks.useLocalization)();
  var theme = (0, _hooks.useBotAppColorPalates)();
  var handleBack = (0, _react.useCallback)(function () {
    var _window;
    (_window = window) === null || _window === void 0 || (_window = _window.history) === null || _window === void 0 || _window.back();
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
      my: 15,
      className: _indexModule.default.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        mt: 5,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          variant: "h4",
          sx: {
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
            fontWeight: '700'
          },
          children: t('message.coming_soon')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_hourglass.default, {
          fillColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          variant: "body1",
          sx: {
            fontWeight: '600'
          },
          children: t('message.coming_soon_description')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        my: 5,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          variant: "contained",
          className: _indexModule.default.backButton,
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
var _default = exports.default = LocalComingSoonPage;