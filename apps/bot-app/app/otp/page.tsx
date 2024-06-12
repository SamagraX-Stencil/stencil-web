'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@samagra-x/hooks'
import { LocalOtpPage } from '@samagra-x/pages'
import { useBotConfig } from '@samagra-x/hooks'

const OTP: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  console.log(config, 'temp')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <LocalOtpPage />
    </React.Fragment>
  )
}

export default OTP
