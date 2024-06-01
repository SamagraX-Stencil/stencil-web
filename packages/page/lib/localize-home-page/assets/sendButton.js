"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Send = _interopRequireDefault(require("@mui/icons-material/Send"));
var _jsxRuntime = require("react/jsx-runtime");
var SendButton = function SendButton(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      background: props === null || props === void 0 ? void 0 : props.color,
      borderRadius: '50%',
      height: props === null || props === void 0 ? void 0 : props.height,
      width: props === null || props === void 0 ? void 0 : props.width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Send.default, {
      sx: {
        color: 'white'
      }
    })
  });
};
var _default = exports.default = SendButton;