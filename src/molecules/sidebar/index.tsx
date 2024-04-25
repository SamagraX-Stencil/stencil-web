import { useState, useEffect } from 'react'
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
import HistoryIcon from '@mui/icons-material/History'
import HelpIcon from '@mui/icons-material/Help'
import FeedbackIcon from '@mui/icons-material/Feedback'
import LogoutIcon from '@mui/icons-material/Logout'
import { useColorPalates } from '../theme-provider/hooks'


export const Sidebar = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean
  onToggle: () => void
}) => {
  const [config, setConfig] = useState<{
    showLangSwitcher: boolean
    languages: { code: string; label: string }[]
    showProfileIcon: boolean
    profileText: string
    links: { label: string; icon: string; route: string }[]
    showLogoutButton: boolean
    logoutButtonLabel: string
  } | null>(null)
  const [activeLanguage, setActiveLanguage] = useState<string>('en')
  useEffect(() => {
    import('./../../../app.config.json').then((data) => {
      setConfig(data.component.sidebar)
    })
  }, [])

  const handleLanguageClick = (langCode: string) => {
    setActiveLanguage(langCode)
    onToggle()
  }

  const handleItemClick = () => {
    onToggle()
  }
  const theme = useColorPalates()

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={onToggle}
        PaperProps={{
          sx: {
            backgroundColor: theme.primary.dark,
            color: 'white',
            '& .MuiDrawer-paper': {
              backgroundColor: theme.primary.dark,
              color: 'white',
            },
          },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          {config && (
            <List>
              {config.showLangSwitcher && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleItemClick}>
                    <ListItemIcon>
                      <ArrowBackIcon sx={{color: theme.primary.light}}/>
                    </ListItemIcon>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      {config.languages.map((lang, index) => (
                        <button
                          key={index}
                          id={lang.code}
                          className={`Sidemenu_button ${
                            lang.code === activeLanguage ? 'active' : ''
                          }`}
                          style={{
                            borderTopLeftRadius: index === 0 ? '10px' : '0',
                            borderBottomLeftRadius: index === 0 ? '10px' : '0',
                            borderTopRightRadius:
                              index === config.languages.length - 1
                                ? '10px'
                                : '0',
                            borderBottomRightRadius:
                              index === config.languages.length - 1
                                ? '10px'
                                : '0',
                            backgroundColor:
                              lang.code === activeLanguage
                                ? '#00FF00'
                                : '#FFFFFF',
                            border: '1px solid #000',
                            width: '60px',
                            height: '30px',
                            padding: '5px',
                          }}
                          onClick={() => handleLanguageClick(lang.code)}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </ListItemButton>
                </ListItem>
              )}

              {config.showProfileIcon && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{color: theme.primary.light}}>
                      <AccountCircleIcon sx={{color: theme.primary.light}}/>
                    </ListItemIcon>
                    <ListItemText primary={config.profileText} sx={{color: theme.primary.light}} />
                  </ListItemButton>
                </ListItem>
              )}

              {config.links.map((link, index) => (
                <div key={index}>
                  <ListItem
                    disablePadding
                    sx={{ paddingTop: '10px', paddingBottom: '10px' }}
                  >
                    <ListItemButton>
                      <ListItemIcon sx={{color: theme.primary.light}}>{getIconComponent(link.icon)}</ListItemIcon>
                      <ListItemText primary={link.label} sx={{color: theme.primary.light}} />
                      <ChevronRightIcon sx={{color: theme.primary.light}} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}

              {config.showLogoutButton && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon sx={{color: theme.primary.light}} />
                    </ListItemIcon>
                    <ListItemText primary={config.logoutButtonLabel} sx={{color: theme.primary.light}} />
                    <ChevronRightIcon sx={{color: theme.primary.light}} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          )}
        </Box>
      </Drawer>
    </div>
  )
}

const getIconComponent = (iconName: string) => {
  const theme = useColorPalates()
  switch (iconName) {
    case 'HistoryIcon':
      return <HistoryIcon sx={{color: theme.primary.light}} />
    case 'HelpIcon':
      return <HelpIcon sx={{color: theme.primary.light}} />
    case 'FeedbackIcon':
      return <FeedbackIcon sx={{color: theme.primary.light}}/>
    default:
      return null
  }
}

export default Sidebar