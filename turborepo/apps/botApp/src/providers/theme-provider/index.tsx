import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  createTheme,
} from '@mui/material/styles'
import { initialTheme } from './theme'
import { Color, ThemeContext } from './theme-context'
import { useGetInitTheme } from '@repo/hooks'

interface CustomThemeProviderProps {
  children: ReactNode
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const _initialTheme = useGetInitTheme()

  const [theme, setTheme] = useState<Theme | null>(null)

  const modifyTheme = (changes: Partial<Theme>) => {
    setTheme((prevTheme) => createTheme({ ...prevTheme, ...changes }))
  }

  const modifyPaletes = useCallback((palette: Color) => {
    //@ts-ignore
    setTheme((prevTheme) =>
      createTheme({
        ...prevTheme,
        palette: { ...prevTheme?.palette, primary: { ...palette.primary } },
      })
    )
  }, [])

  useEffect(() => {
    setTheme(initialTheme)
  }, [initialTheme])

  if (!theme) {
    return null
  }
  return (
    <ThemeContext.Provider value={{ theme, modifyTheme, modifyPaletes }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default CustomThemeProvider
