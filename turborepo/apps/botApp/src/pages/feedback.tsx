import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import FeedbackPage from '../pageComponents/feedback-page/index';
import { useLocalization } from '../hooks';
import { useConfig } from "../hooks/useConfig";


const Feedback: NextPage = () => {
  const t=useLocalization();
  const config = useConfig("component", "botDetails");
  return (
    <React.Fragment>
     <Head>
        <title>{t("label.tab_title")}</title>
        <link rel="icon" href={config?.favicon} />
        
      </Head>
      <FeedbackPage />
    </React.Fragment>
  );
};

export default Feedback;
