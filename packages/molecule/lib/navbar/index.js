"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));
var _Toolbar = _interopRequireDefault(require("@mui/material/Toolbar"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _iconsMaterial = require("@mui/icons-material");
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _index = require("../sidebar/index");
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import ThemePicker from '../../components/theme-picker'

var Navbar = function Navbar() {
  var config = (0, _hooks.useUiConfig)('component', 'navbar');
  var theme = (0, _hooks.useColorPalates)();
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isSidebarOpen = _useState2[0],
    setSidebarOpen = _useState2[1];
  var toggleSidebar = function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_AppBar.default, {
      position: "static",
      sx: {
        background: theme.primary.dark
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Toolbar.default, {
        style: {
          display: 'flex-start',
          justifyContent: 'space-between'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          },
          children: [config.showHamburgerMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
            size: "large",
            edge: "start",
            color: "primary",
            "aria-label": "open drawer",
            sx: {
              mr: 2
            },
            onClick: toggleSidebar,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Menu, {})
          }), config.showHomeIcon && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
              color: "primary",
              size: "large",
              edge: "start",
              "aria-label": "home",
              style: {
                fontSize: '2rem',
                height: '48px'
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Home, {})
            }), config.leftHomeIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: config.leftHomeIcon.src,
              alt: "Left Home Icon ".concat(config.leftHomeIcon.id),
              style: {
                maxHeight: '48px'
              }
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
          },
          children: [config.logos.showCenterLogos && config.logos.centerLogoIcons.map(function (logo) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: logo.src,
              alt: "Logo ".concat(logo.id),
              style: {
                maxHeight: '48px'
              }
            }, logo.id);
          }), config.brandName && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            variant: "h6",
            color: "inherit",
            sx: {
              marginTop: 1,
              fontSize: '1.5rem'
            },
            children: config.brandName
          })]
        }), config.logos.showRightLogos && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: config.logos.rightLogoIcons.map(function (logo) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: logo.src,
              alt: "Right Logo ".concat(logo.id),
              style: {
                maxHeight: '48px'
              }
            }, logo.id);
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Sidebar, {
      isOpen: isSidebarOpen,
      onToggle: toggleSidebar
    })]
  });
};
var _default = exports.default = Navbar;