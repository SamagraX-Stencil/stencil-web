import { Box, Button } from '@mui/material'
import LogInPage from './logInPage'
import CommingSoonPage from './commingSoonPage'
import DownTimePage from './downTimePage'
import FaqPage from './faqPage'
import FeedBackPage from './feedbackPage'
import HistoryPage from './historyPage'
import HomePage from './homePage'
import LaunchPage from './launchPage'
import NavbarInput from './navbar'
import OtpPageInput from './otpPage'
import SidebarInput from './sidebarInput'
import VoiceRecorderInput from './voiceRecorderInput'

const AdminRoute = () => {
  return (
    <Box sx={{ margin: 10, overflow: 'auto', height: '90vh' }}>
      <LogInPage />
      <CommingSoonPage />
      <DownTimePage />
      <FaqPage />
      <FeedBackPage />
      <HistoryPage />
      <HomePage />
      <LaunchPage />
      <NavbarInput />
      <OtpPageInput />
      <SidebarInput />
      <VoiceRecorderInput />
      <Box
        sx={{
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="outlined" sx={{ width: '120px' }}>
          Reset
        </Button>
        <Box sx={{ width: '10px' }} />
        <Button variant="contained" sx={{ width: '120px' }}>
          Save
        </Button>
        <Box sx={{ width: '20px' }} />
      </Box>
    </Box>
  )
}

export default AdminRoute
