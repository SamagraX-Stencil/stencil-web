import { createTheme } from '@mui/material/styles'
import { botConfigObj } from 'stencil-configmanager'

export const initialTheme = createTheme({
  palette: botConfigObj.theme.palette,
})
