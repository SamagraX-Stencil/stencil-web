import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@samagra-x/hooks'
import { LoginMobileAadharPage } from '@samagra-x/pages'
import { useBotConfig } from '@samagra-x/hooks'
const Login: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <LoginMobileAadharPage />
    </React.Fragment>
  )
}

export default Login
