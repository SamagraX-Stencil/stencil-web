import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import 'bootstrap-css-only/css/bootstrap.min.css'
import CustomThemeProvider from './molecules/theme-provider/index.tsx'

import ConfigContext from './context/configContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigContext>
      <CustomThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CustomThemeProvider>
    </ConfigContext>
  </React.StrictMode>
)
