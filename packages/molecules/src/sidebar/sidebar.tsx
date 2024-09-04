import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import router from 'next/router';

import { Logout, AccountCircle, ArrowBack, ChevronRight } from '@mui/icons-material';
import NewLanguagePicker from '../language-picker/languagePicker';
import { SelectChangeEvent } from '@mui/material';

type Link = {
  label: string;
  icon: React.ReactElement;
  route: string;
};

type Language = {
  name: string;
  value: string;
};

type SidebarStyle = {
  sidebar?: React.CSSProperties;
  drawer?: React.CSSProperties;
  list?: React.CSSProperties;
  listItem?: React.CSSProperties;
  listItemButton?: React.CSSProperties;
  profileText?: React.CSSProperties;
  icon?: React.CSSProperties;
};

type LangStyle = {
  formControlStyle?: object;
  selectStyle?: object;
  menuItemStyle?: object;
};

type SidebarPropsBase = {
  isOpen: boolean;
  onToggle: () => void;
  showProfileIcon?: boolean;
  showLangSwitcher?: boolean;
  profileText?: string;
  links: Link[];
  handleLogOutButton: () => void;
  style?: SidebarStyle;
  children?: React.ReactNode;
};

type SidebarPropsWithLangSwitcher = SidebarPropsBase & {
  showLangSwitcher: true;
  languages: Language[];
  activeLanguage: string;
  handleLanguageClick: (event: SelectChangeEvent<string>) => void;
  langPickerStyle?: LangStyle;
};

type SidebarPropsWithoutLangSwitcher = SidebarPropsBase & {
  showLangSwitcher?: false;
  languages?: never;
  activeLanguage?: never;
  handleLanguageClick?: never;
  langPickerStyle?: never;
};

type SidebarProps = SidebarPropsWithLangSwitcher | SidebarPropsWithoutLangSwitcher;

const NewSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  showProfileIcon = false,
  showLangSwitcher = false,
  profileText,
  links = [],
  handleLogOutButton,
  languages,
  activeLanguage,
  handleLanguageClick,
  langPickerStyle,
  style = {},
  children,
}) => {
  const handleItemClick = () => {
    onToggle();
  };

  return (
    <div style={style.sidebar}>
      <Drawer open={isOpen} onClose={onToggle} sx={{ '& .MuiDrawer-paper': { ...style.drawer } }}>
        <Box sx={{ ...style.list }} role="presentation">
          <List>
            {showLangSwitcher && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleItemClick}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <ListItemIcon>
                    <ArrowBack sx={{ fontSize: '35px', ...style.icon }} />
                  </ListItemIcon>
                  {languages && (
                    <NewLanguagePicker
                      languages={languages}
                      activeLanguage={activeLanguage}
                      handleLanguageClick={handleLanguageClick}
                      style={langPickerStyle}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )}

            {showProfileIcon && (
              <div>
                <ListItem disablePadding sx={{ marginBottom: '10px' }}>
                  <ListItemButton sx={style.listItemButton}>
                    <ListItemIcon>
                      <AccountCircle sx={{ fontSize: '50px', ...style.icon }} />
                    </ListItemIcon>
                    <ListItemText primary={profileText} sx={style.profileText} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ backgroundColor: '#999' }} />
              </div>
            )}

            {links.map((link, index) => (
              <div key={index}>
                <ListItem
                  disablePadding
                  sx={style.listItem}
                  onClick={() => {
                    handleItemClick();
                    router.push(link.route);
                  }}
                >
                  <ListItemButton sx={style.listItemButton}>
                    <ListItemIcon sx={{ ...style.icon }}>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.label} sx={style.profileText} />
                    <ChevronRight sx={{ fontSize: '35px' }} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ backgroundColor: '#999' }} />
              </div>
            ))}

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogOutButton}
                sx={{ marginTop: '10px', ...style.listItemButton }}
              >
                <ListItemIcon>
                  <Logout sx={{ fontSize: '35px', ...style.icon }} />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
                <ChevronRight sx={{ fontSize: '35px' }} />
              </ListItemButton>
            </ListItem>
          </List>
          {children}
        </Box>
      </Drawer>
    </div>
  );
};

export default NewSidebar;
