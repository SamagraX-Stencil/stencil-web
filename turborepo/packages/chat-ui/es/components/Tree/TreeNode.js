import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
export var TreeNode = function TreeNode(props) {
  var title = props.title,
    content = props.content,
    link = props.link,
    _props$children = props.children,
    children = _props$children === void 0 ? [] : _props$children,
    _onClick = props.onClick,
    onExpand = props.onExpand;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
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
  return /*#__PURE__*/React.createElement("div", {
    className: "TreeNode",
    role: "treeitem",
    "aria-expanded": expand
  }, /*#__PURE__*/React.createElement("div", {
    className: "TreeNode-title",
    onClick: handleTitleClick,
    role: "treeitem",
    "aria-expanded": expand,
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "TreeNode-title-text"
  }, title), hasChildren ? /*#__PURE__*/React.createElement(Icon, {
    className: "TreeNode-title-icon",
    type: expand ? 'chevron-up' : 'chevron-down'
  }) : null), hasChildren ? children.map(function (t, j) {
    return /*#__PURE__*/React.createElement("div", {
      className: clsx('TreeNode-children', {
        'TreeNode-children-active': expand
      }),
      key: j
    }, /*#__PURE__*/React.createElement("div", {
      className: "TreeNode-title TreeNode-children-title",
      onClick: function onClick() {
        return _onClick(_objectSpread(_objectSpread({}, t), {
          index: j
        }));
      },
      role: "treeitem"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TreeNode-title-text"
    }, t.title)));
  }) : null);
};