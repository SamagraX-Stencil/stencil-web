"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Downtime = void 0;
var _stencilProvider = require("stencil-provider");
var _material = require("@mui/material");
var _index = _interopRequireDefault(require("./index"));
var _jsxRuntime = require("react/jsx-runtime");
var meta = {
  title: 'Pages/DowntimePage',
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
        title: "We're under maintainance",
        downTimeImage: '/src/pages/downtime-page/assets/downTimeGIF.gif',
        supportingText: 'Have an urgent query?',
        contactLink: 'Call Ama Krushi',
        refreshText: 'Try Again',
        previousPageText: 'Previous Page'
      }
    }
  }
};
var _default = exports.default = meta;
var Downtime = exports.Downtime = {};