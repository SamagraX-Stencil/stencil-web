import { createContext, useContext, useEffect, useState } from 'react'
import configObj from './configObj.json'

interface ConfigContextValue {
  config: any
}

const ConfigProvider = createContext<ConfigContextValue>({
  config: {},
})

// const WpcasProvider = createContext('');

const ConfigContext = ({ children }: { children: React.ReactElement }) => {
  const [config, setConfig] = useState<any>(configObj)

  useEffect(() => {
    setConfig(() => {
      return configObj
    })
  }, [configObj])

  return (
    <ConfigProvider.Provider value={{ config }}>
      {children}
    </ConfigProvider.Provider>
  )
}

export const useConfigContext = () => useContext(ConfigProvider)
export default ConfigContext
