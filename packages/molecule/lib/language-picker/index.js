"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _lodash = require("lodash");
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
var LanguagePicker = function LanguagePicker() {
  var _React$useState = _react.default.useState('en'),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    activeLanguage = _React$useState2[0],
    setActiveLanguage = _React$useState2[1];
  var handleChange = function handleChange(event) {
    setActiveLanguage(event.target.value);
  };
  var theme = (0, _hooks.useColorPalates)();
  var languages = [{
    name: 'Eng',
    value: 'en'
  }, {
    name: 'हिंदी',
    value: 'hi'
  }];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControl.default, {
    sx: {
      m: 1,
      background: theme.primary.main,
      border: 'none',
      borderRadius: '10px',
      height: '36px'
    },
    size: "small",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
      value: activeLanguage,
      onChange: handleChange,
      displayEmpty: true,
      inputProps: {
        'aria-label': 'Without label'
      },
      sx: {
        color: theme.primary.dark,
        border: 'none',
        borderRadius: '10px',
        width: '85px',
        height: '36px'
      },
      children: (0, _lodash.map)(languages, function (lang) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
          value: lang === null || lang === void 0 ? void 0 : lang.value,
          children: lang === null || lang === void 0 ? void 0 : lang.name
        });
      })
    })
  });
};
var _default = exports.default = LanguagePicker;