import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React, { useContext } from 'react';
import defaultLocales from './locales';
var LocaleContext = /*#__PURE__*/React.createContext(undefined);
var DEFAULT_LOCALE = 'en-US';
var LocaleProvider = function LocaleProvider(_ref) {
  var locale = _ref.locale,
    locales = _ref.locales,
    children = _ref.children;
  return /*#__PURE__*/React.createElement(LocaleContext.Provider, {
    value: {
      locale: locale,
      locales: locales
    }
  }, children);
};
LocaleProvider.defaultProps = {
  locale: DEFAULT_LOCALE
};
var useLocale = function useLocale(comp, fallback) {
  var localeContext = useContext(LocaleContext);
  var _ref2 = localeContext || {},
    locale = _ref2.locale,
    locales = _ref2.locales;
  var defaultStrings = locale && defaultLocales[locale] || defaultLocales[DEFAULT_LOCALE];
  var strings = locales ? _objectSpread(_objectSpread({}, defaultStrings), locales) : defaultStrings;
  if (!localeContext && fallback) {
    strings = fallback;
  } else if (comp) {
    strings = strings[comp] || {};
  }
  return {
    locale: locale,
    trans: function trans(key) {
      return key ? strings[key] : strings;
    }
  };
};
export { LocaleProvider, LocaleContext, useLocale };