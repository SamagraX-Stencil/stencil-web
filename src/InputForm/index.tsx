import { Box, Button } from '@mui/material'
import CommingSoonPage from './commingSoonPage'
import DownTimePage from './downTimePage'
import FaqPage from './faqPage'
import HistoryPage from './historyPage'
import HomePage from './homePage'
import LaunchPage from './launchPage'
import NavbarInput from './navbar'
import SidebarInput from './sidebarInput'
import VoiceRecorderInput from './voiceRecorderInput'
import { useConfigContext } from '../../context/configContext'
import LogInInputPage from './logInInputPage'
import FeedBackInputPage from './feedbackInputPage'
import OtpInputPage from './otpInputPage'
import { useState } from 'react'

const AdminRoute = () => {
  const { handleSaveButton, handleResetButton } = useConfigContext()
  const [shouldRerender, setShouldRerender] = useState(false)

  const handleSave = () => {
    handleSaveButton()
    setShouldRerender(!shouldRerender) // Toggle the value of shouldRerender
  }

  const handleReset = () => {
    handleResetButton()
    setShouldRerender(!shouldRerender) // Toggle the value of shouldRerender
  }

  return (
    <Box
      key={shouldRerender ? 1 : 0}
      sx={{ margin: 10, overflow: 'auto', height: '90vh' }}
    >
      <LogInInputPage />
      <CommingSoonPage />
      <DownTimePage />
      <FaqPage />
      <FeedBackInputPage />
      <HistoryPage />
      <HomePage />
      <LaunchPage />
      <NavbarInput />
      <OtpInputPage />
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
          onClick={() => handleReset()}
        >
          Reset
        </Button>
        <Box sx={{ width: '10px' }} />
        <Button
          variant="contained"
          sx={{ width: '120px' }}
          onClick={() => handleSave()}
        >
          Save
        </Button>
        <Box sx={{ width: '20px' }} />
      </Box>
    </Box>
  )
}

export default AdminRoute
