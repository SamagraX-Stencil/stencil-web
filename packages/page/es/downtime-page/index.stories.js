import { CustomThemeProvider } from 'stencil-provider';
import { CssBaseline } from '@mui/material';
import DowntimePage from './index';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var meta = {
  title: 'Pages/DowntimePage',
  component: DowntimePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (Story) {
    return /*#__PURE__*/_jsxs(CustomThemeProvider, {
      children: [/*#__PURE__*/_jsx(CssBaseline, {}), /*#__PURE__*/_jsx(Story, {})]
    });
  }],
  args: {
    config: {
      component: {
        title: "We're under maintainance",
        downTimeImage: '/src/pages/downtime-page/assets/downTimeGIF.gif',
        supportingText: 'Have an urgent query?',
        contactLink: 'Call Ama Krushi',
        refreshText: 'Try Again',
        previousPageText: 'Previous Page'
      }
    }
  }
};
export default meta;
export var Downtime = {};