import { createTheme } from '@mui/material/styles'
import { botConfigObj } from '@repo/configmanager'

export const initialTheme = createTheme({
  palette: botConfigObj.theme.palette,
})
