"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _main = _interopRequireDefault(require("./assets/main.png"));
var _cm = _interopRequireDefault(require("./assets/cm.png"));
var _bottom = _interopRequireDefault(require("./assets/bottom.png"));
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _stencilHooks = require("stencil-hooks");
var _stencilMolecule = require("stencil-molecule");
var _jsxRuntime = require("react/jsx-runtime");
var AkaiLaunch = function AkaiLaunch() {
  var config = (0, _stencilHooks.useUiConfig)('component', 'welcomePage');
  var theme = (0, _stencilHooks.useColorPalates)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Container, {
    className: "p-2",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '80vh'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      },
      className: "p-2",
      children: [(config === null || config === void 0 ? void 0 : config.showTopLeftLogo) && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: (config === null || config === void 0 ? void 0 : config.topLeftLogo) || _main.default,
        style: {
          height: (config === null || config === void 0 ? void 0 : config.topLeftLogoHeight) || '40px'
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilMolecule.LanguagePicker, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "text-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mt-4",
        children: (config === null || config === void 0 ? void 0 : config.showCenterImage) && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _cm.default,
          style: {
            width: (config === null || config === void 0 ? void 0 : config.centerImageWidth) || '148px',
            height: (config === null || config === void 0 ? void 0 : config.centerImageHeight) || '210px'
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          style: {
            fontSize: '22px',
            color: theme.primary.dark,
            lineHeight: '42px',
            fontWeight: '600'
          },
          children: config === null || config === void 0 ? void 0 : config.centerText
        })
      }), (config === null || config === void 0 ? void 0 : config.showCenterBottomImage) && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: (config === null || config === void 0 ? void 0 : config.centerBottomImage) || _bottom.default,
        style: {
          maxWidth: '80vw',
          height: config === null || config === void 0 ? void 0 : config.centerBottomImageHeight,
          width: config === null || config === void 0 ? void 0 : config.centerBottomImageWidth
        }
      })]
    }), (config === null || config === void 0 ? void 0 : config.showProceedBtn) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "text-center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        "aria-label": "fingerprint",
        style: {
          background: (config === null || config === void 0 ? void 0 : config.proceedBtnColor) || theme.primary.dark
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ArrowForward, {
          style: {
            color: 'white',
            height: '24px',
            width: '24px'
          }
        })
      })
    })]
  });
};
var _default = exports.default = AkaiLaunch;