'use client'
import type { NextPage } from 'next'
import Head from 'next/head'
import ClientComponent from './ClientComponent' // Import the client component
import { useBotConfig, useLocalization } from '@samagra-x/stencil-hooks'

const Chat: NextPage = () => {
  const t = useLocalization()

  const config = useBotConfig('component', 'botDetails')

  return (
    <>
      <Head>
        <title>t{'label.tab_title'}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <ClientComponent /> {/* Render the client component */}
    </>
  )
}

export default Chat
