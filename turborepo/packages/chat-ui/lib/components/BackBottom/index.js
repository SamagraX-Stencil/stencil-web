"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackBottom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _Icon = require("../Icon");
var _LocaleProvider = require("../LocaleProvider");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var BackBottom = exports.BackBottom = function BackBottom(_ref) {
  var count = _ref.count,
    onClick = _ref.onClick,
    onDidMount = _ref.onDidMount;
  var _useLocale = (0, _LocaleProvider.useLocale)('BackBottom'),
    trans = _useLocale.trans;
  var text = trans('bottom');
  if (count) {
    text = trans(count === 1 ? 'newMsgOne' : 'newMsgOther').replace('{n}', count);
  }
  (0, _react.useEffect)(function () {
    if (onDidMount) {
      onDidMount();
    }
  }, [onDidMount]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "BackBottom"
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    className: "slide-in-right-item",
    onClick: onClick
  }, text, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: "chevron-double-down"
  })));
};