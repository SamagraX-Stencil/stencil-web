import React, { useCallback } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { component } from './../../../app.config.json'
import CallRoundedIcon from '@mui/icons-material/Call'
import { useColorPalates } from '../../molecules/theme-provider/hooks'
import { Avatar } from '@mui/material'
const { faqs } = component

const FAQPage: React.FC = () => {
  const theme = useColorPalates()
  const downloadPDFHandler = useCallback(() => {
    console.log(faqs.userManualText ?? 'User Manual')
  }, [])

  const handleContactClick = useCallback(() => {
    console.log(faqs.contactText ?? 'Contact User')
  }, [])

  return (
    <>
      <Box className={styles.main}>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', color: theme?.primary?.main }}
          >
            {faqs.title ?? 'Faq'}
          </Typography>
        </Box>
        {faqs?.userManualText && (
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
              {faqs.userManualText ?? 'User Manual'}
            </Button>
          </Box>
        )}
        {faqs?.contactText && (
          <Box className={styles.dialerBox}>
            <Box p={1.5}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {faqs.contactDescriptionText ?? 'contact description'}
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
                  {faqs.contactText ?? 'Contact User'}
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default FAQPage
