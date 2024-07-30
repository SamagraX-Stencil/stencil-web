import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {
  Logout,
  Feedback,
  Help,
  History,
  AccountCircle,
  ArrowBack,
  ChevronRight,
} from '@mui/icons-material';
import configObj from '@samagra-x/stencil-config-manager';
import { NewLanguagePicker } from '../language-picker';

type Link = {
  label: string;
  icon: string;
  route: string;
};

type Language = {
  name: string;
  value: string;
};

type SidebarPropsBase = {
  isOpen: boolean;
  onToggle: () => void;
  showProfileIcon?: boolean;
  showLangSwitcher?: boolean;
  profileText?: string;
  links: Link[];
  handleLogOutButton: () => void;
};

type SidebarPropsWithLangSwitcher = SidebarPropsBase & {
  showLangSwitcher: true;
  languages: Language[];
  activeLanguage: string;
  handleLanguageClick: () => void;
};

type SidebarPropsWithoutLangSwitcher = SidebarPropsBase & {
  showLangSwitcher?: false;
  languages?: never;
  activeLanguage?: never;
  handleLanguageClick?: never;
};

type SidebarProps = SidebarPropsWithLangSwitcher | SidebarPropsWithoutLangSwitcher;

export const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const [config, setConfig] = useState<{
    showLangSwitcher: boolean;
    languages: { code: string; label: string }[];
    showProfileIcon: boolean;
    profileText: string;
    links: { label: string; icon: string; route: string }[];
    showLogoutButton: boolean;
    logoutButtonLabel: string;
  } | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string>('en');
  useEffect(() => {
    if (configObj && configObj.component && configObj.component.sidebar) {
      setConfig(configObj.component.sidebar);
    }
  }, []);

  const handleLanguageClick = (langCode: string) => {
    setActiveLanguage(langCode);
    onToggle();
  };
  // useEffect(() => {
  //   console.log(activeLanguage, 'ankit')
  //   setLocale(activeLanguage)
  // }, [activeLanguage])

  const handleItemClick = () => {
    onToggle();
  };

  return (
    <div>
      <Drawer open={isOpen} onClose={onToggle}>
        <Box sx={{ width: 250 }} role="presentation">
          {config && (
            <List>
              {config.showLangSwitcher && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleItemClick}>
                    <ListItemIcon>
                      <ArrowBack />
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
                              index === config.languages.length - 1 ? '10px' : '0',
                            borderBottomRightRadius:
                              index === config.languages.length - 1 ? '10px' : '0',
                            backgroundColor: lang.code === activeLanguage ? '#00FF00' : '#FFFFFF',
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
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={config.profileText} />
                  </ListItemButton>
                </ListItem>
              )}

              {config.links.map((link, index) => (
                <div key={index}>
                  <ListItem disablePadding sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <ListItemButton>
                      <ListItemIcon>{getIconComponent(link.icon)}</ListItemIcon>
                      <ListItemText primary={link.label} />
                      <ChevronRight />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}

              {config.showLogoutButton && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary={config.logoutButtonLabel} />
                    <ChevronRight />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'HistoryIcon':
      return <History />;
    case 'HelpIcon':
      return <Help />;
    case 'FeedbackIcon':
      return <Feedback />;
    default:
      return null;
  }
};

export default Sidebar;

const NewSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  showProfileIcon = false,
  showLangSwitcher = false,
  profileText,
  links,
  handleLogOutButton,
  languages,
  activeLanguage,
  handleLanguageClick,
}) => {
  const handleItemClick = () => {
    onToggle();
  };

  return (
    <div>
      <Drawer open={isOpen} onClose={onToggle}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {showLangSwitcher && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleItemClick}>
                  <ListItemIcon>
                    <ArrowBack />
                  </ListItemIcon>
                  <NewLanguagePicker
                    languages={languages}
                    activeLanguage={activeLanguage}
                    handleLanguageClick={handleLanguageClick}
                  />
                </ListItemButton>
              </ListItem>
            )}

            {showProfileIcon && (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary={profileText} />
                </ListItemButton>
              </ListItem>
            )}

            {links.map((link, index) => (
              <div key={index}>
                <ListItem disablePadding sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <ListItemButton>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.label} />
                    <ChevronRight />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            ))}

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogOutButton}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
                <ChevronRight />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export { NewSidebar };
