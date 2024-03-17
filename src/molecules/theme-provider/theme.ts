import { createTheme } from "@mui/material/styles";

import {theme} from '../../../default-config.json';

console.log({theme})
export const initialTheme = createTheme({
  palette: {
    // background: { paper: green[500], default: green[500] },
    primary: {
      // main: theme.primaryColor.value || purple[500],
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      // main: theme.secondaryColor.value ||green[500],
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


