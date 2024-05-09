import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "current", "status", "inverted", "children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import clsx from 'clsx';
export var Stepper = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$current = props.current,
    current = _props$current === void 0 ? 0 : _props$current,
    status = props.status,
    inverted = props.inverted,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var childrenArray = React.Children.toArray(children);
  var steps = childrenArray.map(function (child, index) {
    var state = {
      index: index,
      active: false,
      completed: false,
      disabled: false
    };
    if (current === index) {
      state.active = true;
      state.status = status;
    } else if (current > index) {
      state.completed = true;
    } else {
      state.disabled = !inverted;
      state.completed = inverted;
    }
    return /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, state), child.props)) : null;
  });
  return /*#__PURE__*/React.createElement("ul", _extends({
    className: clsx('Stepper', className),
    ref: ref
  }, other), steps);
});