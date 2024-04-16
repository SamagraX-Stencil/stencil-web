import { createContext, useContext, useReducer } from 'react'
import configObj from '../../app.config.json'
import { configReducer } from './configReducer'

interface ConfigContextValue {
  config: any
  handleChange: (
    newValue: string | boolean,
    where: string,
    which: string
  ) => void
}

const ConfigProvider = createContext<ConfigContextValue>({
  config: {},
  handleChange: () => {},
})

const ConfigContext = ({ children }: { children: React.ReactElement }) => {
  const [config, dispatch] = useReducer(configReducer, configObj)

  const handleChange = (
    newValue: string | boolean,
    where: string,
    which: string
  ) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: {
        where,
        which,
        newValue,
      },
    })
  }

  return (
    <ConfigProvider.Provider
      value={{
        config,
        handleChange,
      }}
    >
      {children}
    </ConfigProvider.Provider>
  )
}

export const useConfigContext = () => useContext(ConfigProvider)
export default ConfigContext
