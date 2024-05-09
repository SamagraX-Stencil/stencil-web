"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _clsx = _interopRequireDefault(require("clsx"));
var _useMount2 = _interopRequireDefault(require("../../hooks/useMount"));
var _Backdrop = require("../Backdrop");
var _IconButton = require("../IconButton");
var _Button = require("../Button");
var _useNextId = _interopRequireDefault(require("../../hooks/useNextId"));
var _toggleClass = _interopRequireDefault(require("../../utils/toggleClass"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function clearModal() {
  if (!document.querySelector('.Modal') && !document.querySelector('.Popup')) {
    (0, _toggleClass.default)('S--modalOpen', false);
  }
}
var Base = exports.Base = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var baseClass = props.baseClass,
    active = props.active,
    className = props.className,
    title = props.title,
    _props$showClose = props.showClose,
    showClose = _props$showClose === void 0 ? true : _props$showClose,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
    _props$backdrop = props.backdrop,
    backdrop = _props$backdrop === void 0 ? true : _props$backdrop,
    height = props.height,
    overflow = props.overflow,
    actions = props.actions,
    _props$vertical = props.vertical,
    vertical = _props$vertical === void 0 ? true : _props$vertical,
    btnVariant = props.btnVariant,
    bgColor = props.bgColor,
    children = props.children,
    onBackdropClick = props.onBackdropClick,
    onClose = props.onClose;
  var mid = (0, _useNextId.default)('modal-');
  var titleId = props.titleId || mid;
  var wrapperRef = (0, _react.useRef)(null);
  var _useMount = (0, _useMount2.default)({
      active: active,
      ref: wrapperRef
    }),
    didMount = _useMount.didMount,
    isShow = _useMount.isShow;
  (0, _react.useEffect)(function () {
    setTimeout(function () {
      if (autoFocus && wrapperRef.current) {
        wrapperRef.current.focus();
      }
    });
  }, [autoFocus]);
  (0, _react.useEffect)(function () {
    if (isShow) {
      (0, _toggleClass.default)('S--modalOpen', isShow);
    }
  }, [isShow]);
  (0, _react.useEffect)(function () {
    if (!active && !didMount) {
      clearModal();
    }
  }, [active, didMount]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      wrapperRef: wrapperRef
    };
  });
  (0, _react.useEffect)(function () {
    return function () {
      clearModal();
    };
  }, []);
  if (!didMount) return null;
  var isPopup = baseClass === 'Popup';
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)(baseClass, className, {
      active: isShow
    }),
    ref: wrapperRef,
    tabIndex: -1
  }, backdrop && /*#__PURE__*/_react.default.createElement(_Backdrop.Backdrop, {
    active: isShow,
    onClick: backdrop === true ? onBackdropClick || onClose : undefined
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)("".concat(baseClass, "-dialog"), {
      'pb-safe': isPopup && !actions
    }),
    "data-bg-color": bgColor,
    "data-height": isPopup && height ? height : undefined,
    role: "dialog",
    "aria-labelledby": titleId,
    "aria-modal": true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(baseClass, "-content")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(baseClass, "-header")
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "".concat(baseClass, "-title"),
    id: titleId
  }, title, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '2px',
      width: '55px',
      backgroundColor: '#B0B0B0',
      margin: '10px auto 2px auto'
    }
  })), showClose && onClose && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: "".concat(baseClass, "-close"),
    icon: "close",
    size: "lg",
    onClick: onClose,
    "aria-label": "\u5173\u95ED"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)("".concat(baseClass, "-body"), {
      overflow: overflow
    })
  }, children), actions && /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(baseClass, "-footer ").concat(baseClass, "-footer--").concat(vertical ? 'v' : 'h'),
    "data-variant": btnVariant || 'round'
  }, actions.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Button.Button, (0, _extends2.default)({
      size: "lg",
      block: isPopup,
      variant: btnVariant
    }, item, {
      key: item.label
    }));
  }))))), document.body);
});