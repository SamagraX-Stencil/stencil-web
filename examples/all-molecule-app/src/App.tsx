import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Components from './components'
import { Navbar } from './components/navbar'

// import AdminRoute from './components/InputForm'
import {
  ComingSoonPage,
  DowntimePage,
  FAQPage,
  FeedbackPage,
  HistoryPage,
  HomePage,
  LaunchPage,
  LoginMobileAadharPage,
  OtpPage,
} from '@stencil/pages'
import { ChatUI, ShareButtons } from '@stencil/molecules'

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginMobileAadharPage />} />
          <Route
            path="/login-mobile-aadhar-page"
            element={<LoginMobileAadharPage />}
          />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/history-page" element={<HistoryPage />} />
          <Route path="/coming-soon-page" element={<ComingSoonPage />} />
          <Route path="/faq-page" element={<FAQPage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/downtime-page" element={<DowntimePage />} />
          <Route path="/feedback-page" element={<FeedbackPage />} />
          <Route path="/launch-page" element={<LaunchPage />} />
          <Route path="/share-buttons" element={<ShareButtons />} />
          <Route path="/chat-ui" element={<ChatUI />} />
          <Route path="/molecules" element={<Components />} />
          {/* <Route path="/admin" element={<AdminRoute />} /> */}
        </Routes>
      </>
    </>
  )
}
export default App
