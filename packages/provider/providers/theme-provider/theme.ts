import { createTheme } from '@mui/material/styles'
import { botConfigObj } from '@samagra-x/stencil-config-manager'

export const initialTheme = createTheme({
  palette: botConfigObj.theme.palette,
})
