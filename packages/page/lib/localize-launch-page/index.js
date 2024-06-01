"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hooks = require("@repo/hooks");
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
var LocalLaunchPage = function LocalLaunchPage(_ref) {
  var _theme$palette, _theme$palette2;
  var theme = _ref.theme,
    config = _ref.config,
    compConfig = _ref.compConfig;
  var t = (0, _hooks.useLocalization)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "".concat(_indexModule.default.container),
    style: {
      background: (config === null || config === void 0 ? void 0 : config.launchPageColor) || (theme === null || theme === void 0 || (_theme$palette = theme.palette) === null || _theme$palette === void 0 || (_theme$palette = _theme$palette.primary) === null || _theme$palette === void 0 ? void 0 : _theme$palette.light)
    },
    children: [(config === null || config === void 0 ? void 0 : config.logo) && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      className: _indexModule.default.loginImage,
      src: config === null || config === void 0 ? void 0 : config.logo,
      alt: "launchPageLogo",
      width: 220,
      height: 233
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: {
        color: theme === null || theme === void 0 || (_theme$palette2 = theme.palette) === null || _theme$palette2 === void 0 || (_theme$palette2 = _theme$palette2.primary) === null || _theme$palette2 === void 0 ? void 0 : _theme$palette2.main
      },
      children: t('label.title')
    })]
  });
};
var _default = exports.default = LocalLaunchPage;