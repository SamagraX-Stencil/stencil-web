
import { useConfigContext } from '../context/configContext'

export const useConfig = (key: string, name: string) => {
  const { config } = useConfigContext()
  return (config as any)?.[key]?.[name]
}

export const useThemeConfig = (key: string) => {
  const { config } = useConfigContext()
  return (config as any)?.[key]
}

export const useUiConfig = (key: string, name: string) => {
  const { uiConfig } = useConfigContext()
  return (uiConfig as any)?.[key]?.[name]
}
