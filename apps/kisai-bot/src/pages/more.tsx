import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useConfig } from '../hooks/useConfig';
import { useLocalization } from '../hooks';
const More: NextPage = () => {
  const t = useLocalization();
  const config = useConfig('component', 'botDetails');
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
    </React.Fragment>
  );
};

export default More;
