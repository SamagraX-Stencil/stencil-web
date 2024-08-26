import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import '@samagra-x/chatui/dist/index.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import FeaturePopup from '../components/feature-popup';
import Provider from '../providers';
import { FullPageLoader } from '../components/fullpage-loader';

const NavBar = dynamic(() => import('../components/navbar'), {
  ssr: false,
});

function SafeHydrate({ children }: { children: ReactElement }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
}

const App = ({ Component, pageProps }: AppProps) => {
  if (typeof window === 'undefined') return <FullPageLoader loading />;

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
