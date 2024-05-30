'use client'
// import flagsmith from 'flagsmith/isomorphic'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { FullPageLoader } from './components/fullpage-loader'
import ContextProvider from './context-provider'
import { IntlProvider } from 'react-intl'

// function loadMessages(locale: string) {
//     switch (locale) {
//         case 'en':
//             return import('../../lang/en.json');
//         // case 'or':
//         //     return import('../../lang/or.json');
//         default:
//             return import('../../lang/en.json');
//     }
// }
export const LocaleProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const defaultLang = 'en'
  const [locale, setLocale] = useState(
    localStorage.getItem('locale') || defaultLang
  )
  const [localeMsgs, setLocaleMsgs] = useState<Record<string, string> | null>(
    null
  )

  // useEffect(() => {
  //     loadMessages(locale).then((res) => {
  //         //@ts-ignore
  //         setLocaleMsgs(res);
  //     });
  // }, [locale]);

  if (typeof window === 'undefined')
    return <FullPageLoader loading label="Fetching Locale" />
  return (
    //@ts-ignore
    <IntlProvider locale={locale} messages={localeMsgs}>
      <ContextProvider
        locale={locale}
        setLocale={setLocale}
        localeMsgs={localeMsgs}
        setLocaleMsgs={setLocaleMsgs}
      >
        {children}
      </ContextProvider>
    </IntlProvider>
  )
}
