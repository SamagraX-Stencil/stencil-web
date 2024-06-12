import { createTheme } from '@mui/material/styles'
import { botConfigObj } from '@samagra-x/config-manager'

export const initialTheme = createTheme({
  palette: botConfigObj.theme.palette,
})
