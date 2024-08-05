import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useLocalization } from '../hooks/useLocalization';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import styles from '../components/feedback-popup/index.module.css';
import FeedbackPopup from '../components/feedback-popup';
import { useConfig } from '../hooks/useConfig';
import { useRouter } from 'next/router';

const ChatUi = dynamic(() => import('../components/chat-window'), {
  ssr: false,
});

const Chat: NextPage = () => {
  const t = useLocalization();
  const context = useContext(AppContext);
  const config = useConfig('component', 'botDetails');
  console.log('hola', { config });
  const router = useRouter();
  const { message } = router.query;

  useEffect(() => {
    if (message) {
      const { lang } = router.query;
      const newQuery = lang ? { lang } : {};

      router.replace(
        {
          pathname: '/chat',
          query: newQuery,
        },
        '',
        { shallow: true }
      );
      setTimeout(() => {
        context?.sendMessage(message as string, message as string);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      {context?.showFeedbackPopup && (
        <div
          className={styles.overlay}
          // onClick={() => context?.setShowFeedbackPopup(false)}
        >
          {context?.showFeedbackPopup && (
            <FeedbackPopup setShowFeedbackPopup={context?.setShowFeedbackPopup} />
          )}
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '1vh',
          top: '100px',
        }}
      >
        <ChatUi />
      </div>
    </>
  );
};
export default Chat;
