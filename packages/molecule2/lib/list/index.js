"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _lodash = require("lodash");
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var List = exports.List = function List(_ref) {
  var _noItem$label;
  var items = _ref.items,
    label = _ref.label,
    noItem = _ref.noItem;
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    openItem = _React$useState2[0],
    setOpenItem = _React$useState2[1];
  var config = (0, _stencilHooks.useBotConfig)('component', 'historyPage');
  var handleClick = React.useCallback(function (id) {
    if (id === openItem) setOpenItem(null);else setOpenItem(id);
  }, [openItem]);
  var hasItems = React.useMemo(function () {
    return (items === null || items === void 0 ? void 0 : items.length) > 0;
  }, [items]);
  if (!hasItems) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_List.default, {
    sx: {
      width: '100%',
      bgcolor: 'background.paper'
    },
    component: "nav",
    "aria-labelledby": "nested-list-subheader",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItemButton, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemIcon, {
        children: noItem !== null && noItem !== void 0 && noItem.icon ? /*#__PURE__*/React.cloneElement(noItem === null || noItem === void 0 ? void 0 : noItem.icon) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ErrorOutline, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
        primary: (_noItem$label = noItem === null || noItem === void 0 ? void 0 : noItem.label) !== null && _noItem$label !== void 0 ? _noItem$label : 'Nothing available'
      })]
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_List.default, {
    sx: {
      width: '100%',
      bgcolor: 'background.paper'
    },
    component: "nav",
    "aria-labelledby": "nested-list-subheader",
    subheader: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListSubheader, {
        component: "div",
        children: label
      })
    }),
    children: (0, _lodash.map)(items, function (item) {
      var _item$secondaryAction;
      console.log({
        item: item
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItem, {
          secondaryAction: (_item$secondaryAction = item === null || item === void 0 ? void 0 : item.secondaryAction) !== null && _item$secondaryAction !== void 0 ? _item$secondaryAction : null,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItemButton, {
            onClick: function onClick(ev) {
              ev.stopPropagation();
              if (item !== null && item !== void 0 && item.items) {
                return handleClick(item === null || item === void 0 ? void 0 : item.id);
              }
              if (item !== null && item !== void 0 && item.onClick) return item === null || item === void 0 ? void 0 : item.onClick(item);
              return null;
            },
            children: [item.icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemIcon, {
              children: /*#__PURE__*/React.cloneElement(item.icon)
            }), item.avatar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
                alt: "Travis Howard",
                src: item.avatar
              })
            }), item.label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
              primary: item.label,
              secondary: /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
                children: (config === null || config === void 0 ? void 0 : config.showTimestamp) && (item === null || item === void 0 ? void 0 : item.secondaryLabel) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
                  sx: {
                    display: 'inline'
                  },
                  component: "span",
                  variant: "body2",
                  color: "text.primary",
                  children: item === null || item === void 0 ? void 0 : item.secondaryLabel
                })
              })
            }), (item === null || item === void 0 ? void 0 : item.items) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
              children: openItem === (item === null || item === void 0 ? void 0 : item.id) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ExpandLess, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ExpandMore, {})
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Collapse, {
          in: openItem === (item === null || item === void 0 ? void 0 : item.id),
          timeout: "auto",
          unmountOnExit: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_List.default, {
            component: "div",
            disablePadding: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItemButton, {
              sx: {
                pl: 8
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemIcon, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.StarBorder, {})
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                primary: "Starred"
              })]
            })
          })
        }), (item === null || item === void 0 ? void 0 : item.isDivider) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {})]
      });
    })
  });
};