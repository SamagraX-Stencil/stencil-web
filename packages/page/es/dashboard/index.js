import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import sun from './assets/sun.png';
import book from './assets/book.png';
import chat from './assets/chat.png';
import pest from './assets/pest.png';
import cloud from './assets/cloud.png';
import { LocationOnRounded } from '@mui/icons-material';
// import sunnyImage from './assets/Sunny.svg'
// import cloudyImage from './assets/Night.svg'
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Badge, BottomNavigation, BottomNavigationAction, Button, Chip, Grid, Paper, Typography, styled } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import { useUiConfig, useColorPalates } from '@repo/hooks';
import WeatherStatus from './model';
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
var Dashboard = function Dashboard() {
  var _theme$primary;
  var config = useUiConfig('component', 'dashboard');
  console.log({
    config: config
  });
  var theme = useColorPalates();
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
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
    image: (config === null || config === void 0 ? void 0 : config.card1Image) || cloud
  }, {
    id: 2,
    label: (config === null || config === void 0 ? void 0 : config.card2Title) || 'योजनाओं की जानकारी',
    key: config === null || config === void 0 ? void 0 : config.card2Title,
    image: (config === null || config === void 0 ? void 0 : config.card2Image) || book
  }, {
    id: 3,
    label: (config === null || config === void 0 ? void 0 : config.card3Title) || 'कीट एवं रोग',
    key: config === null || config === void 0 ? void 0 : config.card3Title,
    image: (config === null || config === void 0 ? void 0 : config.card3Image) || pest
  }, {
    id: 3,
    label: (config === null || config === void 0 ? void 0 : config.card4Title) || 'अन्य सूचना',
    key: config === null || config === void 0 ? void 0 : config.card4Title,
    image: (config === null || config === void 0 ? void 0 : config.card4Image) || chat
  }];
  return /*#__PURE__*/_jsxs("div", {
    style: {
      height: 'auto',
      maxHeight: '80vh',
      overflowY: 'scroll'
    },
    children: [/*#__PURE__*/_jsx(WeatherStatus, {}), /*#__PURE__*/_jsxs("div", {
      style: {
        background: "linear-gradient(90deg, #26C3E4 20%, #3A7BD5 100%)",
        // background: `url(${sunnyImage})`, // Set background image

        color: 'white',
        borderRadius: '5px'
      },
      className: "p-2",
      children: [/*#__PURE__*/_jsx("div", {
        className: "mb-1 mt-4",
        children: /*#__PURE__*/_jsxs("div", {
          className: "text-right",
          children: [/*#__PURE__*/_jsx("img", {
            src: sun.src,
            style: {
              height: '30px',
              width: '30px'
            }
          }), /*#__PURE__*/_jsxs("div", {
            style: {
              display: 'flex',
              alignItems: 'flex-end'
            },
            className: "my-4 mr-2",
            children: [/*#__PURE__*/_jsx("div", {
              style: {
                width: '30%'
              },
              children: /*#__PURE__*/_jsx("h1", {
                style: {
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: 600
                },
                children: "27\xB0C"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "text-right",
              style: {
                width: '70%',
                fontSize: '40px',
                fontWeight: 600
              },
              children: [/*#__PURE__*/_jsx("h3", {
                children: "\u0938\u094D\u092A\u0937\u094D\u091F"
              }), /*#__PURE__*/_jsxs("p", {
                children: [/*#__PURE__*/_jsx(LocationOnRounded, {
                  style: {
                    fontSize: '18px',
                    fontWeight: 400
                  }
                }), " \u092C\u093F\u0936\u0928\u092A\u0941\u0930 \u0938\u0947\u0915\u094D\u091F\u0930 58, \u0928\u094B\u090F\u0921\u093E"]
              })]
            })]
          })]
        })
      }), /*#__PURE__*/_jsx("div", {
        style: {
          background: '#fff',
          height: '50%',
          borderRadius: '5px'
        },
        className: "p-2 text-center",
        children: /*#__PURE__*/_jsxs("div", {
          style: {
            width: '80%'
          },
          className: "mx-auto px-8 py-2 ",
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
            children: map(chips, function (chip) {
              var _chip$color;
              return /*#__PURE__*/_jsx(Grid, {
                item: true,
                xs: 1,
                sm: 4,
                md: 4,
                children: /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx(Chip, {
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
                  }), /*#__PURE__*/_jsx("p", {
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
          }), /*#__PURE__*/_jsx(Button, {
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
            endIcon: /*#__PURE__*/_jsx(ArrowForwardRoundedIcon, {}),
            component: Link,
            to: "/weather-page",
            children: "\u091C\u093E\u0928\u093F\u090F \u092E\u094C\u0938\u092E \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902"
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-3",
      children: [/*#__PURE__*/_jsxs("div", {
        style: {
          width: '95%'
        },
        className: "mx-auto",
        children: [/*#__PURE__*/_jsx("p", {
          style: {
            color: 'black',
            background: theme.primary.light,
            borderRadius: '5px'
          },
          className: "py-1 px-2",
          children: config === null || config === void 0 ? void 0 : config.centerText
        }), /*#__PURE__*/_jsx(Grid, {
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
            return /*#__PURE__*/_jsx(Grid, {
              item: true,
              xs: 1,
              sm: 4,
              md: 4,
              children: /*#__PURE__*/_jsxs(Item, {
                style: {
                  border: '1px solid #B0B0B0',
                  borderRadius: '16px'
                },
                children: [/*#__PURE__*/_jsx("img", {
                  src: _ === null || _ === void 0 ? void 0 : _.image.src,
                  style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%'
                  }
                }), /*#__PURE__*/_jsx("p", {
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
        }), /*#__PURE__*/_jsx("div", {
          className: "mt-4 text-center",
          children: /*#__PURE__*/_jsx("p", {
            style: {
              color: '##6C758B',
              fontSize: '14px',
              textAlign: 'start'
            },
            children: config === null || config === void 0 ? void 0 : config.bottomText
          })
        })]
      }), /*#__PURE__*/_jsx(Paper, {
        sx: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        },
        elevation: 3,
        children: /*#__PURE__*/_jsxs(BottomNavigation, {
          showLabels: true,
          value: value,
          onChange: function onChange(event, newValue) {
            console.log(event);
            setValue(newValue);
          },
          children: [/*#__PURE__*/_jsx(BottomNavigationAction, {
            label: "\u0939\u094B\u092E ",
            icon: /*#__PURE__*/_jsx(HomeRoundedIcon, {})
          }), /*#__PURE__*/_jsx(Button, {
            className: "my-auto",
            sx: {
              height: '30px',
              borderRadius: '40px',
              background: theme.primary.dark,
              color: 'white'
            },
            size: "small",
            variant: "contained",
            startIcon: /*#__PURE__*/_jsx(KeyboardVoiceRoundedIcon, {}),
            children: "\u092C\u094B\u0932 \u0915\u0947 \u092A\u0942\u091B\u0947"
          }), /*#__PURE__*/_jsx(BottomNavigationAction, {
            label: "\u0905\u0932\u0930\u094D\u091F\u0938",
            icon: /*#__PURE__*/_jsx(Badge, {
              badgeContent: "3",
              color: "error",
              children: /*#__PURE__*/_jsx(Typography, {
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
export default Dashboard;