"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ComingSoon = void 0;
var _provider = require("@repo/provider");
var _material = require("@mui/material");
var _index = _interopRequireDefault(require("./index"));
var _jsxRuntime = require("react/jsx-runtime");
var meta = {
  title: 'Pages/ComingSoonPage',
  component: _index.default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (Story) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_provider.CustomThemeProvider, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CssBaseline, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Story, {})]
    });
  }],
  args: {
    config: {
      component: {
        title: 'Coming Soon!',
        description: 'We are going to launch this feature very soon. Stay tuned!',
        backText: 'Back'
      }
    }
  }
};
var _default = exports.default = meta;
var ComingSoon = exports.ComingSoon = {};