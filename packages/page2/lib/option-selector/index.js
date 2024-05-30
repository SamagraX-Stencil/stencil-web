"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _stencilHooks = require("stencil-hooks");
var _rice = _interopRequireDefault(require("./assets/rice.jpeg"));
var _wheat = _interopRequireDefault(require("./assets/wheat.png"));
var _more = _interopRequireDefault(require("./assets/more.png"));
var _lodash = require("lodash");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable @typescript-eslint/no-explicit-any */
var Item = (0, _material.styled)(_material.Paper)(function (_ref) {
  var theme = _ref.theme;
  return _objectSpread(_objectSpread({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
  }, theme.typography.body2), {}, {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#363A44',
    borderRadius: '5px',
    position: 'relative'
  });
});
var OptionSelector = function OptionSelector() {
  var _theme$primary;
  var config = (0, _stencilHooks.useUiConfig)('component', 'optionSelectorPage');
  var theme = (0, _stencilHooks.useColorPalates)();
  var _React$useState = _react.default.useState([]),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    activeElements = _React$useState2[0],
    setActiveElements = _React$useState2[1];
  var vegetables = [{
    id: 1,
    label: 'गेहूँ',
    key: 'गेहूँ',
    image: _rice.default
  }, {
    id: 2,
    label: 'चावल',
    key: 'चावल',
    image: _wheat.default
  }, {
    id: 3,
    label: 'milk',
    key: 'milk',
    image: _rice.default
  }, {
    id: 4,
    label: 'आलू',
    key: 'आलू',
    image: _wheat.default
  }, {
    id: 5,
    label: 'गेहूँ',
    key: 'गेहूँ',
    image: _wheat.default
  }, {
    id: 6,
    label: 'चावल',
    key: 'आलू',
    image: _rice.default
  }, {
    id: 7,
    label: 'आलू',
    key: 'आलू',
    image: _wheat.default
  }, {
    id: 8,
    label: 'गेहूँ',
    key: 'आलू',
    image: _rice.default
  }, {
    id: 9,
    label: 'अन्य',
    key: 'more',
    image: _more.default
  }];
  var onItemClick = (0, _react.useCallback)(function (item) {
    return function () {
      var _config$optionSelectL;
      if (activeElements.length == ((_config$optionSelectL = config === null || config === void 0 ? void 0 : config.optionSelectLength) !== null && _config$optionSelectL !== void 0 ? _config$optionSelectL : 4) && !(activeElements !== null && activeElements !== void 0 && activeElements.includes(item === null || item === void 0 ? void 0 : item.id))) {
        var _config$optionSelectL2;
        alert("You can select only ".concat((_config$optionSelectL2 = config === null || config === void 0 ? void 0 : config.optionSelectLength) !== null && _config$optionSelectL2 !== void 0 ? _config$optionSelectL2 : 4, " items"));
        return;
      }
      setActiveElements(function (prev) {
        return prev !== null && prev !== void 0 && prev.includes(item === null || item === void 0 ? void 0 : item.id) ? prev === null || prev === void 0 ? void 0 : prev.filter(function (i) {
          return i !== (item === null || item === void 0 ? void 0 : item.id);
        }) : [].concat((0, _toConsumableArray2.default)(prev), [item === null || item === void 0 ? void 0 : item.id]);
      });
    };
  }, [activeElements, config === null || config === void 0 ? void 0 : config.optionSelectLength]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Container, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        "aria-label": "fingerprint",
        style: {
          borderRadius: '12px',
          background: '',
          border: '1px solid #E8ECF4'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ArrowBackIosNewRounded, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text-center w-100",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            lineHeight: '40px',
            fontSize: '24px',
            color: theme.primary.dark,
            fontWeight: 600
          },
          children: config === null || config === void 0 ? void 0 : config.topText
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "text-center mt-3",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: {
          color: '#51586B',
          fontSize: '18px'
        },
        children: config === null || config === void 0 ? void 0 : config.centerText
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '70vh'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          container: true,
          spacing: {
            xs: 2,
            md: 3
          },
          columns: {
            xs: 3,
            sm: 8,
            md: 12
          },
          style: {
            marginTop: '20px'
          },
          children: vegetables.map(function (_) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
              item: true,
              xs: 1,
              sm: 4,
              md: 4,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(Item, {
                onClick: onItemClick(_),
                style: {
                  border: (0, _lodash.includes)(activeElements, _ === null || _ === void 0 ? void 0 : _.id) ? "1px solid ".concat(theme.primary.dark) : '1px solid #B0B0B0'
                },
                children: [(0, _lodash.includes)(activeElements, _ === null || _ === void 0 ? void 0 : _.id) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  className: "rounded-circle position-absolute ",
                  style: {
                    width: '20px',
                    height: '20px',
                    top: '0px',
                    left: '75%'
                  },
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.CheckCircleRounded, {
                    color: "success"
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _ === null || _ === void 0 ? void 0 : _.image,
                  style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%'
                  }
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  style: {
                    lineHeight: '1rem'
                  },
                  className: "mt-2",
                  children: _ === null || _ === void 0 ? void 0 : _.label
                })]
              })
            });
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
            sx: {
              mt: 1
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              type: "submit",
              fullWidth: true,
              variant: "contained",
              disabled: activeElements.length < 4,
              endIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ArrowForward, {}),
              sx: {
                textTransform: 'none',
                mt: 3,
                mb: 4,
                p: 1,
                borderRadius: '10px',
                background: (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.dark,
                height: '60px'
              },
              children: config === null || config === void 0 ? void 0 : config.btnText
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Link, {
              component: "button",
              variant: "body2",
              onClick: function onClick() {},
              className: "mt-2",
              children: config === null || config === void 0 ? void 0 : config.helpingText1
            })]
          })
        })]
      })]
    })]
  });
};
var _default = exports.default = OptionSelector;