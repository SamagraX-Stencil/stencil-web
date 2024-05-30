"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _sun = _interopRequireDefault(require("./assets/sun.png"));
var _crop = _interopRequireDefault(require("./assets/crop1.png"));
var _rainingCloud = _interopRequireDefault(require("./assets/rainingCloud.png"));
var _heavyRain = _interopRequireDefault(require("./assets/heavyRain.png"));
var _sunRainCloud = _interopRequireDefault(require("./assets/sunRainCloud.png"));
var _thunderCloud = _interopRequireDefault(require("./assets/thunderCloud.png"));
var _iconsMaterial = require("@mui/icons-material");
var _lodash = require("lodash");
var _material = require("@mui/material");
var _stencilHooks = require("stencil-hooks");
var _cropInfoModel = _interopRequireDefault(require("./crop-info-model"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var WheatherPage = function WheatherPage() {
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isModelOpen = _useState2[0],
    setIsModelOpen = _useState2[1];
  var handleOpenModal = function handleOpenModal() {
    setIsModelOpen(true);
  };
  var config = {
    allowOverride: false,
    weatherCardText: 'जानिए मौसम के बारे में',
    centerText: 'मुझसे कुछ भी पूछें',
    card1Title: 'मौसम की जानकारी',
    card1Image: null,
    card2Title: 'योजनाओं की जानकारी',
    card2Image: null,
    card3Title: 'कीट एवं रोग',
    card3Image: null,
    card4Title: 'अन्य सूचना',
    card4Image: null,
    bottomText: 'आमा कृषी चैटबॉट गलतियाँ कर सकता है। महत्वपूर्ण जानकारी की जाँच करने पर विचार करें. हमारी शर्तें और गोपनीयता नीति पढ़ें।'
  };
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
  var upComingWhetherData = [{
    id: 1,
    day: 'Sun',
    temp: '21°C',
    img: _heavyRain.default
  }, {
    id: 2,
    day: 'Mon',
    temp: '21°C',
    img: _thunderCloud.default
  }, {
    id: 3,
    day: 'Tue',
    temp: '21°C',
    img: _sunRainCloud.default
  }, {
    id: 4,
    day: 'Thur',
    temp: '21°C',
    img: _rainingCloud.default
  }];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      height: 'auto',
      maxHeight: '90vh',
      overflowY: 'scroll'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: "linear-gradient(90deg, #26C3E4 20%, #3A7BD5 100%)",
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
            children: [' ', /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
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
            width: '80%',
            marginTop: '12px'
          },
          className: "mx-auto ",
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
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
                item: true,
                xs: 1,
                sm: 4,
                md: 4,
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
                }), ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  className: "mt-3",
                  style: {
                    minWidth: '70px',
                    background: 'white',
                    color: 'black'
                  },
                  children: chip === null || chip === void 0 ? void 0 : chip.heading
                })]
              });
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              marginTop: '30px'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                style: {
                  width: '20%',
                  fontSize: '16px',
                  fontWeight: 400
                },
                children: "\u0905\u0917\u0932\u0947 4 \u0926\u093F\u0928\u094B\u0902 \u0915\u093E \u092A\u0942\u0930\u094D\u0935\u093E\u0928\u0941\u092E\u093E\u0928"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  flex: '1'
                },
                children: upComingWhetherData.map(function (ele, index) {
                  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flex: '1'
                    },
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                        style: {
                          fontSize: '14px',
                          fontWeight: 400
                        },
                        children: ele.day
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                        src: ele.img,
                        alt: "",
                        style: {
                          margin: '8px 0'
                        },
                        height: '32px'
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                        style: {
                          fontSize: '16px',
                          fontWeight: 400
                        },
                        children: ele.temp
                      })]
                    }), index !== 3 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      style: {
                        width: '1px',
                        height: '80%',
                        backgroundColor: '#ccc',
                        margin: '0 5px'
                      }
                    })]
                  }, ele.id);
                })
              })]
            })
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
            color: '#51586B',
            background: theme.primary.light,
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 600
          },
          className: "p-2",
          children: "\u0906\u091C \u0915\u0940 \u092B\u093C\u0938\u0932 \u0938\u0932\u093E\u0939"
        }), isModelOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_cropInfoModel.default, {
          isOpen: isModelOpen,
          onClose: function onClose() {
            return setIsModelOpen(false);
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
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
          children: [1, 2, 3, 4, 5, 6].map(function () {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
              item: true,
              xs: 1,
              sm: 4,
              md: 4,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(Item, {
                style: {
                  border: '1px solid #B0B0B0'
                },
                onClick: handleOpenModal,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _crop.default,
                  style: {
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%'
                  }
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  style: {
                    lineHeight: '1rem'
                  },
                  className: "mt-2",
                  children: "\u0917\u0947\u0939\u0942\u0901"
                })]
              })
            });
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
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.HomeRounded, {})
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
            startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.KeyboardVoiceRounded, {}),
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
var _default = exports.default = WheatherPage;