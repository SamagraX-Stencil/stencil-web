import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useLocalization } from '../src/hooks/useLocalization';
import { useEffect, useContext } from 'react';
import { AppContext } from '../src/context';
import styles from '../components/dialer-popup/index.module.css';
import router from 'next/router';

const ChatUiWindow = dynamic(
  () => import('../src/components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Chat: NextPage = () => {
  const t = useLocalization();
  const context = useContext(AppContext);

  useEffect(() => {
    if (!sessionStorage.getItem('conversationId')) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title> {t('label.subtitle')}</title>
      </Head>
      

      <div
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '1vh',
          top: '100px',
        }}>
        <ChatUiWindow />
      </div>
    </>
  );
};
export default Chat;
