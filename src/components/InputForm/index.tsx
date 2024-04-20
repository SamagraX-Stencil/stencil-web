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
import { useConfigContext } from '../../context/configContext'

const AdminRoute = () => {
  const { handleSaveButton, handleResetButton } = useConfigContext()
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
        <Button
          variant="outlined"
          sx={{ width: '120px' }}
          onClick={() => handleResetButton()}
        >
          Reset
        </Button>
        <Box sx={{ width: '10px' }} />
        <Button
          variant="contained"
          sx={{ width: '120px' }}
          onClick={() => handleSaveButton()}
        >
          Save
        </Button>
        <Box sx={{ width: '20px' }} />
      </Box>
    </Box>
  )
}

export default AdminRoute
