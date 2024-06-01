"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hooks = require("@repo/hooks");
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
// import Image from 'next/image';
var LaunchPage = function LaunchPage() {
  var _theme$primary;
  var config = (0, _hooks.useUiConfig)('component', 'launchPage');
  var theme = (0, _hooks.useColorPalates)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "".concat(_indexModule.default.container),
    style: {
      background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      className: _indexModule.default.loginImage,
      src: config === null || config === void 0 ? void 0 : config.logo,
      alt: "KrushakOdisha",
      width: 220,
      height: 233
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: config === null || config === void 0 ? void 0 : config.label
    })]
  });
};
var _default = exports.default = LaunchPage;