"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Sidebar = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Drawer = _interopRequireDefault(require("@mui/material/Drawer"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));
var _ListItemButton = _interopRequireDefault(require("@mui/material/ListItemButton"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _iconsMaterial = require("@mui/icons-material");
var _configmanager = _interopRequireDefault(require("@repo/configmanager"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Sidebar = exports.Sidebar = function Sidebar(_ref) {
  var isOpen = _ref.isOpen,
    onToggle = _ref.onToggle;
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    config = _useState2[0],
    setConfig = _useState2[1];
  var _useState3 = (0, _react.useState)('en'),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    activeLanguage = _useState4[0],
    setActiveLanguage = _useState4[1];
  (0, _react.useEffect)(function () {
    if (_configmanager.default && _configmanager.default.component && _configmanager.default.component.sidebar) {
      setConfig(_configmanager.default.component.sidebar);
    }
  }, []);
  var handleLanguageClick = function handleLanguageClick(langCode) {
    setActiveLanguage(langCode);
    onToggle();
  };
  // useEffect(() => {
  //   console.log(activeLanguage, 'ankit')
  //   setLocale(activeLanguage)
  // }, [activeLanguage])

  var handleItemClick = function handleItemClick() {
    onToggle();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Drawer.default, {
      open: isOpen,
      onClose: onToggle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        sx: {
          width: 250
        },
        role: "presentation",
        children: config && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_List.default, {
          children: [config.showLangSwitcher && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, {
            disablePadding: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItemButton.default, {
              onClick: handleItemClick,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ArrowBack, {})
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%'
                },
                children: config.languages.map(function (lang, index) {
                  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                    id: lang.code,
                    className: "Sidemenu_button ".concat(lang.code === activeLanguage ? 'active' : ''),
                    style: {
                      borderTopLeftRadius: index === 0 ? '10px' : '0',
                      borderBottomLeftRadius: index === 0 ? '10px' : '0',
                      borderTopRightRadius: index === config.languages.length - 1 ? '10px' : '0',
                      borderBottomRightRadius: index === config.languages.length - 1 ? '10px' : '0',
                      backgroundColor: lang.code === activeLanguage ? '#00FF00' : '#FFFFFF',
                      border: '1px solid #000',
                      width: '60px',
                      height: '30px',
                      padding: '5px'
                    },
                    onClick: function onClick() {
                      return handleLanguageClick(lang.code);
                    },
                    children: lang.label
                  }, index);
                })
              })]
            })
          }), config.showProfileIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, {
            disablePadding: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItemButton.default, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.AccountCircle, {})
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
                primary: config.profileText
              })]
            })
          }), config.links.map(function (link, index) {
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, {
                disablePadding: true,
                sx: {
                  paddingTop: '10px',
                  paddingBottom: '10px'
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItemButton.default, {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
                    children: getIconComponent(link.icon)
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
                    primary: link.label
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronRight, {})]
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Divider.default, {})]
            }, index);
          }), config.showLogoutButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, {
            disablePadding: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItemButton.default, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Logout, {})
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
                primary: config.logoutButtonLabel
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronRight, {})]
            })
          })]
        })
      })
    })
  });
};
var getIconComponent = function getIconComponent(iconName) {
  switch (iconName) {
    case 'HistoryIcon':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.History, {});
    case 'HelpIcon':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Help, {});
    case 'FeedbackIcon':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Feedback, {});
    default:
      return null;
  }
};
var _default = exports.default = Sidebar;