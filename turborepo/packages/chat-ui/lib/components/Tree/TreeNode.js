"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeNode = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeNode = exports.TreeNode = function TreeNode(props) {
  var title = props.title,
    content = props.content,
    link = props.link,
    _props$children = props.children,
    children = _props$children === void 0 ? [] : _props$children,
    _onClick = props.onClick,
    onExpand = props.onExpand;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    expand = _useState2[0],
    setExpand = _useState2[1];
  var hasChildren = children.length > 0;
  function handleTitleClick() {
    if (hasChildren) {
      setExpand(!expand);
      onExpand(title, !expand);
    } else {
      _onClick({
        title: title,
        content: content,
        link: link
      });
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "TreeNode",
    role: "treeitem",
    "aria-expanded": expand
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "TreeNode-title",
    onClick: handleTitleClick,
    role: "treeitem",
    "aria-expanded": expand,
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "TreeNode-title-text"
  }, title), hasChildren ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "TreeNode-title-icon",
    type: expand ? 'chevron-up' : 'chevron-down'
  }) : null), hasChildren ? children.map(function (t, j) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.default)('TreeNode-children', {
        'TreeNode-children-active': expand
      }),
      key: j
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "TreeNode-title TreeNode-children-title",
      onClick: function onClick() {
        return _onClick(_objectSpread(_objectSpread({}, t), {
          index: j
        }));
      },
      role: "treeitem"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "TreeNode-title-text"
    }, t.title)));
  }) : null);
};