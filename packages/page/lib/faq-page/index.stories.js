"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Faq = void 0;
var _stencilProvider = require("stencil-provider");
var _material = require("@mui/material");
var _index = _interopRequireDefault(require("./index"));
var _jsxRuntime = require("react/jsx-runtime");
var meta = {
  title: 'Pages/FAQPage',
  component: _index.default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (Story) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_stencilProvider.CustomThemeProvider, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CssBaseline, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Story, {})]
    });
  }],
  args: {
    config: {
      component: {
        title: 'FAQs',
        userManualText: 'User Manual - For VAWs',
        contactDescriptionText: 'To connect with call centre',
        contactText: 'Dial 155333'
      }
    }
  }
};
var _default = exports.default = meta;
var Faq = exports.Faq = {};