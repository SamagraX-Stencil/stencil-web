"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
var _iconsMaterial = require("@mui/icons-material");
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var RecorderControl = function RecorderControl(_ref) {
  var _theme$primary5, _theme$primary6, _theme$primary7, _theme$primary8;
  var status = _ref.status,
    onClick = _ref.onClick,
    _ref$includeDiv = _ref.includeDiv,
    includeDiv = _ref$includeDiv === void 0 ? true : _ref$includeDiv,
    _ref$tapToSpeak = _ref.tapToSpeak,
    tapToSpeak = _ref$tapToSpeak === void 0 ? false : _ref$tapToSpeak;
  var handleClick = function handleClick() {
    if (onClick) {
      onClick();
    }
  };
  var theme = (0, _stencilHooks.useColorPalates)();
  var customStylesPulse;
  var customStylesProcess;
  var classPulse = '';
  var classProcess = '';
  if (status === 'error') {
    customStylesPulse = {
      background: 'red',
      border: '5px solid red'
    };
    classPulse = _stylesModule.default.pulseRing;
  } else if (status === 'recording') {
    var _theme$primary, _theme$primary2;
    customStylesPulse = {
      background: "".concat(theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main),
      border: "5px solid ".concat(theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main)
    };
    classPulse = _stylesModule.default.pulseRing;
  } else if (status === 'processing') {
    var _theme$primary3, _theme$primary4;
    // processing
    customStylesProcess = {
      borderColor: "transparent transparent ".concat(theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.dark, " ").concat(theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.dark)
    };
    classProcess = _stylesModule.default.loader;
  }
  return includeDiv ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _stylesModule.default.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      onClick: handleClick,
      className: _stylesModule.default.btn,
      style: {
        cursor: 'pointer',
        backgroundColor: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main,
        border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "".concat(classPulse),
        style: _objectSpread({}, customStylesPulse)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Mic, {
        sx: {
          color: 'white',
          display: 'block'
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "".concat(classProcess),
        style: _objectSpread({}, customStylesProcess)
      })]
    }), tapToSpeak && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: {
        color: 'black',
        fontSize: '12px',
        marginTop: '4px'
      },
      children: 'label.tap_to_speak'
    })]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    onClick: handleClick,
    className: _stylesModule.default.btn,
    style: {
      cursor: 'pointer',
      background: theme === null || theme === void 0 || (_theme$primary7 = theme.primary) === null || _theme$primary7 === void 0 ? void 0 : _theme$primary7.main,
      border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary8 = theme.primary) === null || _theme$primary8 === void 0 ? void 0 : _theme$primary8.main),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(classPulse),
      style: _objectSpread({}, customStylesPulse)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Mic, {
      sx: {
        color: 'white',
        display: 'block'
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(classProcess),
      style: _objectSpread({}, customStylesProcess)
    })]
  });
};
var _default = exports.default = RecorderControl;