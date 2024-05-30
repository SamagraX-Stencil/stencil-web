'use client'
import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { LocalFeedbackPage } from 'stencil-pages'
import { useLocalization } from 'stencil-hooks'
import { useBotConfig } from 'stencil-hooks'

const Feedback: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <LocalFeedbackPage />
    </React.Fragment>
  )
}

export default Feedback
