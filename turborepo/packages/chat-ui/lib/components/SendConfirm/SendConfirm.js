"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendConfirm = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _Modal = require("../Modal");
var _Flex = require("../Flex");
var _LocaleProvider = require("../LocaleProvider");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var SendConfirm = exports.SendConfirm = function SendConfirm(props) {
  var file = props.file,
    onCancel = props.onCancel,
    onSend = props.onSend;
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    img = _useState2[0],
    setImg = _useState2[1];
  var _useLocale = (0, _LocaleProvider.useLocale)('SendConfirm'),
    trans = _useLocale.trans;
  (0, _react.useEffect)(function () {
    var reader = new FileReader();
    reader.onload = function (e) {
      if (e.target) {
        setImg(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [file]);
  return /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    className: "SendConfirm",
    title: trans('title'),
    active: !!img,
    vertical: false,
    actions: [{
      label: trans('cancel'),
      onClick: onCancel
    }, {
      label: trans('send'),
      color: 'primary',
      onClick: onSend
    }]
  }, /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: "SendConfirm-inner",
    center: true
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: img,
    alt: ""
  })));
};