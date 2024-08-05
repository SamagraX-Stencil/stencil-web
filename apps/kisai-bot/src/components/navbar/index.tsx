import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useConfig } from '../../hooks/useConfig';
import Sidebar from '../sidebar';
import { recordUserLocation } from '../../utils/location';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import toast from 'react-hot-toast';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Navbar: React.FC = () => {
  const router = useRouter();
  const config = useConfig('component', 'navbar');
  const botConfig = useConfig('component', 'botDetails');
  const context = useContext(AppContext);
  const t = useLocalization();
  const theme = useColorPalates();
  const {
    showHamburgerMenu,
    showHomeIcon,
    showCenterLogo,
    centerLogoSrc,
    showRightLogo1,
    rightLogo1Src,
    showRightLogo2,
    rightLogo2Src,
    showRightLogo3,
    rightLogo3Src,
    centerLogoSize,
    newChatButtonColor,
  } = config;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  document.documentElement.style.setProperty(
    '--scrollbar-thumb-color',
    botConfig?.scrollbarColor || '#030311'
  );

  const toggleSidebar = () => {
    if (context?.isMsgReceiving) {
      toast.error(`${t('error.wait_new_chat')}`);
      return;
    }
    setSidebarOpen(!isSidebarOpen);
  };

  const newChatHandler = useCallback(() => {
    if (context?.isMsgReceiving) {
      toast.error(`${t('error.wait_new_chat')}`);
      return;
    }

    recordUserLocation();

    const newConversationId = uuidv4();
    sessionStorage.setItem('conversationId', newConversationId);
    sessionStorage.removeItem('tags');
    context?.setShowInputBox(true);
    if (context?.audioElement) context?.audioElement.pause();
    if (context?.setAudioPlaying) context?.setAudioPlaying(false);
    context?.setConversationId(newConversationId);
    context?.setMessages([]);
    context?.setIsMsgReceiving(false);
    context?.setLoading(false);
    router.push('/');
  }, [context, t, router]);

  console.log({ config, path: router.pathname });
  if (router.pathname === '/login' || router.pathname === '/otp') return null;

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'var(--bg-color)',
          boxShadow: 'none',
          borderBottom: '1px solid lightgray',
          height: '80px',
          fontFamily: 'NotoSans-Regular',
        }}
      >
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {router.pathname !== '/chat' &&
              router.pathname !== '/weather' &&
              router.pathname !== '/newchat' &&
              showHamburgerMenu && (
                <IconButton
                  data-testid="navbar-hamburger-menu"
                  size="large"
                  edge="start"
                  color="primary"
                  aria-label="open drawer"
                  sx={{
                    mr: 2,
                    width: '50px',
                    height: '50px',
                  }}
                  onClick={toggleSidebar}
                >
                  <MenuIcon sx={{ fontSize: '50px' }} />
                </IconButton>
              )}
            {router.pathname === '/weather' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <IconButton
                  color="primary"
                  size="large"
                  edge="start"
                  aria-label="home"
                  style={{
                    fontSize: '2rem',
                    width: '28px',
                    height: '28px',
                    margin: 0,
                  }}
                  onClick={() => router.push('/')}
                >
                  <KeyboardBackspaceIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              </div>
            )}
            {(router.pathname === '/chat' || router.pathname === '/newchat') && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <IconButton
                  color="primary"
                  size="large"
                  edge="start"
                  aria-label="home"
                  style={{
                    fontSize: '2rem',
                    width: '28px',
                    height: '28px',
                    margin: 0,
                  }}
                  onClick={newChatHandler}
                >
                  <KeyboardBackspaceIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                <Typography
                  data-testid="navbar-new-chat"
                  variant="body1"
                  color={newChatButtonColor ?? 'black'}
                  sx={{
                    fontSize: '26px',
                    marginLeft: '5px',
                    fontFamily: 'NotoSans-Medium',
                    fontWeight: '500',
                  }}
                >
                  {t('label.new_chat')}
                </Typography>
              </div>
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            {showCenterLogo && (
              <div>
                <img
                  data-testid="navbar-center-img"
                  src={centerLogoSrc}
                  alt="Center Logo"
                  style={{ maxHeight: centerLogoSize }}
                />
              </div>
            )}
          </div>

          <div data-testid="navbar-right-logos">
            {showRightLogo1 && (
              <img src={rightLogo1Src} alt={`Right Logo 1`} style={{ maxHeight: '60px' }} />
            )}
            {showRightLogo2 && (
              <img src={rightLogo2Src} alt={`Right Logo 2`} style={{ maxHeight: '60px' }} />
            )}
            {showRightLogo3 && (
              <img src={rightLogo3Src} alt={`Right Logo 3`} style={{ maxHeight: '60px' }} />
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  );
};

export default Navbar;
