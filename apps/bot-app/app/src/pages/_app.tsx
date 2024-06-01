import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

// import '@repo/chatui/dist/index.css'
import { Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useLogin } from '@repo/hooks'
import FeaturePopup from '../components/FeaturePopup'
import { Provider } from '@repo/provider'
import { InstallModal } from '../components/install-modal'
import { FullPageLoader } from '@repo/molecules'
import { v4 as uuidv4 } from 'uuid'
import {
  ConfigContext,
  CustomThemeProvider,
  ThemeContext,
} from '@repo/provider'

const NavBar = dynamic(() => import('../components/NavBar'), {
  ssr: false,
})
function SafeHydrate({ children }: { children: ReactElement }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { isAuthenticated, login } = useLogin()
  const [cookie] = useCookies()

  useEffect(() => {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', uuidv4())
    }
  }, [])

  const handleLoginRedirect = useCallback(() => {
    if (router.pathname === '/login' || router.pathname.startsWith('/otp')) {
      // already logged in then send to home
      if (cookie['access_token'] && localStorage.getItem('userID')) {
        router.push('/')
      }
    } else {
      // not logged in then send to login page
      if (!cookie['access_token'] || !localStorage.getItem('userID')) {
        localStorage.clear()
        sessionStorage.clear()
        router.push('/login')
      }
    }
  }, [cookie, router])

  useEffect(() => {
    handleLoginRedirect()
  }, [handleLoginRedirect])

  useEffect(() => {
    if (!isAuthenticated) {
      login()
    }
  }, [isAuthenticated, login])

  if (process.env.NODE_ENV === 'production') {
    globalThis.console.log = () => {}
  }

  if (typeof window === 'undefined') return <FullPageLoader loading />
  return (
    <Provider>
      <ConfigContext>
        <CustomThemeProvider>
          {' '}
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
        </CustomThemeProvider>
      </ConfigContext>
    </Provider>
  )
}

export default App
