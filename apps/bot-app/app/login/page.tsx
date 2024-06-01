'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@repo/hooks'
import { LocalLoginMobileAadharPage } from '@repo/pages'
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
      <LocalLoginMobileAadharPage />
    </React.Fragment>
  )
}

export default Login
