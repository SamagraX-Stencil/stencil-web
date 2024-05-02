import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@repo/hooks'
import LoginMobileAadharPage from '../pageComponents/login-mobile-aadhar-page'
import { useBotConfig } from '@repo/hooks'
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
