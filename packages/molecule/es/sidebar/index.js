import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Logout, Feedback, Help, History, AccountCircle, ArrowBack, ChevronRight } from '@mui/icons-material';
import configObj from '@repo/configmanager';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var Sidebar = function Sidebar(_ref) {
  var isOpen = _ref.isOpen,
    onToggle = _ref.onToggle;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    config = _useState2[0],
    setConfig = _useState2[1];
  var _useState3 = useState('en'),
    _useState4 = _slicedToArray(_useState3, 2),
    activeLanguage = _useState4[0],
    setActiveLanguage = _useState4[1];
  useEffect(function () {
    if (configObj && configObj.component && configObj.component.sidebar) {
      setConfig(configObj.component.sidebar);
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
  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Drawer, {
      open: isOpen,
      onClose: onToggle,
      children: /*#__PURE__*/_jsx(Box, {
        sx: {
          width: 250
        },
        role: "presentation",
        children: config && /*#__PURE__*/_jsxs(List, {
          children: [config.showLangSwitcher && /*#__PURE__*/_jsx(ListItem, {
            disablePadding: true,
            children: /*#__PURE__*/_jsxs(ListItemButton, {
              onClick: handleItemClick,
              children: [/*#__PURE__*/_jsx(ListItemIcon, {
                children: /*#__PURE__*/_jsx(ArrowBack, {})
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%'
                },
                children: config.languages.map(function (lang, index) {
                  return /*#__PURE__*/_jsx("button", {
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
          }), config.showProfileIcon && /*#__PURE__*/_jsx(ListItem, {
            disablePadding: true,
            children: /*#__PURE__*/_jsxs(ListItemButton, {
              children: [/*#__PURE__*/_jsx(ListItemIcon, {
                children: /*#__PURE__*/_jsx(AccountCircle, {})
              }), /*#__PURE__*/_jsx(ListItemText, {
                primary: config.profileText
              })]
            })
          }), config.links.map(function (link, index) {
            return /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(ListItem, {
                disablePadding: true,
                sx: {
                  paddingTop: '10px',
                  paddingBottom: '10px'
                },
                children: /*#__PURE__*/_jsxs(ListItemButton, {
                  children: [/*#__PURE__*/_jsx(ListItemIcon, {
                    children: getIconComponent(link.icon)
                  }), /*#__PURE__*/_jsx(ListItemText, {
                    primary: link.label
                  }), /*#__PURE__*/_jsx(ChevronRight, {})]
                })
              }), /*#__PURE__*/_jsx(Divider, {})]
            }, index);
          }), config.showLogoutButton && /*#__PURE__*/_jsx(ListItem, {
            disablePadding: true,
            children: /*#__PURE__*/_jsxs(ListItemButton, {
              children: [/*#__PURE__*/_jsx(ListItemIcon, {
                children: /*#__PURE__*/_jsx(Logout, {})
              }), /*#__PURE__*/_jsx(ListItemText, {
                primary: config.logoutButtonLabel
              }), /*#__PURE__*/_jsx(ChevronRight, {})]
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
      return /*#__PURE__*/_jsx(History, {});
    case 'HelpIcon':
      return /*#__PURE__*/_jsx(Help, {});
    case 'FeedbackIcon':
      return /*#__PURE__*/_jsx(Feedback, {});
    default:
      return null;
  }
};
export default Sidebar;