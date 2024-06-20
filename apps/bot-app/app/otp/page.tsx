'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@samagra-x/stencil-hooks'
import { OtpPage } from '@samagra-x/stencil-pages'
import { useBotConfig } from '@samagra-x/stencil-hooks'

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
      <OtpPage />
    </React.Fragment>
  )
}

export default OTP
