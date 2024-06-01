"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;
var _index = _interopRequireDefault(require("./index"));
var _provider = require("@repo/provider");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
var meta = {
  title: 'Pages/Login',
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
        title: 'Login',
        positiveFeedbackText: 'Like',
        negativeFeedbackText: 'Dislike'
      },
      theme: {
        primaryColor: {
          value: '#FFFFFF'
        },
        secondaryColor: {
          value: '#FFFFFF'
        }
      }
    }
  }
};
var _default = exports.default = meta;
var Login = exports.Login = {};