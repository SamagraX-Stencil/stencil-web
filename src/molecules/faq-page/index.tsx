import React, { useCallback ,useState} from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CallRoundedIcon from '@mui/icons-material/Call'
import { useColorPalates } from '../../molecules/theme-provider/hooks'
import { Avatar,Modal,TextareaAutosize } from '@mui/material'
import { useUiConfig } from '../../hook/useConfig'

const FAQPage: React.FC = () => {
  const config = useUiConfig('component', 'faqs')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false); 
  }, []);

  const theme = useColorPalates()
  const downloadPDFHandler = useCallback(() => {
    console.log(config.userManualText ?? 'User Manual')
  }, [])


  const handleAskQuestionClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleContactClick = useCallback(() => {
    console.log(config.contactText ?? 'Contact User')
  }, [])

  return (
    <>
      <Box className={styles.main}>
        <Button
            onClick={handleAskQuestionClick}
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: theme?.primary?.main,
              '&:hover': { backgroundColor: theme?.primary?.main },
            }}
          >
            Ask a Question
          </Button>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', color: theme?.primary?.main }}
          >
            {config.title ?? 'Faq'}
          </Typography>
        </Box>
        {config?.userManualText && (
          <Box className={styles.manualButtons}>
            <Button
              onClick={downloadPDFHandler}
              variant="contained"
              sx={{
                textTransform: 'none',
                backgroundColor: theme?.primary?.main,
                '&:hover': { backgroundColor: theme?.primary?.main },
              }}
            >
              {config.userManualText ?? 'User Manual'}
            </Button>
          </Box>
        )}
        {config?.contactText && (
          <Box className={styles.dialerBox}>
            <Box p={1.5}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {config.contactDescriptionText ?? 'contact description'}
              </Typography>
            </Box>
            <Box px={2} display={'flex'} alignItems={'center'}>
              <Box>
                <Avatar
                  sx={{
                    bgcolor: theme.primary.main,
                    width: '5vh',
                    height: '5vh',
                  }}
                  alt="Call Icon"
                >
                  <CallRoundedIcon fontSize="medium" />
                </Avatar>
              </Box>
              <Button
                variant="text"
                size="large"
                onClick={handleContactClick}
                sx={{
                  textTransform: 'none',
                  color: theme?.primary?.main,
                  '&:hover': { color: theme?.primary?.main },
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  {config.contactText ?? 'Contact User'}
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              width: 400,
              bgcolor: 'white',
              border: '2px solid #ccc',
              padding:20,
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              top: '50%',
              left: '50%',  
              transform: 'translate(-50%, -50%)',
              outline:"none"
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '16px'}}>Ask a Question</Typography>  
            <TextareaAutosize
              maxRows={4}
              placeholder="Type your question here..."
              style={{ width: '100%', marginBottom: '16px',padding: '8px', borderRadius: '4px' }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: theme?.primary?.main, color: 'white', '&:hover': { backgroundColor: theme?.primary?.dark } }}
            >
              Submit
            </Button>
          </Box>
        </Modal>

      </Box>
    </>
  )
}

export default FAQPage

