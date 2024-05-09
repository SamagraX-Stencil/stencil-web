"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickOutside = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children", "onClick", "mouseEvent"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var doc = document;
var html = doc.documentElement;
var ClickOutside = exports.ClickOutside = function ClickOutside(props) {
  var children = props.children,
    onClick = props.onClick,
    _props$mouseEvent = props.mouseEvent,
    mouseEvent = _props$mouseEvent === void 0 ? 'mouseup' : _props$mouseEvent,
    others = (0, _objectWithoutProperties2.default)(props, _excluded);
  var wrapper = (0, _react.useRef)(null);
  function handleClick(e) {
    if (!wrapper.current) return;
    if (html.contains(e.target) && !wrapper.current.contains(e.target)) {
      onClick(e);
    }
  }
  (0, _react.useEffect)(function () {
    if (mouseEvent) {
      doc.addEventListener(mouseEvent, handleClick);
    }
    return function () {
      doc.removeEventListener(mouseEvent, handleClick);
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    ref: wrapper
  }, others), children);
};