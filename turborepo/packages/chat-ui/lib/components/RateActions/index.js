"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateActions = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _IconButton = require("../IconButton");
var _LocaleProvider = require("../LocaleProvider");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var UP = 'up';
var DOWN = 'down';
var RateActions = exports.RateActions = function RateActions(props) {
  var _useLocale = (0, _LocaleProvider.useLocale)('RateActions', {
      up: '赞同',
      down: '反对'
    }),
    trans = _useLocale.trans;
  var _props$upTitle = props.upTitle,
    upTitle = _props$upTitle === void 0 ? trans('up') : _props$upTitle,
    _props$downTitle = props.downTitle,
    downTitle = _props$downTitle === void 0 ? trans('down') : _props$downTitle,
    onClick = props.onClick;
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  function handleClick(val) {
    if (!value) {
      setValue(val);
      onClick(val);
    }
  }
  function handleUpClick() {
    handleClick(UP);
  }
  function handleDownClick() {
    handleClick(DOWN);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "RateActions"
  }, value !== DOWN && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: (0, _clsx.default)('RateBtn', {
      active: value === UP
    }),
    title: upTitle,
    "data-type": UP,
    icon: "thumbs-up",
    onClick: handleUpClick
  }), value !== UP && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: (0, _clsx.default)('RateBtn', {
      active: value === DOWN
    }),
    title: downTitle,
    "data-type": DOWN,
    icon: "thumbs-down",
    onClick: handleDownClick
  }));
};