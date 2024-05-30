"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _sun = _interopRequireDefault(require("./assets/sun.png"));
var _book = _interopRequireDefault(require("./assets/book.png"));
var _chat = _interopRequireDefault(require("./assets/chat.png"));
var _pest = _interopRequireDefault(require("./assets/pest.png"));
var _cloud = _interopRequireDefault(require("./assets/cloud.png"));
var _iconsMaterial = require("@mui/icons-material");
var _reactRouterDom = require("react-router-dom");
var _lodash = require("lodash");
var _material = require("@mui/material");
var _ArrowForwardRounded = _interopRequireDefault(require("@mui/icons-material/ArrowForwardRounded"));
var _HomeRounded = _interopRequireDefault(require("@mui/icons-material/HomeRounded"));
var _KeyboardVoiceRounded = _interopRequireDefault(require("@mui/icons-material/KeyboardVoiceRounded"));
var _stencilHooks = require("stencil-hooks");
var _model = _interopRequireDefault(require("./model"));
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // import sunnyImage from './assets/Sunny.svg'
// import cloudyImage from './assets/Night.svg'
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
var Dashboard = function Dashboard() {
  var _theme$primary;
  var config = (0, _stencilHooks.useUiConfig)('component', 'dashboard');
  console.log({
    config: config
  });
  var theme = (0, _stencilHooks.useColorPalates)();
  var _React$useState = _react.default.useState(0),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var chips = [{
    id: 1,
    heading: 'हवा की दिशा',
    label: 'उत्तर पश्चिम'
  }, {
    id: 2,
    heading: 'हवा की गति',
    label: 'धीमी',
    color: '#101860'
  }, {
    id: 3,
    heading: 'नमी',
    label: 'ज़्यादा',
    color: '#4CC3CB'
  }];
  var options = [{
    id: 1,
    label: (config === null || config === void 0 ? void 0 : config.card1Title) || 'मौसम की जानकारी',
    key: config === null || config === void 0 ? void 0 : config.card1Title,
    image: (config === null || config === void 0 ? void 0 : config.card1Image) || _cloud.default
  }, {
    id: 2,
    label: (config === null || config === void 0 ? void 0 : config.card2Title) || 'योजनाओं की जानकारी',
    key: config === null || config === void 0 ? void 0 : config.card2Title,
    image: (config === null || config === void 0 ? void 0 : config.card2Image) || _book.default
  }, {
    id: 3,
    label: (config === null || config === void 0 ? void 0 : config.card3Title) || 'कीट एवं रोग',
    key: config === null || config === void 0 ? void 0 : config.card3Title,
    image: (config === null || config === void 0 ? void 0 : config.card3Image) || _pest.default
  }, {
    id: 3,
    label: (config === null || config === void 0 ? void 0 : config.card4Title) || 'अन्य सूचना',
    key: config === null || config === void 0 ? void 0 : config.card4Title,
    image: (config === null || config === void 0 ? void 0 : config.card4Image) || _chat.default
  }];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      height: 'auto',
      maxHeight: '80vh',
      overflowY: 'scroll'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_model.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: "linear-gradient(90deg, #26C3E4 20%, #3A7BD5 100%)",
        // background: `url(${sunnyImage})`, // Set background image

        color: 'white',
        borderRadius: '5px'
      },
      className: "p-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mb-1 mt-4",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "text-right",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: _sun.default,
            style: {
              height: '30px',
              width: '30px'
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: 'flex',
              alignItems: 'flex-end'
            },
            className: "my-4 mr-2",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: '30%'
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
                style: {
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: 600
                },
                children: "27\xB0C"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "text-right",
              style: {
                width: '70%',
                fontSize: '40px',
                fontWeight: 600
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
                children: "\u0938\u094D\u092A\u0937\u094D\u091F"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.LocationOnRounded, {
                  style: {
                    fontSize: '18px',
                    fontWeight: 400
                  }
                }), ' ', "\u092C\u093F\u0936\u0928\u092A\u0941\u0930 \u0938\u0947\u0915\u094D\u091F\u0930 58, \u0928\u094B\u090F\u0921\u093E"]
              })]
            })]
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          background: '#fff',
          height: '50%',
          borderRadius: '5px'
        },
        className: "p-2 text-center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            width: '80%'
          },
          className: "mx-auto px-8 py-2 ",
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
            children: (0, _lodash.map)(chips, function (chip) {
              var _chip$color;
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
                item: true,
                xs: 1,
                sm: 4,
                md: 4,
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Chip, {
                    label: chip === null || chip === void 0 ? void 0 : chip.label,
                    size: "medium",
                    className: "",
                    sx: {
                      fontSize: '16px',
                      fontWeight: '500',
                      minWidth: '70px',
                      background: (_chip$color = chip === null || chip === void 0 ? void 0 : chip.color) !== null && _chip$color !== void 0 ? _chip$color : null,
                      color: chip !== null && chip !== void 0 && chip.color ? 'white' : 'black'
                    }
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                    className: "mt-3",
                    style: {
                      minWidth: '70px',
                      background: 'white',
                      color: 'black'
                    },
                    children: chip === null || chip === void 0 ? void 0 : chip.heading
                  })]
                })
              });
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            fullWidth: true,
            variant: "contained",
            style: {
              marginTop: '20px',
              backgroundColor: '#EDEDF1',
              color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.dark,
              fontSize: '18px',
              fontWeight: 600
            },
            className: "py-2",
            endIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowForwardRounded.default, {}),
            component: _reactRouterDom.Link,
            to: "/weather-page",
            children: "\u091C\u093E\u0928\u093F\u090F \u092E\u094C\u0938\u092E \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902"
          })]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "p-3",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          width: '95%'
        },
        className: "mx-auto",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            color: 'black',
            background: theme.primary.light,
            borderRadius: '5px'
          },
          className: "py-1 px-2",
          children: config === null || config === void 0 ? void 0 : config.centerText
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          container: true,
          spacing: {
            xs: 2,
            md: 3
          },
          columns: {
            xs: 2,
            sm: 8,
            md: 12
          },
          style: {
            marginTop: '20px'
          },
          children: options.map(function (_) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
              item: true,
              xs: 1,
              sm: 4,
              md: 4,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(Item, {
                style: {
                  border: '1px solid #B0B0B0',
                  borderRadius: '16px'
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _ === null || _ === void 0 ? void 0 : _.image,
                  style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%'
                  }
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  style: {
                    fontSize: '20px',
                    color: 'black'
                  },
                  className: "mt-2",
                  children: _ === null || _ === void 0 ? void 0 : _.label
                })]
              })
            });
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "mt-4 text-center",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            style: {
              color: '##6C758B',
              fontSize: '14px',
              textAlign: 'start'
            },
            children: config === null || config === void 0 ? void 0 : config.bottomText
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Paper, {
        sx: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        },
        elevation: 3,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.BottomNavigation, {
          showLabels: true,
          value: value,
          onChange: function onChange(event, newValue) {
            console.log(event);
            setValue(newValue);
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.BottomNavigationAction, {
            label: "\u0939\u094B\u092E ",
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HomeRounded.default, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            className: "my-auto",
            sx: {
              height: '30px',
              borderRadius: '40px',
              background: theme.primary.dark,
              color: 'white'
            },
            size: "small",
            variant: "contained",
            startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardVoiceRounded.default, {}),
            children: "\u092C\u094B\u0932 \u0915\u0947 \u092A\u0942\u091B\u0947"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.BottomNavigationAction, {
            label: "\u0905\u0932\u0930\u094D\u091F\u0938",
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Badge, {
              badgeContent: "3",
              color: "error",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
                fontSize: "xl",
                children: "\uD83D\uDD14"
              })
            })
          })]
        })
      })]
    })]
  });
};
var _default = exports.default = Dashboard;