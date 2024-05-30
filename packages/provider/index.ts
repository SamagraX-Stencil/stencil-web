import ConfigContext, { useConfigContext } from './config-context/configContext'
import { ThemeContext } from './theme-context/theme-context'
import CustomThemeProvider from './theme-context'
import { AppContext } from './AppContext'
import CustomBotThemeProvider from './providers/theme-provider'
// import { FlagsmithProvider } from './providers/flagsmith-provider'
import { LocaleProvider } from './providers/intl-provider'
import ContextProvider from './providers/context-provider'
import Provider from './providers'
import {
  LocaleProviderExampleApp,
  useLocaleForExampleApp,
} from './tranlator-provider/intl-provider'
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
  LocaleProviderExampleApp,
  useLocaleForExampleApp,
}
