import React, { FC } from 'react';
import { LocaleProvider } from './intl-provider';
import CustomThemeProvider from './theme-provider';
import { CssBaseline } from '@mui/material';

const Provider: FC<any> = ({ children }) => {
  return (
    <>
      <CustomThemeProvider>
        <LocaleProvider>
          <>
            {children}
            <CssBaseline />
          </>
        </LocaleProvider>
      </CustomThemeProvider>
    </>
  );
};

export default Provider;
