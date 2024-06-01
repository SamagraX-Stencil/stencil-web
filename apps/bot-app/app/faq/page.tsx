'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useBotConfig } from '@repo/hooks'
import { useLocalization } from '@repo/hooks'
import { LocalFAQPage } from '@repo/pages'

const Faq: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <LocalFAQPage />
    </React.Fragment>
  )
}

export default Faq
