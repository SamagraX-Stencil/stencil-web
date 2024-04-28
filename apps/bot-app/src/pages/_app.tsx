import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ReactElement, useCallback, useContext, useEffect, useState } from 'react';

import '@samagra-x/chatui/dist/index.css';
import { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useLogin } from '../hooks';
import FeaturePopup from '../components/FeaturePopup';
import Provider from '../providers';
import { InstallModal } from '../components/install-modal';
import { FullPageLoader } from '../components/fullpage-loader';
import flagsmith from 'flagsmith/isomorphic';
import { AppContext } from '../context';
import { useConfig } from '../hooks/useConfig';



const NavBar = dynamic(() => import('../components/NavBar'), {
  ssr: false,
});
function SafeHydrate({ children }: { children: ReactElement }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { isAuthenticated, login } = useLogin();
  const [cookie] = useCookies();

 
  const context =useContext(AppContext);

  // useEffect(() => {
  //   const getFlagSmithState = async () => {
  //     await flagsmith.init({
  //       // api: process.env.NEXT_PUBLIC_FLAGSMITH_API,
  //       environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID || '',
  //     });
  //     if (flagsmith.getState()) {
  //       //@ts-ignore
  //       setflagsmithState(flagsmith.getState());
  //     }
  //   };
  //   getFlagSmithState();
  // }, []);

  const handleLoginRedirect = useCallback(() => {
    if (router.pathname === '/login' || router.pathname.startsWith('/otp')) {
      // already logged in then send to home
      if (cookie['access_token'] && localStorage.getItem('userID')) {
        router.push('/');
      }
    } else {
      // not logged in then send to login page
      if (!cookie['access_token'] || !localStorage.getItem('userID')) {
        localStorage.clear();
        sessionStorage.clear();
        router.push('/login');
      }
    }
  }, [cookie, router]);

  useEffect(() => {
    handleLoginRedirect();
  }, [handleLoginRedirect]);

  useEffect(() => {
    if (!isAuthenticated) {
      login();
    }
  }, [isAuthenticated, login]);

  if (process.env.NODE_ENV === 'production') {
    globalThis.console.log = () => {};
  }

  if (typeof window === 'undefined') return <FullPageLoader loading />;
  return (
    <Provider>
      <>
        <div style={{ height: '100%' }}>
          <Toaster position="top-center" reverseOrder={false} />
          <FeaturePopup />
          <InstallModal />
          <NavBar />
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </div>
      </>
    </Provider>
  );
};

export default App;
