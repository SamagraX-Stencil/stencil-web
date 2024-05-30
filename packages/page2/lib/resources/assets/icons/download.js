"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
var DownloadIcon = function DownloadIcon(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
    viewBox: "0 0 24 24",
    width: "24px",
    height: "24px",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      id: "Complete",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        id: "download",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            d: "M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7",
            fill: "none",
            stroke: props.color,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
              "data-name": "Right",
              fill: "none",
              id: "Right-2",
              points: "7.9 12.3 12 16.3 16.1 12.3",
              stroke: props.color,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
              fill: "none",
              stroke: props.color,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "12",
              x2: "12",
              y1: "2.7",
              y2: "14.2"
            })]
          })]
        })
      })
    })]
  });
};
var _default = exports.default = DownloadIcon;