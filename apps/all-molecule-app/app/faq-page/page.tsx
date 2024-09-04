'use client'
import React, { useCallback } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CallRoundedIcon from '@mui/icons-material/Call'
import { Avatar } from '@mui/material'
import ComingSoonPage from '../coming-soon-page/page'
import { useColorPalates } from '../../provider/theme-provider/hooks'
import { useConfig } from '../../provider/config-provider/hook'

const FAQPage: React.FC = () => {
  // const t = useLocalization()
  const theme = useColorPalates()
  const config = useConfig('component', 'faqPage')

  const downloadPDFHandler = useCallback(() => {
    const link: any = config?.faqManualPdfLink
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    // window.open(link);

    fetch(proxyUrl + link, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = link
        a.download = `User_Manual_For_VAWs.pdf`

        document.body.appendChild(a)
        a.click()

        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [config?.faqManualPdfLink])

  const handleContactClick = useCallback(() => {
    const phoneNumber = `tel:${config?.faqPhoneNumber}`
    window.location.href = phoneNumber
  }, [config?.faqPhoneNumber])

  // if (!config?.showFaqPage) {
  //   return <ComingSoonPage />
  // } else
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <Box className={styles.main}>
        <Box m={3}>
          <Typography
            data-testid="faq-page-title"
            variant="h4"
            sx={{ fontWeight: '600', color: theme?.primary?.main }}
          >
            FAQs
            {/* {t('label.faqs')} */}
          </Typography>
        </Box>
        <Box>
          {/* {config?.faqShowPdfButton && ( */}
          <Box className={styles.manualButtons} m={3}>
            <Button
              data-testid="faq-page-manual-button"
              onClick={downloadPDFHandler}
              variant="contained"
              sx={{
                textTransform: 'none',
                backgroundColor: theme?.primary?.main,
                '&:hover': { backgroundColor: theme?.primary?.main },
              }}
            >
              User Manual - For VAWs
              {/* {t('label.manual')} */}
            </Button>
          </Box>
          {/* )} */}
          {/* {config?.faqShowCallBox && ( */}
          <Box
            className={styles.dialerBox}
            m={3}
            data-testid="faq-page-call-box"
          >
            <Box p={1.5}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', marginTop: '20px' }}
              >
                To connect with call centre
                {/* {t('message.dial_description')} */}
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
                  Dial
                  {/* {`${t('label.dial'
                    )} ${config?.faqPhoneNumber}`} */}
                </Typography>
              </Button>
            </Box>
          </Box>
          {/* )} */}
        </Box>
      </Box>
    </>
  )
}

export default FAQPage
