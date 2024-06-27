'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useBotConfig } from '@samagra-x/stencil-hooks'
import { useLocalization } from '@samagra-x/stencil-hooks'
import { FAQPage } from '@samagra-x/stencil-pages'

const Faq: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <FAQPage />
    </React.Fragment>
  )
}

export default Faq
