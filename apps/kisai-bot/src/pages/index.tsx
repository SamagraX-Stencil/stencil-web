import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalization } from '../hooks';
import { useConfig } from '../hooks/useConfig';
import Homepage from '../pageComponents/home-page';
import { recordUserLocation } from '../utils/location';

const Home: NextPage = () => {
  const t = useLocalization();
  const config = useConfig('component', 'botDetails');
  useEffect(() => {
    recordUserLocation();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <Homepage />
    </React.Fragment>
  );
};

export default Home;
