import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useBotConfig } from '@samagra-x/hooks'
import { useLocalization } from '@samagra-x/hooks'
const More: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
    </React.Fragment>
  )
}

export default More
