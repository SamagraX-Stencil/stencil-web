"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var observerOptions = {
  threshold: [0, 0.1]
};
var Item = exports.Item = function Item(props) {
  var item = props.item,
    effect = props.effect,
    children = props.children,
    onIntersect = props.onIntersect;
  var itemRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!onIntersect) return undefined;
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        entry = _ref2[0];
      if (entry.intersectionRatio > 0) {
        // 根据回调返回值判断是否继续监听
        if (!onIntersect(item, entry)) {
          observer.unobserve(entry.target);
        }
      }
    }, observerOptions);
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return function () {
      observer.disconnect();
    };
  }, [item, onIntersect]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('ScrollView-item', {
      'slide-in-right-item': effect === 'slide',
      'A-fadeIn': effect === 'fade'
    }),
    ref: itemRef
  }, children);
};