import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Home, Menu } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { Sidebar } from '../sidebar/index';
// import ThemePicker from '../../components/theme-picker'
import { useColorPalates, useUiConfig } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var Navbar = function Navbar() {
  var config = useUiConfig('component', 'navbar');
  var theme = useColorPalates();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSidebarOpen = _useState2[0],
    setSidebarOpen = _useState2[1];
  var toggleSidebar = function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(AppBar, {
      position: "static",
      sx: {
        background: theme.primary.dark
      },
      children: /*#__PURE__*/_jsxs(Toolbar, {
        style: {
          display: 'flex-start',
          justifyContent: 'space-between'
        },
        children: [/*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          },
          children: [config.showHamburgerMenu && /*#__PURE__*/_jsx(IconButton, {
            size: "large",
            edge: "start",
            color: "primary",
            "aria-label": "open drawer",
            sx: {
              mr: 2
            },
            onClick: toggleSidebar,
            children: /*#__PURE__*/_jsx(Menu, {})
          }), config.showHomeIcon && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(IconButton, {
              color: "primary",
              size: "large",
              edge: "start",
              "aria-label": "home",
              style: {
                fontSize: '2rem',
                height: '48px'
              },
              children: /*#__PURE__*/_jsx(Home, {})
            }), config.leftHomeIcon && /*#__PURE__*/_jsx("img", {
              src: config.leftHomeIcon.src,
              alt: "Left Home Icon ".concat(config.leftHomeIcon.id),
              style: {
                maxHeight: '48px'
              }
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
          },
          children: [config.logos.showCenterLogos && config.logos.centerLogoIcons.map(function (logo) {
            return /*#__PURE__*/_jsx("img", {
              src: logo.src,
              alt: "Logo ".concat(logo.id),
              style: {
                maxHeight: '48px'
              }
            }, logo.id);
          }), config.brandName && /*#__PURE__*/_jsx(Typography, {
            variant: "h6",
            color: "inherit",
            sx: {
              marginTop: 1,
              fontSize: '1.5rem'
            },
            children: config.brandName
          })]
        }), config.logos.showRightLogos && /*#__PURE__*/_jsx("div", {
          children: config.logos.rightLogoIcons.map(function (logo) {
            return /*#__PURE__*/_jsx("img", {
              src: logo.src,
              alt: "Right Logo ".concat(logo.id),
              style: {
                maxHeight: '48px'
              }
            }, logo.id);
          })
        })]
      })
    }), /*#__PURE__*/_jsx(Sidebar, {
      isOpen: isSidebarOpen,
      onToggle: toggleSidebar
    })]
  });
};
export default Navbar;