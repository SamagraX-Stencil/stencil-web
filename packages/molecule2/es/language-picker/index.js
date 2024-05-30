import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { map } from 'lodash';
import { useColorPalates } from 'stencil-hooks';
import { jsx as _jsx } from "react/jsx-runtime";
var LanguagePicker = function LanguagePicker() {
  var _React$useState = React.useState('en'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeLanguage = _React$useState2[0],
    setActiveLanguage = _React$useState2[1];
  var handleChange = function handleChange(event) {
    setActiveLanguage(event.target.value);
  };
  var theme = useColorPalates();
  var languages = [{
    name: 'Eng',
    value: 'en'
  }, {
    name: 'हिंदी',
    value: 'hi'
  }];
  return /*#__PURE__*/_jsx(FormControl, {
    sx: {
      m: 1,
      background: theme.primary.main,
      border: 'none',
      borderRadius: '10px',
      height: '36px'
    },
    size: "small",
    children: /*#__PURE__*/_jsx(Select, {
      value: activeLanguage,
      onChange: handleChange,
      displayEmpty: true,
      inputProps: {
        'aria-label': 'Without label'
      },
      sx: {
        color: theme.primary.dark,
        border: 'none',
        borderRadius: '10px',
        width: '85px',
        height: '36px'
      },
      children: map(languages, function (lang) {
        return /*#__PURE__*/_jsx(MenuItem, {
          value: lang === null || lang === void 0 ? void 0 : lang.value,
          children: lang === null || lang === void 0 ? void 0 : lang.name
        });
      })
    })
  });
};
export default LanguagePicker;