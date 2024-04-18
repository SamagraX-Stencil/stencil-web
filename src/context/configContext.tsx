import { createContext, useContext, useReducer } from 'react'
import configObj from '../../app.config.json'
import { configReducer } from './configReducer'
import AppConfig, { Component } from '../types/types'

interface ConfigContextValue {
  config: AppConfig
  handleChange: (
    newValue: string | boolean,
    where: keyof Component,
    which: string
  ) => void
}

const ConfigProvider = createContext<ConfigContextValue>({
  config: {} as AppConfig,
  handleChange: () => {},
})

const ConfigContext = ({ children }: { children: React.ReactElement }) => {
  const [config, dispatch] = useReducer(configReducer, configObj)

  const handleChange = (
    newValue: string | boolean,
    where: keyof Component,
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
