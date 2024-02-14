import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import ContextProvider from '../src/context/ContextProvider';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import '@samagra-x/chatui/dist/index.css';
import { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import flagsmith from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
// import { useLogin } from '../src/hooks';
import axios from 'axios';
// import { messaging, analytics } from '../utils/firebase';
// import { getToken } from 'firebase/messaging';
// import FcmNotification from '../utils/FcmNotification';
// import { logEvent } from 'firebase/analytics';
// import FeaturePopup from '../components/FeaturePopup';
// import { Button, Modal } from '@material-ui/core';

// const LaunchPage = dynamic(() => import('../components/LaunchPage'), {
//   ssr: false,
// });
const NavBar = dynamic(() => import('../src/components/NavBar'), {
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
  // const { isAuthenticated, login } = useLogin();
  // const [launch, setLaunch] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies();
  const [flagsmithState, setflagsmithState] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const deferredPromptRef = useRef<any>(null);

  useEffect(() => {
    const getFlagSmithState = async () => {
      await flagsmith.init({
        // api: process.env.NEXT_PUBLIC_FLAGSMITH_API,
        environmentID: process.env.NEXT_PUBLIC_ENVIRONMENT_ID || '',
      });
      if (flagsmith.getState()) {
        //@ts-ignore
        setflagsmithState(flagsmith.getState());
      }
    };
    getFlagSmithState();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    globalThis.console.log = () => {};
  }

  if (
    // launch
    // ||
    !flagsmithState
  ) {
    return <></>;
  } else {
    return (
      <ChakraProvider>
        <FlagsmithProvider
          flagsmith={flagsmith}
          serverState={flagsmithState || undefined}>
          <ContextProvider>
            <div style={{ height: '100%' }}>
              <Toaster position="top-center" reverseOrder={false} />
              <NavBar />
              <SafeHydrate>
                <Component {...pageProps} />
              </SafeHydrate>
            </div>
          </ContextProvider>
        </FlagsmithProvider>
      </ChakraProvider>
    );
  }
};

export default App;
