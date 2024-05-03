import React, { useCallback } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CallRoundedIcon from '@mui/icons-material/Call'
import { Avatar } from '@mui/material'
import { useBotAppColorPalates } from '@repo/hooks'
import { useFlags } from 'flagsmith/react'
import ComingSoonPage from '../coming-soon-page'
import { useLocalization } from '@repo/hooks'

const LocalFAQPage: React.FC = () => {
  const t = useLocalization()
  const theme = useBotAppColorPalates()
  const flags = useFlags([
    'show_faq_page',
    'show_dialer',
    'dialer_number',
    'show_pdf_buttons',
    'manual_pdf_link',
  ])

  const downloadPDFHandler = useCallback(() => {
    const link: any = flags?.[`manual_pdf_link`]?.value
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
  }, [flags])

  const handleContactClick = useCallback(() => {
    const phoneNumber = `tel:${flags.dialer_number.value}`
    window.location.href = phoneNumber
  }, [flags])

  if (!flags?.show_faq_page?.enabled) {
    return <ComingSoonPage />
  } else
    return (
      <>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <Box className={styles.main}>
          <Box m={3}>
            <Typography
              variant="h4"
              sx={{ fontWeight: '600', color: theme?.primary?.main }}
            >
              {t('label.faqs')}
            </Typography>
          </Box>
          <Box>
            {flags?.show_pdf_buttons?.enabled && (
              <Box className={styles.manualButtons} m={3}>
                <Button
                  onClick={downloadPDFHandler}
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: theme?.primary?.main,
                    '&:hover': { backgroundColor: theme?.primary?.main },
                  }}
                >
                  {t('label.manual')}
                </Button>
              </Box>
            )}
            {flags?.show_dialer?.enabled && (
              <Box className={styles.dialerBox} m={3}>
                <Box p={1.5}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {t('message.dial_description')}
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
                    <Typography variant="h5" fontWeight={600}>{`${t(
                      'label.dial'
                    )} ${flags.dialer_number.value}`}</Typography>
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </>
    )
}

export default LocalFAQPage
