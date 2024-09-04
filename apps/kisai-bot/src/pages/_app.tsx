import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import '@samagra-x/chatui/dist/index.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useLogin } from '../hooks';
import FeaturePopup from '../components/feature-popup';
import Provider from '../providers';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ImportedFullPageLoader } from '../components/fullpage-loader';

const NavBar = dynamic(() => import('../components/navbar'), {
  ssr: false,
});

function SafeHydrate({ children }: { children: ReactElement }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { isAuthenticated, login } = useLogin();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', uuidv4());
    }
  }, []);

  const handleLoginRedirect = useCallback(() => {
    if (router.pathname === '/login' || router.pathname.startsWith('/otp')) {
      // already logged in then send to home
      if (localStorage.getItem('auth') && localStorage.getItem('userID')) {
        console.log('here');
        router.push(sessionStorage.getItem('path') ?? '/');
      }
    } else {
      if (router.query.navbar) {
        sessionStorage.setItem('navbar', router.query.navbar as string);
      }
      sessionStorage.setItem('path', router.asPath);
      if (router.query.auth && router.query.userId) {
        // setCookie('access_token', router.query.auth, { path: '/' });
        localStorage.setItem('auth', router.query.auth as string);
        localStorage.setItem('userID', router.query.userId as string);
        sessionStorage.removeItem('conversationId');
      } else if (!localStorage.getItem('phoneNumber')) {
        localStorage.clear();
        sessionStorage.clear();
        removeCookie('access_token', { path: '/' });
        router.push('/login');
      }
    }
  }, [removeCookie, router]);

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

  if (typeof window === 'undefined') return <ImportedFullPageLoader loading />;
  // if (isAuthenticated && user && !user?.data?.profile) {
  //   return (
  //     <Provider>
  //       <OnBoardingPage setUser={setUser} />
  //     </Provider>
  //   );
  // }
  return (
    <Provider>
      <>
        <div style={{ height: '100%' }}>
          <Toaster position="top-center" reverseOrder={false} />
          <FeaturePopup />
          {/* {localStorage.getItem("navbar") !== "hidden" &&<InstallModal />} */}
          {sessionStorage.getItem('navbar') !== 'hidden' && <NavBar />}
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </div>
      </>
    </Provider>
  );
};

export default App;
