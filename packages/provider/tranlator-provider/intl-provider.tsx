'use client'
import configObj from '@repo/configmanager'
// import flagsmith from 'flagsmith/isomorphic'
import React, {
  FC,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IntlProvider } from 'react-intl'

const LocaleContext = createContext({
  locale: 'en',
  setLocale: (locale: string) => {},
})

export const useLocaleForExampleApp = () => useContext(LocaleContext)

export const LocaleProviderExampleApp: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const defaultLang = 'en'
  const [locale, setLocale] = useState(defaultLang)
  const [localeMsgs, setLocaleMsgs] = useState<any | null>(null)

  useEffect(() => {
    setLocaleMsgs(configObj.translation.en)
  }, [locale])

  if (typeof window === 'undefined') return <h1>Loading...</h1>
  return (
    //@ts-ignore
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={localeMsgs}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}
