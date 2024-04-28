import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalization } from '../hooks';
import OtpPage from '../pageComponents/otp-page';
import { useConfig } from "../hooks/useConfig";

const OTP: NextPage = () => {
  const t=useLocalization();
  const config = useConfig("component", "botDetails");
  return (
    <React.Fragment>
      <Head>
        <title>{t("label.tab_title")}</title>
        <link rel="icon" href={config?.favicon} />
        
      </Head>
      <OtpPage />
    </React.Fragment>
  );
};

export default OTP;
