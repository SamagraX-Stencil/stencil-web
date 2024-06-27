import ConfigContext, { useConfigContext } from './config-context/configContext'
import { ThemeContext } from './theme-context/theme-context'
import CustomThemeProvider from './theme-context'
import { AppContext } from './AppContext'
import CustomBotThemeProvider from './providers/theme-provider'
// import { FlagsmithProvider } from './providers/flagsmith-provider'
import { LocaleProvider } from './providers/intl-provider'
import ContextProvider from './providers/context-provider'
import Provider from './providers'
import { ThemeContextType } from './providers/theme-provider/theme-context'
import { ThemeContextType2 } from './theme-context/theme-context'

export {
  ConfigContext,
  useConfigContext,
  AppContext,
  ThemeContext,
  CustomThemeProvider,
  CustomBotThemeProvider,
  // FlagsmithProvider,
  LocaleProvider,
  Provider,
  ContextProvider,
}

export { type ThemeContextType, type ThemeContextType2 }
