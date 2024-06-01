"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _farmer = _interopRequireDefault(require("./assets/farmer.jpeg"));
var _user = _interopRequireDefault(require("./assets/user.svg"));
var _farmerOp = _interopRequireDefault(require("./assets/farmer-op.svg"));
var _hooks = require("@repo/hooks");
var _molecules = require("@repo/molecules");
var _jsxRuntime = require("react/jsx-runtime");
var UserTypeSelector = function UserTypeSelector() {
  var theme = (0, _hooks.useColorPalates)();
  var config = (0, _hooks.useUiConfig)('component', 'userTypeSelectorPage');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#333',
      margin: 'auto',
      backgroundColor: '#fff',
      minHeight: '80vh',
      position: 'relative',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: 'absolute',
        top: '5px',
        right: '8px'
        // left: 'calc(100% - 85px - 10px)',
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.LanguagePicker, {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: 'absolute',
        top: '50%',
        // Adjust this value to move the container up or down
        width: '100%',
        bottom: '0',
        backgroundColor: '#fff',
        borderTopLeftRadius: '30% 5%',
        // Adjust the curvature
        borderTopRightRadius: '30% 5%',
        overflow: 'hidden' // Ensures content aligns with the curved edges
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "p-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            marginTop: '24px',
            fontSize: '24px',
            fontWeight: 400,
            color: '#51586B'
          },
          children: (config === null || config === void 0 ? void 0 : config.title) || 'कृपया बताएं आप कौन हैं?'
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '32px',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              backgroundColor: theme.primary.dark,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '16px',
              padding: '16px',
              width: '40%',
              textAlign: 'center'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: (config === null || config === void 0 ? void 0 : config.user1Image) || _farmerOp.default.src,
              alt: "Farmer",
              style: {
                maxWidth: '100%',
                height: 'auto'
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              style: {
                color: 'white'
              },
              children: [(config === null || config === void 0 ? void 0 : config.user1Text) || 'किसान', " "]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: "\u092F\u093E"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              backgroundColor: ' #F4F4F4',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '16px',
              padding: '16px',
              width: '40%',
              textAlign: 'center'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: (config === null || config === void 0 ? void 0 : config.user2Image) || _user.default.src,
              alt: "Worker",
              style: {
                maxWidth: '100%',
                height: 'auto'
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: (config === null || config === void 0 ? void 0 : config.user1Text) || 'विस्तार कार्यकर्ता'
            })]
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("main", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: (config === null || config === void 0 ? void 0 : config.backgroundImage) || _farmer.default.src,
          alt: "Farmer with vegetables",
          style: {
            maxWidth: '100%',
            height: 'auto'
          }
        })
      })
    })]
  });
};
var _default = exports.default = UserTypeSelector;