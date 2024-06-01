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
var ComingSoonPage = function ComingSoonPage() {
  var _theme$primary, _config$title, _theme$primary2, _config$description, _theme$primary3, _config$backText2;
  var theme = (0, _hooks.useColorPalates)();
  var config = (0, _hooks.useUiConfig)('component', 'comingSoon');
  var handleBack = (0, _react.useCallback)(function () {
    var _config$backText;
    // window?.history?.back()
    console.log((_config$backText = config.backText) !== null && _config$backText !== void 0 ? _config$backText : 'Back Button');
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
      className: _indexModule.default.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          variant: "h4",
          sx: {
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
            fontWeight: '700'
          },
          children: (_config$title = config.title) !== null && _config$title !== void 0 ? _config$title : 'Coming Soon'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_hourglass.default, {
          fillColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          variant: "body1",
          sx: {
            fontWeight: '600',
            textAlign: 'center'
          },
          children: (_config$description = config.description) !== null && _config$description !== void 0 ? _config$description : 'Coming Soon Description'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          variant: "contained",
          className: _indexModule.default.backButton,
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
var _default = exports.default = ComingSoonPage;