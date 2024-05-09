"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _ScrollView = require("../ScrollView/ScrollView");
var _QuickReply = require("./QuickReply");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var QuickReplies = function QuickReplies(props) {
  var items = props.items,
    visible = props.visible,
    onClick = props.onClick,
    onScroll = props.onScroll;
  var scroller = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(!!onScroll),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    scrollEvent = _useState2[0],
    setScrollEvent = _useState2[1];
  (0, _react.useLayoutEffect)(function () {
    var timer;
    if (scroller.current) {
      setScrollEvent(false);
      scroller.current.scrollTo({
        x: 0,
        y: 0
      });
      timer = setTimeout(function () {
        setScrollEvent(true);
      }, 500);
    }
    return function () {
      clearTimeout(timer);
    };
  }, [items]);
  if (!items.length) return null;
  return /*#__PURE__*/_react.default.createElement(_ScrollView.ScrollView, {
    className: "QuickReplies",
    data: items,
    itemKey: "name",
    ref: scroller,
    "data-visible": visible,
    onScroll: scrollEvent ? onScroll : undefined,
    renderItem: function renderItem(item, index) {
      return /*#__PURE__*/_react.default.createElement(_QuickReply.QuickReply, {
        item: item,
        index: index,
        onClick: onClick,
        key: item.name
      });
    }
  });
};
QuickReplies.defaultProps = {
  items: [],
  visible: true
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(QuickReplies);