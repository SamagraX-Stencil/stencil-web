'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@repo/hooks'
import { HistoryPage } from '@repo/pages'
import { useBotConfig } from '@repo/hooks'
const History: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <HistoryPage />
    </React.Fragment>
  )
}

export default History
