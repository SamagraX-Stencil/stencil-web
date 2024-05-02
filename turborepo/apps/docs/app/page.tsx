'use client'

import { ConfigContext, CustomThemeProvider } from '@repo/provider'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

export default function Page(): JSX.Element {
  return (
    <>
      <ConfigContext>
        <CustomThemeProvider>
          <CssBaseline>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CssBaseline>
        </CustomThemeProvider>
      </ConfigContext>
    </>
  )
}
