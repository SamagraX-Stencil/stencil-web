"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
var MsgThumbsDown = function MsgThumbsDown(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      width: props.width,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        id: "Complete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          id: "thumbs-down",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            d: "M7.3,12.6,10.1,21a.6.6,0,0,0,.8.3l1-.5a2.6,2.6,0,0,0,1.4-2.3V14.6h6.4a2,2,0,0,0,1.9-2.5l-2-8a2,2,0,0,0-1.9-1.5H4.3a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h3V2.6",
            fill: props.fill ? "red" : "none",
            stroke: "red",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2"
          })
        })
      })]
    })
  });
};
var _default = exports.default = MsgThumbsDown;