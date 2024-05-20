import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/QuestionMark'
import FeedbackIcon from '@mui/icons-material/ThumbUpOffAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { useBotConfig } from '@repo/hooks'
import { useBotAppColorPalates } from '@repo/hooks'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { AppContext } from '@repo/provider'
import { useLocalization } from '@repo/hooks'
import BhashiniImg from '../../assets/images/bhashinilogo.png'
import darshanLogo from '../../assets/images/darshan-logo.png'
import styles from './style.module.css'
import Image from 'next/image'

export const Sidebar = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean
  onToggle: () => void
}) => {
  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    const storedLang = localStorage.getItem('locale')
    return storedLang || 'en'
  })
  const router = useRouter()

  const [cookie, setCookie, removeCookie] = useCookies()
  const context = useContext(AppContext)
  const config = useBotConfig('component', 'sidebar')
  const theme = useBotAppColorPalates()
  const t = useLocalization()

  useEffect(() => {
    context?.setLocale(activeLanguage)
  }, [activeLanguage, context])

  const handleLanguageClick = (langCode: string) => {
    setActiveLanguage(langCode)
    localStorage.setItem('locale', langCode)
    onToggle()
  }

  const handleItemClick = () => {
    onToggle()
  }

  function logout() {
    removeCookie('access_token', { path: '/' })
    localStorage.clear()
    sessionStorage.clear()
    context?.setMessages([])
    router.push('/login')
    if (typeof window !== 'undefined') window.location.reload()
  }

  console.log('debug', { config })
  return (
    <div
      style={{ background: config?.sidebarBackground ?? theme.primary.main }}
    >
      <Drawer
        open={isOpen}
        onClose={onToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            height: '100vh',
            borderTopRightRadius: '15px',
            borderBottomRightRadius: '15px',
            backgroundColor: config?.sidebarBackground ?? theme.primary.main,
          },
        }}
      >
        <Box
          style={{
            background: config?.sidebarBackground ?? theme.primary.main,
          }}
          role="presentation"
        >
          {config && (
            <List>
              {config.showLangSwitcher && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleItemClick}>
                    <ListItemIcon>
                      <ArrowBackIcon
                        sx={{
                          color: theme.primary.contrastText,
                          fontSize: '35px',
                        }}
                      />
                    </ListItemIcon>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <button
                        className={`Sidemenu_button ${
                          activeLanguage === config?.languageCode1
                            ? 'active'
                            : ''
                        }`}
                        style={{
                          borderTopLeftRadius: '10px',
                          borderBottomLeftRadius: '10px',
                          borderTopRightRadius: '0',
                          borderBottomRightRadius: '0',
                          backgroundColor:
                            activeLanguage === config?.languageCode1
                              ? config?.languageToggleColor
                              : '#FFFFFF',
                          border: 'none',
                          width: '60px',
                          height: '30px',
                          padding: '5px',
                        }}
                        onClick={() =>
                          handleLanguageClick(config?.languageCode1)
                        }
                      >
                        {config?.languageName1}
                      </button>

                      <button
                        className={`Sidemenu_button ${
                          activeLanguage === config?.languageCode2
                            ? 'active'
                            : ''
                        }`}
                        style={{
                          borderTopLeftRadius: '0',
                          borderBottomLeftRadius: '0',
                          borderTopRightRadius: '10px',
                          borderBottomRightRadius: '10px',
                          backgroundColor:
                            config?.languageCode2 === activeLanguage
                              ? config?.languageToggleColor
                              : '#FFFFFF',
                          border: 'none',
                          width: '60px',
                          height: '30px',
                          padding: '5px',
                        }}
                        onClick={() =>
                          handleLanguageClick(config?.languageCode2)
                        }
                      >
                        {config?.languageName2}
                      </button>
                    </div>
                  </ListItemButton>
                </ListItem>
              )}

              {config.showProfileIcon && (
                <div>
                  <ListItem disablePadding sx={{ marginBottom: '10px' }}>
                    <ListItemButton sx={{ color: theme.primary.contrastText }}>
                      <ListItemIcon>
                        <AccountCircleIcon
                          sx={{
                            color: theme.primary.contrastText,
                            fontSize: '50px',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('label.welcome')}
                        secondary={
                          config?.showPhoneNumber &&
                          `+91 ${localStorage.getItem('phoneNumber')}`
                        }
                        secondaryTypographyProps={{ color: 'white' }}
                        sx={{ color: theme.primary.contrastText }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: '#999' }} />
                </div>
              )}

              {config?.historyPage && (
                <div>
                  <ListItem
                    disablePadding
                    sx={{
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      color: theme.primary.contrastText,
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                    onClick={() => {
                      handleItemClick()
                      router.push(`/history`)
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon sx={{ color: theme.primary.contrastText }}>
                        {getIconComponent('HistoryIcon')}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`label.chats`)}
                        sx={{ color: theme.primary.contrastText }}
                      />
                      <ChevronRightIcon sx={{ fontSize: '35px' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: '#999' }} />
                </div>
              )}
              {config?.faqPage && (
                <div>
                  <ListItem
                    disablePadding
                    sx={{
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      color: theme.primary.contrastText,
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                    onClick={() => {
                      handleItemClick()
                      router.push(`/faq`)
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon sx={{ color: theme.primary.contrastText }}>
                        {getIconComponent('HelpIcon')}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`label.faqs`)}
                        sx={{ color: theme.primary.contrastText }}
                      />
                      <ChevronRightIcon sx={{ fontSize: '35px' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: '#999' }} />
                </div>
              )}
              {config?.feedbackPage && (
                <div>
                  <ListItem
                    disablePadding
                    sx={{
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      color: theme.primary.contrastText,
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                    onClick={() => {
                      handleItemClick()
                      router.push(`/feedback`)
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon sx={{ color: theme.primary.contrastText }}>
                        {getIconComponent('FeedbackIcon')}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`label.feedback`)}
                        sx={{ color: theme.primary.contrastText }}
                      />
                      <ChevronRightIcon sx={{ fontSize: '35px' }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: '#999' }} />
                </div>
              )}

              {config.showLogoutButton && (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: theme.primary.contrastText,
                      marginTop: '10px',
                    }}
                    onClick={logout}
                  >
                    <ListItemIcon>
                      <LogoutIcon
                        sx={{
                          color: theme.primary.contrastText,
                          fontSize: '35px',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t('label.logout')} />
                    <ChevronRightIcon sx={{ fontSize: '35px' }} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          )}
          {config?.showBhashiniLogo && (
            <div
              className={styles.user}
              style={{
                background: 'var(--bg-color)',
                flexDirection: 'column',
                fontSize: '12px',
                position: 'absolute',
                top: 'auto',
                bottom: '10px',
              }}
            >
              <div
                style={{
                  color: 'var(--secondarygreen)',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                Powered by:
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Image src={BhashiniImg} alt="" width={180} height={45} />
                <Image src={darshanLogo} alt="" width={55} height={45} />
              </div>
            </div>
          )}
        </Box>
      </Drawer>
    </div>
  )
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'HistoryIcon':
      return <ChatBubbleOutlineIcon sx={{ fontSize: '35px' }} />
    case 'HelpIcon':
      return <HelpIcon sx={{ fontSize: '35px' }} />
    case 'FeedbackIcon':
      return <FeedbackIcon sx={{ fontSize: '35px' }} />
    default:
      return null
  }
}

export default Sidebar
