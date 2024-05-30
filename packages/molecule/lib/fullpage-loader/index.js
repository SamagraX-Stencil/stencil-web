"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullPageLoader = void 0;
var _material = require("@mui/material");
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
var FullPageLoader = exports.FullPageLoader = function FullPageLoader(_ref) {
  var loading = _ref.loading,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#25b09b' : _ref$color,
    _ref$background = _ref.background,
    background = _ref$background === void 0 ? 'rgba(0, 0, 0, 0.5)' : _ref$background,
    label = _ref.label;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Backdrop, {
    sx: {
      color: '#fff',
      zIndex: 99999,
      background: background
    },
    open: loading,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
      gap: 2,
      alignItems: "center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "loader",
        className: "".concat(_indexModule.default.loader),
        style: {
          color: color
        }
      }), label && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          marginTop: '20px',
          fontSize: '20px',
          fontWeight: 'bold'
        },
        children: label
      })]
    })
  });
};