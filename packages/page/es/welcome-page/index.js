import logo from './assets/main.png';
import cm from './assets/cm.png';
import bottom from './assets/bottom.png';
import { Container, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from '@repo/hooks';
import { LanguagePicker } from '@repo/molecules';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var AkaiLaunch = function AkaiLaunch() {
  var config = useUiConfig('component', 'welcomePage');
  var theme = useColorPalates();
  console.log('akailaunch page', config, theme);
  return /*#__PURE__*/_jsxs(Container, {
    className: "p-2",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '80vh'
    },
    children: [/*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      },
      className: "p-2",
      children: [(config === null || config === void 0 ? void 0 : config.showTopLeftLogo) && /*#__PURE__*/_jsx("img", {
        src: (config === null || config === void 0 ? void 0 : config.topLeftLogo) || logo.src,
        style: {
          height: (config === null || config === void 0 ? void 0 : config.topLeftLogoHeight) || '40px'
        }
      }), /*#__PURE__*/_jsx(LanguagePicker, {})]
    }), /*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/_jsx("div", {
        className: "mt-4",
        children: (config === null || config === void 0 ? void 0 : config.showCenterImage) && /*#__PURE__*/_jsx("img", {
          src: cm.src,
          style: {
            width: (config === null || config === void 0 ? void 0 : config.centerImageWidth) || '148px',
            height: (config === null || config === void 0 ? void 0 : config.centerImageHeight) || '210px'
          }
        })
      }), /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx("text", {
          style: {
            fontSize: '22px',
            color: theme.primary.dark,
            lineHeight: '42px',
            fontWeight: '600'
          },
          children: config === null || config === void 0 ? void 0 : config.centerText
        })
      }), (config === null || config === void 0 ? void 0 : config.showCenterBottomImage) && /*#__PURE__*/_jsx("img", {
        src: (config === null || config === void 0 ? void 0 : config.centerBottomImage) || bottom.src,
        style: {
          maxWidth: '80vw',
          height: config === null || config === void 0 ? void 0 : config.centerBottomImageHeight,
          width: config === null || config === void 0 ? void 0 : config.centerBottomImageWidth
        }
      })]
    }), (config === null || config === void 0 ? void 0 : config.showProceedBtn) && /*#__PURE__*/_jsx("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      children: /*#__PURE__*/_jsx(IconButton, {
        "aria-label": "fingerprint",
        style: {
          background: (config === null || config === void 0 ? void 0 : config.proceedBtnColor) || theme.primary.dark
        },
        children: /*#__PURE__*/_jsx(ArrowForward, {
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
export default AkaiLaunch;