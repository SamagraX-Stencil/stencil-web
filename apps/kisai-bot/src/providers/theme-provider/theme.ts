import { createTheme } from '@mui/material/styles';
import config from '../../../app.config.json';

export const initialTheme = createTheme({
  palette: config.theme.palette,
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
});
