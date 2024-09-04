import { useConfigContext } from './context'

export const useConfig = (key: string, name: string) => {
  const { config } = useConfigContext()
  return config?.[key]?.[name]
}

export const useThmeeConfig = (key: string) => {
  const { config } = useConfigContext()
  return config?.[key]
}
