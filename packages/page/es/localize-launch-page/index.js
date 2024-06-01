import { useLocalization } from '@repo/hooks';
import styles from './index.module.css';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var LocalLaunchPage = function LocalLaunchPage(_ref) {
  var _theme$palette, _theme$palette2;
  var theme = _ref.theme,
    config = _ref.config,
    compConfig = _ref.compConfig;
  var t = useLocalization();
  return /*#__PURE__*/_jsxs("div", {
    className: "".concat(styles.container),
    style: {
      background: (config === null || config === void 0 ? void 0 : config.launchPageColor) || (theme === null || theme === void 0 || (_theme$palette = theme.palette) === null || _theme$palette === void 0 || (_theme$palette = _theme$palette.primary) === null || _theme$palette === void 0 ? void 0 : _theme$palette.light)
    },
    children: [(config === null || config === void 0 ? void 0 : config.logo) && /*#__PURE__*/_jsx("img", {
      className: styles.loginImage,
      src: config === null || config === void 0 ? void 0 : config.logo,
      alt: "launchPageLogo",
      width: 220,
      height: 233
    }), /*#__PURE__*/_jsx("span", {
      style: {
        color: theme === null || theme === void 0 || (_theme$palette2 = theme.palette) === null || _theme$palette2 === void 0 || (_theme$palette2 = _theme$palette2.primary) === null || _theme$palette2 === void 0 ? void 0 : _theme$palette2.main
      },
      children: t('label.title')
    })]
  });
};
export default LocalLaunchPage;