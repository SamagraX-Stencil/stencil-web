import { useContext } from 'react'
import { AppContext } from '@samagra-x/stencil-provider'

export const useBotConfig = (key: string, name: string) => {
  const context = useContext(AppContext)
  return context?.config?.[key]?.[name]
}

export const useGetInitTheme = () => {
  const context = useContext(AppContext)
  return { ...context?.config?.theme }
}
