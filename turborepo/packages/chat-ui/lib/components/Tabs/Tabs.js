"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _smoothScroll = _interopRequireDefault(require("../../utils/smoothScroll"));
var _useNextId = _interopRequireDefault(require("../../hooks/useNextId"));
var _excluded = ["active", "index", "children", "onClick"],
  _excluded2 = ["active", "children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var TabItem = function TabItem(props) {
  var active = props.active,
    index = props.index,
    children = props.children,
    onClick = props.onClick,
    others = (0, _objectWithoutProperties2.default)(props, _excluded);
  function handleClick(e) {
    onClick(index, e);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Tabs-navItem"
  }, /*#__PURE__*/_react.default.createElement("button", (0, _extends2.default)({
    className: (0, _clsx.default)('Tabs-navLink', {
      active: active
    }),
    type: "button",
    role: "tab",
    "aria-selected": active,
    onClick: handleClick
  }, others), /*#__PURE__*/_react.default.createElement("span", null, children)));
};
var TabsPane = function TabsPane(props) {
  var active = props.active,
    children = props.children,
    others = (0, _objectWithoutProperties2.default)(props, _excluded2);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('Tabs-pane', {
      active: active
    })
  }, others, {
    role: "tabpanel"
  }), children);
};
var Tabs = exports.Tabs = function Tabs(props) {
  var className = props.className,
    _props$index = props.index,
    oIndex = _props$index === void 0 ? 0 : _props$index,
    scrollable = props.scrollable,
    hideNavIfOnlyOne = props.hideNavIfOnlyOne,
    children = props.children,
    onChange = props.onChange;
  var _useState = (0, _react.useState)({}),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    pointerStyles = _useState2[0],
    setPointerStyles = _useState2[1];
  var _useState3 = (0, _react.useState)(oIndex || 0),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    index = _useState4[0],
    setIndex = _useState4[1];
  var indexRef = (0, _react.useRef)(index);
  var navRef = (0, _react.useRef)(null);
  var headers = [];
  var contents = [];
  var tabPaneId = (0, _useNextId.default)('tabs-');
  function handleIndexChange(idx, e) {
    setIndex(idx);
    if (onChange) {
      onChange(idx, e);
    }
  }
  _react.default.Children.forEach(children, function (item, idx) {
    if (!item) return;
    var active = index === idx;
    var id = "".concat(tabPaneId, "-").concat(idx);
    headers.push( /*#__PURE__*/_react.default.createElement(TabItem, {
      active: active,
      index: idx,
      key: id,
      onClick: handleIndexChange,
      "aria-controls": id,
      tabIndex: active ? -1 : 0
    }, item.props.label));
    if (item.props.children) {
      contents.push( /*#__PURE__*/_react.default.createElement(TabsPane, {
        active: active,
        key: id,
        id: id
      }, item.props.children));
    }
  });
  (0, _react.useEffect)(function () {
    setIndex(oIndex);
  }, [oIndex]);
  var movePointer = (0, _react.useCallback)(function () {
    var nav = navRef.current;
    if (!nav) return;
    var currentNav = nav.children[indexRef.current];
    if (!currentNav) return;
    var text = currentNav.querySelector('span');
    if (!text) return;
    var _ref = currentNav,
      navWidth = _ref.offsetWidth,
      navOffsetLeft = _ref.offsetLeft;
    var _text$getBoundingClie = text.getBoundingClientRect(),
      textWidth = _text$getBoundingClie.width;
    var pointerWidth = Math.max(textWidth - 16, 26);
    // 中心位的偏移量
    var offsetLeftOfCenter = navOffsetLeft + navWidth / 2;
    setPointerStyles({
      transform: "translateX(".concat(offsetLeftOfCenter - pointerWidth / 2, "px)"),
      width: "".concat(pointerWidth, "px")
    });
    if (scrollable) {
      (0, _smoothScroll.default)({
        el: nav,
        to: offsetLeftOfCenter - nav.offsetWidth / 2,
        x: true
      });
    }
  }, [scrollable]);
  (0, _react.useEffect)(function () {
    var nav = navRef.current;
    var ro;
    if (nav && 'ResizeObserver' in window) {
      ro = new ResizeObserver(movePointer);
      ro.observe(nav);
    }
    return function () {
      if (ro && nav) {
        ro.unobserve(nav);
      }
    };
  }, [movePointer]);
  (0, _react.useEffect)(function () {
    indexRef.current = index;
    movePointer();
  }, [index, movePointer]);
  var needNav = headers.length > (hideNavIfOnlyOne ? 1 : 0);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Tabs', {
      'Tabs--scrollable': scrollable
    }, className)
  }, needNav && /*#__PURE__*/_react.default.createElement("div", {
    className: "Tabs-nav",
    role: "tablist",
    ref: navRef
  }, headers, /*#__PURE__*/_react.default.createElement("span", {
    className: "Tabs-navPointer",
    style: pointerStyles
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "Tabs-content"
  }, contents));
};