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
// import { InstallModal } from '../components/install-modal';
import { FullPageLoader } from 'my-stencil-molecule/lib/fullpage-loader';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import OnBoardingPage from '../pageComponents/onboarding-page';

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
      } else if (!localStorage.getItem('auth') || !localStorage.getItem('userID')) {
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
    const fetchConfig = async () => {
      fetch(process.env.NEXT_PUBLIC_CONFIG_BASE_URL || '')
        .then((res) => res.json())
        .then((data) => {
          console.log('main data', data?.data?.config);
          const faviconUrl = data?.data?.config?.component?.botDetails?.favicon;
          console.log({ faviconUrl });
          var myDynamicManifest = {
            short_name: 'Bot',
            name: 'Bot',
            icons: [
              {
                src: faviconUrl,
                sizes: '64x64 32x32 24x24 16x16',
                type: 'image/x-icon',
              },
              {
                src: faviconUrl,
                type: 'image/png',
                sizes: '192x192',
              },
              {
                src: faviconUrl,
                type: 'image/png',
                sizes: '512x512',
              },
            ],
            start_url: window?.location?.href || '/',
            display: 'fullscreen',
            theme_color: 'black',
            background_color: 'white',
          };

          const stringManifest = JSON.stringify(myDynamicManifest);
          const blob = new Blob([stringManifest], {
            type: 'application/json',
          });
          const manifestURL = URL.createObjectURL(blob);
          document.getElementById('manifest-file')?.setAttribute('href', manifestURL);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchConfig();
  }, []);

  const fetchUser = async () => {
    try {
      const userID = localStorage.getItem('userID');
      const res = await axios.get(`/api/fetchUser?userID=${userID}`);
      setUser(res?.data?.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      login();
    } else if (process.env.NEXT_PUBLIC_SHOW_ONBOARDING === 'true') {
      fetchUser();
    }
  }, [isAuthenticated, login]);

  if (process.env.NODE_ENV === 'production') {
    globalThis.console.log = () => {};
  }

  if (typeof window === 'undefined') return <FullPageLoader loading />;
  if (isAuthenticated && user && !user?.data?.profile) {
    return (
      <Provider>
        <OnBoardingPage setUser={setUser} />
      </Provider>
    );
  }
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
