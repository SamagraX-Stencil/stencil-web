import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { Box, Button, Container, Grid, IconButton, Link, Paper, styled } from '@mui/material';
import { ArrowBackIosNewRounded, ArrowForward, CheckCircleRounded } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import rice from './assets/rice.jpeg';
import wheat from './assets/wheat.png';
import more from './assets/more.png';
import { includes } from 'lodash';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Item = styled(Paper)(function (_ref) {
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
  var config = useUiConfig('component', 'optionSelectorPage');
  var theme = useColorPalates();
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeElements = _React$useState2[0],
    setActiveElements = _React$useState2[1];
  var vegetables = [{
    id: 1,
    label: 'गेहूँ',
    key: 'गेहूँ',
    image: rice
  }, {
    id: 2,
    label: 'चावल',
    key: 'चावल',
    image: wheat
  }, {
    id: 3,
    label: 'milk',
    key: 'milk',
    image: rice
  }, {
    id: 4,
    label: 'आलू',
    key: 'आलू',
    image: wheat
  }, {
    id: 5,
    label: 'गेहूँ',
    key: 'गेहूँ',
    image: wheat
  }, {
    id: 6,
    label: 'चावल',
    key: 'आलू',
    image: rice
  }, {
    id: 7,
    label: 'आलू',
    key: 'आलू',
    image: wheat
  }, {
    id: 8,
    label: 'गेहूँ',
    key: 'आलू',
    image: rice
  }, {
    id: 9,
    label: 'अन्य',
    key: 'more',
    image: more
  }];
  var onItemClick = useCallback(function (item) {
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
        }) : [].concat(_toConsumableArray(prev), [item === null || item === void 0 ? void 0 : item.id]);
      });
    };
  }, [activeElements, config === null || config === void 0 ? void 0 : config.optionSelectLength]);
  return /*#__PURE__*/_jsxs(Container, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "d-flex",
      children: [/*#__PURE__*/_jsx(IconButton, {
        "aria-label": "fingerprint",
        style: {
          borderRadius: '12px',
          background: '',
          border: '1px solid #E8ECF4'
        },
        children: /*#__PURE__*/_jsx(ArrowBackIosNewRounded, {})
      }), /*#__PURE__*/_jsx("div", {
        className: "text-center w-100",
        children: /*#__PURE__*/_jsx("p", {
          style: {
            lineHeight: '40px',
            fontSize: '24px',
            color: theme.primary.dark,
            fontWeight: 600
          },
          children: config === null || config === void 0 ? void 0 : config.topText
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "text-center mt-3",
      children: [/*#__PURE__*/_jsx("p", {
        style: {
          color: '#51586B',
          fontSize: '18px'
        },
        children: config === null || config === void 0 ? void 0 : config.centerText
      }), /*#__PURE__*/_jsxs("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '70vh'
        },
        children: [/*#__PURE__*/_jsx(Grid, {
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
            return /*#__PURE__*/_jsx(Grid, {
              item: true,
              xs: 1,
              sm: 4,
              md: 4,
              children: /*#__PURE__*/_jsxs(Item, {
                onClick: onItemClick(_),
                style: {
                  border: includes(activeElements, _ === null || _ === void 0 ? void 0 : _.id) ? "1px solid ".concat(theme.primary.dark) : '1px solid #B0B0B0'
                },
                children: [includes(activeElements, _ === null || _ === void 0 ? void 0 : _.id) && /*#__PURE__*/_jsx("div", {
                  className: "rounded-circle position-absolute ",
                  style: {
                    width: '20px',
                    height: '20px',
                    top: '0px',
                    left: '75%'
                  },
                  children: /*#__PURE__*/_jsx(CheckCircleRounded, {
                    color: "success"
                  })
                }), /*#__PURE__*/_jsx("img", {
                  src: _ === null || _ === void 0 ? void 0 : _.image,
                  style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%'
                  }
                }), /*#__PURE__*/_jsx("p", {
                  style: {
                    lineHeight: '1rem'
                  },
                  className: "mt-2",
                  children: _ === null || _ === void 0 ? void 0 : _.label
                })]
              })
            });
          })
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsxs(Box, {
            sx: {
              mt: 1
            },
            children: [/*#__PURE__*/_jsx(Button, {
              type: "submit",
              fullWidth: true,
              variant: "contained",
              disabled: activeElements.length < 4,
              endIcon: /*#__PURE__*/_jsx(ArrowForward, {}),
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
            }), /*#__PURE__*/_jsx(Link, {
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
export default OptionSelector;