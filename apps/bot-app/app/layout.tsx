'use client'
import './src/styles/globals.css'
import { InstallModal } from './src/components/install-modal'
import FeaturePopup from './src/components/FeaturePopup'
import { useEffect } from 'react'
import { FullPageLoader } from '@repo/molecules'
// import { ConfigContext, CustomThemeProvider } from '@repo/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ConfigContext, CustomThemeProvider } from '@repo/provider'

const inter = Inter({ subsets: ['latin'] })
import Navbar from './src/components/NavBar'
import { useLogin } from '@repo/hooks'

import { useCookies } from 'react-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { Provider } from '@repo/provider'

// import dynamic from 'next/dynamic'

// const Navbar = dynamic(() => import('./src/components/NavBar'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()

  const { isAuthenticated, login } = useLogin()
  const [cookie] = typeof window !== 'undefined' ? useCookies() : [{}]

  useEffect(() => {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', uuidv4())
    }
  }, [])

  const handleLoginRedirect = () => {
    if (router && (pathname === '/login' || pathname.startsWith('/otp'))) {
      // already logged in then send to home
      if (cookie['access_token'] && localStorage.getItem('userID')) {
        router.push('/')
      }
    } else if (router) {
      // not logged in then send to login page
      if (!cookie['access_token'] || !localStorage.getItem('userID')) {
        localStorage.clear()
        sessionStorage.clear()
        //do_it_letter
        // router.push('/login')
      }
    }
  }

  useEffect(() => {
    if (router) {
      handleLoginRedirect()
    }
  }, [router, cookie])

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
    <html lang="en">
      <>
        <Provider>
          <ConfigContext>
            <CustomThemeProvider>
              <CssBaseline>
                <BrowserRouter>
                  <body>
                    <div style={{ height: '100%' }}>
                      <Toaster position="top-center" reverseOrder={false} />
                      <FeaturePopup />
                      <InstallModal />
                      <Navbar />
                      {children}
                    </div>
                  </body>
                </BrowserRouter>
              </CssBaseline>
            </CustomThemeProvider>
          </ConfigContext>
        </Provider>
      </>
    </html>
  )
}
