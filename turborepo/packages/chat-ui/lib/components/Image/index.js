"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useForwardRef = _interopRequireDefault(require("../../hooks/useForwardRef"));
var _excluded = ["className", "src", "lazy", "fluid", "children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Image = exports.Image = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    oSrc = props.src,
    lazy = props.lazy,
    fluid = props.fluid,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var _useState = (0, _react.useState)(lazy ? undefined : oSrc),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    src = _useState2[0],
    setSrc = _useState2[1];
  var imgRef = (0, _useForwardRef.default)(ref);
  var savedSrc = (0, _react.useRef)('');
  var lazyLoaded = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (!lazy) return undefined;
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        entry = _ref2[0];
      if (entry.isIntersecting) {
        setSrc(savedSrc.current);
        lazyLoaded.current = true;
        observer.unobserve(entry.target);
      }
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return function () {
      observer.disconnect();
    };
  }, [imgRef, lazy]);
  (0, _react.useEffect)(function () {
    savedSrc.current = oSrc;
    if (!lazy || lazyLoaded.current) {
      setSrc(oSrc);
    }
  }, [lazy, oSrc]);
  return /*#__PURE__*/_react.default.createElement("img", (0, _extends2.default)({
    className: (0, _clsx.default)('Image', {
      'Image--fluid': fluid
    }, className),
    src: src,
    alt: "",
    ref: imgRef
  }, other));
});