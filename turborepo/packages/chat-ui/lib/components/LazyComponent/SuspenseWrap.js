"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuspenseWrap = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _ErrorBoundary = require("../ErrorBoundary");
var _excluded = ["component", "onError", "fallback"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var SuspenseWrap = exports.SuspenseWrap = function SuspenseWrap(props) {
  var Comp = props.component,
    onError = props.onError,
    fallback = props.fallback,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded);
  return Comp ? /*#__PURE__*/_react.default.createElement(_ErrorBoundary.ErrorBoundary, {
    onError: onError
  }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: fallback || null
  }, /*#__PURE__*/_react.default.createElement(Comp, rest))) : null;
};