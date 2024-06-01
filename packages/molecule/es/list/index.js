import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import MuiList from '@mui/material/List';
import { ListItemIcon, ListItemText, ListItemButton, ListSubheader, Collapse } from '@mui/material';
import { ExpandLess, StarBorder, ExpandMore, ErrorOutline } from '@mui/icons-material';
import { map } from 'lodash';
import { Avatar, Divider, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { useBotConfig } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export var List = function List(_ref) {
  var _noItem$label;
  var items = _ref.items,
    label = _ref.label,
    noItem = _ref.noItem;
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    openItem = _React$useState2[0],
    setOpenItem = _React$useState2[1];
  var config = useBotConfig('component', 'historyPage');
  var handleClick = React.useCallback(function (id) {
    if (id === openItem) setOpenItem(null);else setOpenItem(id);
  }, [openItem]);
  var hasItems = React.useMemo(function () {
    return (items === null || items === void 0 ? void 0 : items.length) > 0;
  }, [items]);
  if (!hasItems) return /*#__PURE__*/_jsx(MuiList, {
    sx: {
      width: '100%',
      bgcolor: 'background.paper'
    },
    component: "nav",
    "aria-labelledby": "nested-list-subheader",
    children: /*#__PURE__*/_jsxs(ListItemButton, {
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: noItem !== null && noItem !== void 0 && noItem.icon ? /*#__PURE__*/React.cloneElement(noItem === null || noItem === void 0 ? void 0 : noItem.icon) : /*#__PURE__*/_jsx(ErrorOutline, {})
      }), /*#__PURE__*/_jsx(ListItemText, {
        primary: (_noItem$label = noItem === null || noItem === void 0 ? void 0 : noItem.label) !== null && _noItem$label !== void 0 ? _noItem$label : 'Nothing available'
      })]
    })
  });
  return /*#__PURE__*/_jsx(MuiList, {
    sx: {
      width: '100%',
      bgcolor: 'background.paper'
    },
    component: "nav",
    "aria-labelledby": "nested-list-subheader",
    subheader: /*#__PURE__*/_jsx(_Fragment, {
      children: label && /*#__PURE__*/_jsx(ListSubheader, {
        component: "div",
        children: label
      })
    }),
    children: map(items, function (item) {
      var _item$secondaryAction;
      console.log({
        item: item
      });
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(ListItem, {
          secondaryAction: (_item$secondaryAction = item === null || item === void 0 ? void 0 : item.secondaryAction) !== null && _item$secondaryAction !== void 0 ? _item$secondaryAction : null,
          children: /*#__PURE__*/_jsxs(ListItemButton, {
            onClick: function onClick(ev) {
              ev.stopPropagation();
              if (item !== null && item !== void 0 && item.items) {
                return handleClick(item === null || item === void 0 ? void 0 : item.id);
              }
              if (item !== null && item !== void 0 && item.onClick) return item === null || item === void 0 ? void 0 : item.onClick(item);
              return null;
            },
            children: [item.icon && /*#__PURE__*/_jsx(ListItemIcon, {
              children: /*#__PURE__*/React.cloneElement(item.icon)
            }), item.avatar && /*#__PURE__*/_jsx(ListItemAvatar, {
              children: /*#__PURE__*/_jsx(Avatar, {
                alt: "Travis Howard",
                src: item.avatar
              })
            }), item.label && /*#__PURE__*/_jsx(ListItemText, {
              primary: item.label,
              secondary: /*#__PURE__*/_jsx(React.Fragment, {
                children: (config === null || config === void 0 ? void 0 : config.showTimestamp) && (item === null || item === void 0 ? void 0 : item.secondaryLabel) && /*#__PURE__*/_jsx(Typography, {
                  sx: {
                    display: 'inline'
                  },
                  component: "span",
                  variant: "body2",
                  color: "text.primary",
                  children: item === null || item === void 0 ? void 0 : item.secondaryLabel
                })
              })
            }), (item === null || item === void 0 ? void 0 : item.items) && /*#__PURE__*/_jsx(_Fragment, {
              children: openItem === (item === null || item === void 0 ? void 0 : item.id) ? /*#__PURE__*/_jsx(ExpandLess, {}) : /*#__PURE__*/_jsx(ExpandMore, {})
            })]
          })
        }), /*#__PURE__*/_jsx(Collapse, {
          in: openItem === (item === null || item === void 0 ? void 0 : item.id),
          timeout: "auto",
          unmountOnExit: true,
          children: /*#__PURE__*/_jsx(MuiList, {
            component: "div",
            disablePadding: true,
            children: /*#__PURE__*/_jsxs(ListItemButton, {
              sx: {
                pl: 8
              },
              children: [/*#__PURE__*/_jsx(ListItemIcon, {
                children: /*#__PURE__*/_jsx(StarBorder, {})
              }), /*#__PURE__*/_jsx(ListItemText, {
                primary: "Starred"
              })]
            })
          })
        }), (item === null || item === void 0 ? void 0 : item.isDivider) && /*#__PURE__*/_jsx(Divider, {})]
      });
    })
  });
};