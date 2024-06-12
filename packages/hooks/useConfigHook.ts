import { useConfigContext } from '@samagra-x/provider'

export const useConfig = (key: string, name: string) => {
  const { config } = useConfigContext()
  return config?.[key]?.[name]
}

export const useThemeConfig = (key: string) => {
  const { config } = useConfigContext()
  return config?.[key]
}

export const useUiConfig = (key: string, name: string) => {
  const { uiConfig } = useConfigContext()
  return uiConfig?.[key]?.[name]
}
