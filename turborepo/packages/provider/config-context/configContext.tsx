import React from 'react'
import { createContext, useContext, useReducer, useState } from 'react'
import configObj from '@repo/configmanager'
import { configReducer } from './configReducer'
import toast from 'react-hot-toast'
import AppConfig, { Component } from '../types/appConfigType'

interface ConfigContextValue {
  config: AppConfig
  handleChange: (
    newValue: string | boolean | number,
    where: keyof Component,
    which: string
  ) => void
  uiConfig: AppConfig
  handleSaveButton: () => void
  handleResetButton: () => void
}

const ConfigProvider = createContext<ConfigContextValue>({
  config: {} as AppConfig,
  handleChange: () => {},
  uiConfig: {} as AppConfig,
  handleSaveButton: () => {},
  handleResetButton: () => {},
})
const getConfigFromLocalStorage = () => {
  const storedConfig = localStorage.getItem('config')
  return storedConfig ? JSON.parse(storedConfig) : configObj
}

const ConfigContext = ({ children }: { children: React.ReactElement }) => {
  const [config, dispatch] = useReducer(
    configReducer,
    getConfigFromLocalStorage()
  )
  const [uiConfig, setUiConfig] = useState(getConfigFromLocalStorage())

  const handleSaveButton = () => {
    const configString = JSON.stringify(config)
    localStorage.setItem('config', configString)
    setUiConfig(config)
    toast.success('Data is saved successfully')
  }
  const handleResetButton = () => {
    const configString = JSON.stringify(configObj)
    localStorage.setItem('config', configString)
    setUiConfig(configObj)
    dispatch({
      type: 'RESET_VALUE',
      payload: {
        newValue: '',
        where: 'homePage',
        which: '',
      },
    })
    toast.success('Data is reset successfully')
  }

  const handleChange = (
    newValue: string | boolean | number,
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
        uiConfig,
        handleChange,
        handleSaveButton,
        handleResetButton,
      }}
    >
      {children}
    </ConfigProvider.Provider>
  )
}

export const useConfigContext = () => useContext(ConfigProvider)
export default ConfigContext
