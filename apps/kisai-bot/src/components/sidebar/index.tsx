import React, { useState, useContext, useEffect } from 'react';
import HelpIcon from '@mui/icons-material/QuestionMark';
import FeedbackIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useConfig } from '../../hooks/useConfig';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import router from 'next/router';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import BhashiniImg from '../../assets/images/bhashinilogo.png';
import darshanLogo from '../../assets/images/darshan-logo.png';
import styles from './style.module.css';
import Image from 'next/image';
import NewSidebar from '@samagra-x/stencil-molecules/lib/sidebar/sidebar';
import { SelectChangeEvent } from '@mui/material';

export const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    const storedLang = localStorage.getItem('locale');
    if (storedLang && router?.query?.lang && storedLang !== router?.query?.lang) {
      localStorage.setItem('locale', (router?.query?.lang as string) ?? 'en');
    }
    return (router?.query?.lang as string) || storedLang || 'en';
  });

  const [cookie, setCookie, removeCookie] = useCookies();
  const context = useContext(AppContext);
  const config = useConfig('component', 'sidebar');
  const theme = useColorPalates();
  const t = useLocalization();

  useEffect(() => {
    context?.setLocale(activeLanguage);
  }, [activeLanguage, context]);

  const handleLanguageClick = (event: SelectChangeEvent<string>) => {
    console.log('hjhjhjhjhj', event);
    setActiveLanguage(event.target.value);
    localStorage.setItem('locale', event.target.value);
    onToggle();
  };

  function logout() {
    removeCookie('access_token', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
    context?.setMessages([]);
    router.push('/login');
    if (typeof window !== 'undefined') window.location.reload();
  }

  console.log('debug', { config });
  return (
    // <div style={{ background: config?.sidebarBackground ?? theme.primary.main }}>
    //   <Drawer
    //     open={isOpen}
    //     onClose={onToggle}
    //     sx={{
    //       '& .MuiDrawer-paper': {
    //         width: 300,
    //         height: '100dvh',
    //         borderTopRightRadius: '15px',
    //         borderBottomRightRadius: '15px',
    //         backgroundColor: config?.sidebarBackground ?? theme.primary.main,
    //       },
    //     }}
    //   >
    //     <Box
    //       style={{
    //         background: config?.sidebarBackground ?? theme.primary.main,
    //         height: '100%',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'space-between',
    //       }}
    //       role="presentation"
    //     >
    //       {config && (
    //         <List data-testid="sidebar-list">
    //           {config.showLangSwitcher && (
    //             <ListItem disablePadding>
    //               <ListItemButton onClick={handleItemClick}>
    //                 <ListItemIcon>
    //                   <ArrowBackIcon
    //                     sx={{
    //                       color: theme.primary.contrastText,
    //                       fontSize: '35px',
    //                     }}
    //                   />
    //                 </ListItemIcon>
    //                 <div
    //                   data-testid="sidebar-language-toggle"
    //                   style={{
    //                     display: 'flex',
    //                     justifyContent: 'flex-end',
    //                     width: '100%',
    //                   }}
    //                 >
    //                   <Button
    //                     className={`Sidemenu_button ${
    //                       activeLanguage === config?.languageCode1 ? 'active' : ''
    //                     }`}
    //                     style={{
    //                       borderTopLeftRadius: '10px',
    //                       borderBottomLeftRadius: '10px',
    //                       borderTopRightRadius: '0',
    //                       borderBottomRightRadius: '0',
    //                       backgroundColor:
    //                         activeLanguage === config?.languageCode1
    //                           ? config?.languageToggleColor
    //                           : '#FFFFFF',
    //                       border: 'none',
    //                       width: '60px',
    //                       height: '30px',
    //                       padding: '5px',
    //                     }}
    //                     onClick={() => handleLanguageClick(config?.languageCode1)}
    //                   >
    //                     {config?.languageName1}
    //                   </Button>

    //                   <Button
    //                     className={`Sidemenu_button ${
    //                       activeLanguage === config?.languageCode2 ? 'active' : ''
    //                     }`}
    //                     style={{
    //                       borderTopLeftRadius: '0',
    //                       borderBottomLeftRadius: '0',
    //                       borderTopRightRadius: '10px',
    //                       borderBottomRightRadius: '10px',
    //                       backgroundColor:
    //                         config?.languageCode2 === activeLanguage
    //                           ? config?.languageToggleColor
    //                           : '#FFFFFF',
    //                       border: 'none',
    //                       width: '60px',
    //                       height: '30px',
    //                       padding: '5px',
    //                     }}
    //                     onClick={() => handleLanguageClick(config?.languageCode2)}
    //                   >
    //                     {config?.languageName2}
    //                   </Button>
    //                 </div>
    //               </ListItemButton>
    //             </ListItem>
    //           )}

    //           {config.showProfileIcon && (
    //             <div>
    //               <ListItem disablePadding sx={{ marginBottom: '10px' }}>
    //                 <ListItemButton sx={{ color: theme.primary.contrastText }}>
    //                   <ListItemIcon>
    //                     <AccountCircleIcon
    //                       sx={{
    //                         color: theme.primary.contrastText,
    //                         fontSize: '50px',
    //                       }}
    //                     />
    //                   </ListItemIcon>
    //                   <ListItemText
    //                     data-testid="sidebar-welcome-text"
    //                     primary={t('label.welcome')}
    //                     secondary={
    //                       config?.showPhoneNumber &&
    //                       localStorage.getItem('phoneNumber') &&
    //                       `+91 ${localStorage.getItem('phoneNumber')}`
    //                     }
    //                     secondaryTypographyProps={{ color: 'white' }}
    //                     sx={{ color: theme.primary.contrastText }}
    //                   />
    //                 </ListItemButton>
    //               </ListItem>
    //               <Divider sx={{ backgroundColor: '#999' }} />
    //             </div>
    //           )}

    //           {config?.historyPage && (
    //             <div>
    //               <ListItem
    //                 data-testid="sidebar-history-button"
    //                 disablePadding
    //                 sx={{
    //                   paddingTop: '10px',
    //                   paddingBottom: '10px',
    //                   color: theme.primary.contrastText,
    //                   marginTop: '10px',
    //                   marginBottom: '10px',
    //                 }}
    //                 onClick={() => {
    //                   handleItemClick();
    //                   router.push(`/history`);
    //                 }}
    //               >
    //                 <ListItemButton>
    //                   <ListItemIcon sx={{ color: theme.primary.contrastText }}>
    //                     {getIconComponent('HistoryIcon')}
    //                   </ListItemIcon>
    //                   <ListItemText
    //                     primary={t(`label.chats`)}
    //                     sx={{ color: theme.primary.contrastText }}
    //                   />
    //                   <ChevronRightIcon sx={{ fontSize: '35px' }} />
    //                 </ListItemButton>
    //               </ListItem>
    //               <Divider sx={{ backgroundColor: '#999' }} />
    //             </div>
    //           )}
    //           {config?.faqPage && (
    //             <div>
    //               <ListItem
    //                 data-testid="sidebar-faq-button"
    //                 disablePadding
    //                 sx={{
    //                   paddingTop: '10px',
    //                   paddingBottom: '10px',
    //                   color: theme.primary.contrastText,
    //                   marginTop: '10px',
    //                   marginBottom: '10px',
    //                 }}
    //                 onClick={() => {
    //                   handleItemClick();
    //                   router.push(`/faq`);
    //                 }}
    //               >
    //                 <ListItemButton>
    //                   <ListItemIcon sx={{ color: theme.primary.contrastText }}>
    //                     {getIconComponent('HelpIcon')}
    //                   </ListItemIcon>
    //                   <ListItemText
    //                     primary={t(`label.faqs`)}
    //                     sx={{ color: theme.primary.contrastText }}
    //                   />
    //                   <ChevronRightIcon sx={{ fontSize: '35px' }} />
    //                 </ListItemButton>
    //               </ListItem>
    //               <Divider sx={{ backgroundColor: '#999' }} />
    //             </div>
    //           )}
    //           {config?.feedbackPage && (
    //             <div>
    //               <ListItem
    //                 data-testid="sidebar-feedback-button"
    //                 disablePadding
    //                 sx={{
    //                   paddingTop: '10px',
    //                   paddingBottom: '10px',
    //                   color: theme.primary.contrastText,
    //                   marginTop: '10px',
    //                   marginBottom: '10px',
    //                 }}
    //                 onClick={() => {
    //                   handleItemClick();
    //                   router.push(`/feedback`);
    //                 }}
    //               >
    //                 <ListItemButton>
    //                   <ListItemIcon sx={{ color: theme.primary.contrastText }}>
    //                     {getIconComponent('FeedbackIcon')}
    //                   </ListItemIcon>
    //                   <ListItemText
    //                     primary={t(`label.feedback`)}
    //                     sx={{ color: theme.primary.contrastText }}
    //                   />
    //                   <ChevronRightIcon sx={{ fontSize: '35px' }} />
    //                 </ListItemButton>
    //               </ListItem>
    //               <Divider sx={{ backgroundColor: '#999' }} />
    //             </div>
    //           )}

    //           {config.showLogoutButton && (
    //             <ListItem disablePadding data-testid="sidebar-logout-button">
    //               <ListItemButton
    //                 sx={{
    //                   color: theme.primary.contrastText,
    //                   marginTop: '10px',
    //                 }}
    //                 onClick={logout}
    //               >
    //                 <ListItemIcon>
    //                   <LogoutIcon
    //                     sx={{
    //                       color: theme.primary.contrastText,
    //                       fontSize: '35px',
    //                     }}
    //                   />
    //                 </ListItemIcon>
    //                 <ListItemText primary={t('label.logout')} />
    //                 <ChevronRightIcon sx={{ fontSize: '35px' }} />
    //               </ListItemButton>
    //             </ListItem>
    //           )}
    //         </List>
    //       )}
    //       {(config?.showBhashiniLogo || config?.showDarshanLogo) && (
    //         <div
    //           className={styles.user}
    //           style={{
    //             background: 'var(--bg-color)',
    //             flexDirection: 'column',
    //             fontSize: '12px',
    //           }}
    //         >
    //           <div
    //             style={{
    //               color: 'var(--secondarygreen)',
    //               textAlign: 'left',
    //               width: '100%',
    //             }}
    //           >
    //             Powered by:
    //           </div>
    //           <div
    //             style={{
    //               display: 'flex',
    //               justifyContent: 'space-between',
    //               width: '100%',
    //             }}
    //           >
    //             {config?.showBhashiniLogo && (
    //               <Image src={BhashiniImg} alt="" width={180} height={45} />
    //             )}
    //             {config?.showDarshanLogo && (
    //               <Image src={darshanLogo} alt="" width={55} height={45} />
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </Box>
    //   </Drawer>
    // </div>
    <NewSidebar
      isOpen={isOpen}
      onToggle={onToggle}
      showProfileIcon={true}
      showLangSwitcher={true}
      profileText={t('label.welcome')}
      links={[
        {
          label: t(`label.chats`),
          icon: <ChatBubbleOutlineIcon sx={{ fontSize: '35px' }} />,
          route: '/history',
        },
        { label: t(`label.faqs`), icon: <HelpIcon sx={{ fontSize: '35px' }} />, route: '/faq' },
        {
          label: t(`label.feedback`),
          icon: <FeedbackIcon sx={{ fontSize: '35px' }} />,
          route: '/feedback',
        },
      ]}
      handleLogOutButton={logout}
      languages={[
        {
          name: 'ENG',
          value: 'en',
        },
        {
          name: 'हिंदी',
          value: 'hi',
        },
      ]}
      activeLanguage={activeLanguage}
      handleLanguageClick={handleLanguageClick}
      style={{
        sidebar: {
          background: config?.sidebarBackground ?? theme.primary.main,
        },
        drawer: {
          width: 300,
          height: '100dvh',
          borderTopRightRadius: '15px',
          borderBottomRightRadius: '15px',
          backgroundColor: config?.sidebarBackground ?? theme.primary.main,
        },
        list: {
          background: config?.sidebarBackground ?? theme.primary.main,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        icon: {
          color: theme.primary.contrastText,
        },
        listItemButton: {
          color: theme.primary.contrastText,
        },
        profileText: {
          color: theme.primary.contrastText,
        },
        listItem: {
          paddingTop: '10px',
          paddingBottom: '10px',
          color: theme.primary.contrastText,
          marginTop: '10px',
          marginBottom: '10px',
        },
      }}
      langPickerStyle={{
        formControlStyle: {
          background: theme?.primary?.main,
        },
        selectStyle: {
          color: theme?.primary?.contrastText,
        },
      }}
    >
      {(config?.showBhashiniLogo || config?.showDarshanLogo) && (
        <div
          className={styles.user}
          style={{
            background: 'var(--bg-color)',
            flexDirection: 'column',
            fontSize: '12px',
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
            {config?.showBhashiniLogo && <Image src={BhashiniImg} alt="" width={180} height={45} />}
            {config?.showDarshanLogo && <Image src={darshanLogo} alt="" width={55} height={45} />}
          </div>
        </div>
      )}
    </NewSidebar>
  );
};

export default Sidebar;
