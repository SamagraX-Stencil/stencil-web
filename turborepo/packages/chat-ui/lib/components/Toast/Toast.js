"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function renderIcon(type) {
  switch (type) {
    case 'success':
      return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        type: "check-circle"
      });
    case 'error':
      return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        type: "warning-circle"
      });
    case 'loading':
      return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        type: "spinner",
        spin: true
      });
    default:
      return null;
  }
}
var Toast = exports.Toast = function Toast(props) {
  var content = props.content,
    type = props.type,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 2000 : _props$duration,
    onUnmount = props.onUnmount;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  (0, _react.useEffect)(function () {
    setShow(true);
    if (duration !== -1) {
      setTimeout(function () {
        setShow(false);
      }, duration);
      setTimeout(function () {
        if (onUnmount) {
          onUnmount();
        }
      }, duration + 300);
    }
  }, [duration, onUnmount]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Toast', {
      show: show
    }),
    "data-type": type,
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Toast-content",
    role: "presentation"
  }, renderIcon(type), /*#__PURE__*/_react.default.createElement("p", {
    className: "Toast-message"
  }, content)));
};