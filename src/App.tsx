import { Navbar } from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './molecules/login-mobile-aadhar-page'
import { Toaster } from 'react-hot-toast'
import Components from './components'
import OtpPage from './molecules/otp-page'
import HistoryPage from './molecules/history-page'

import ComingSoonPage from './molecules/coming-soon-page'
import DowntimePage from './molecules/downtime-page'
import FAQPage from './molecules/faq-page'

import LaunchPage from './molecules/launch-page'
import HomePage from './molecules/home-page'
import FeedbackPage from './molecules/feedback'
import ShareButtons from './molecules/share-buttons'
import { ChatUI } from './molecules/chat-ui'
import AdminRoute from './components/InputForm'

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login-mobile-aadhar-page" element={<LoginPage />} />
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
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </>
    </>
  )
}
export default App
