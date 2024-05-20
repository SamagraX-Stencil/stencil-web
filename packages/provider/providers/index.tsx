import React, { FC } from "react";
import { FlagsmithProvider } from "./flagsmith-provider";
import { LocaleProvider } from "./intl-provider";
import CustomThemeProvider from "./theme-provider";
import { CssBaseline } from "@mui/material";

const Provider: FC<any> = ({ children }) => {
  return (
    <>
        <FlagsmithProvider>
          <CustomThemeProvider >
            <LocaleProvider>
              <>
              {children}
              <CssBaseline />
              </>
            </LocaleProvider>
          </CustomThemeProvider>
        </FlagsmithProvider>
    </>
  );
};

export default Provider;