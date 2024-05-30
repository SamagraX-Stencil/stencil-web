import farmer from './assets/farmer.jpeg';
import user from './assets/user.svg';
import farmer2 from './assets/farmer-op.svg';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { LanguagePicker } from 'stencil-molecule';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var UserTypeSelector = function UserTypeSelector() {
  var theme = useColorPalates();
  var config = useUiConfig('component', 'userTypeSelectorPage');
  return /*#__PURE__*/_jsxs("div", {
    style: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#333',
      margin: 'auto',
      backgroundColor: '#fff',
      minHeight: '80vh',
      position: 'relative',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsx("div", {
      style: {
        position: 'absolute',
        top: '10px',
        left: 'calc(100% - 85px - 10px)'
      },
      children: /*#__PURE__*/_jsx(LanguagePicker, {})
    }), /*#__PURE__*/_jsx("div", {
      style: {
        position: 'absolute',
        top: '50%',
        // Adjust this value to move the container up or down
        width: '100%',
        bottom: '0',
        backgroundColor: '#fff',
        borderTopLeftRadius: '30% 5%',
        // Adjust the curvature
        borderTopRightRadius: '30% 5%',
        overflow: 'hidden' // Ensures content aligns with the curved edges
      },
      children: /*#__PURE__*/_jsxs("div", {
        className: "p-4",
        children: [/*#__PURE__*/_jsx("p", {
          style: {
            marginTop: '24px',
            fontSize: '24px',
            fontWeight: 400,
            color: '#51586B'
          },
          children: (config === null || config === void 0 ? void 0 : config.title) || 'कृपया बताएं आप कौन हैं?'
        }), /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '32px',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/_jsxs("div", {
            style: {
              backgroundColor: theme.primary.dark,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '16px',
              padding: '16px',
              width: '40%',
              textAlign: 'center'
            },
            children: [/*#__PURE__*/_jsx("img", {
              src: (config === null || config === void 0 ? void 0 : config.user1Image) || farmer2,
              alt: "Farmer",
              style: {
                maxWidth: '100%',
                height: 'auto',
                marginBottom: '8px'
              }
            }), /*#__PURE__*/_jsxs("p", {
              style: {
                color: 'white'
              },
              children: [(config === null || config === void 0 ? void 0 : config.user1Text) || 'किसान', " "]
            })]
          }), /*#__PURE__*/_jsx("p", {
            children: "\u092F\u093E"
          }), /*#__PURE__*/_jsxs("div", {
            style: {
              backgroundColor: ' #F4F4F4',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '16px',
              padding: '16px',
              width: '40%',
              textAlign: 'center'
            },
            children: [/*#__PURE__*/_jsx("img", {
              src: (config === null || config === void 0 ? void 0 : config.user2Image) || user,
              alt: "Worker",
              style: {
                maxWidth: '100%',
                height: 'auto',
                marginBottom: '8px'
              }
            }), /*#__PURE__*/_jsx("p", {
              children: (config === null || config === void 0 ? void 0 : config.user1Text) || 'विस्तार कार्यकर्ता'
            })]
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("main", {
      children: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx("img", {
          src: (config === null || config === void 0 ? void 0 : config.backgroundImage) || farmer,
          alt: "Farmer with vegetables",
          style: {
            maxWidth: '100%',
            height: 'auto'
          }
        })
      })
    })]
  });
};
export default UserTypeSelector;