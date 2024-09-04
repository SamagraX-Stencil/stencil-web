import React from 'react';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MicNoneIcon from '@mui/icons-material/MicNone';
import Button from '@mui/material/Button';
import styles from './style.module.css';
import { useLocalization } from '../../hooks';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useConfig } from '../../hooks/useConfig';

const Menu = () => {
  const router = useRouter();
  const theme = useColorPalates();
  const t = useLocalization();
  const isHome = router.pathname === '/';
  const isNotification = router.pathname === '/notifications';
  const config = useConfig('component', 'menu');

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleNotificationClick = () => {
    router.push('/notifications');
  };

  const handleTouchToSpeakClick = () => {
    router.push('/newchat?voice=true');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.buttonWrapper} data-testid="menu-home-button">
        <Button onClick={handleHomeClick} className={`${styles.btn}`}>
          {isHome ? <HomeIcon fontSize="large" /> : <HomeOutlinedIcon fontSize="large" />}
        </Button>
        <p className={styles.buttonText}>{t('label.menu_home')}</p>
      </div>
      {config?.showMicButton && (
        <div className={styles.middleButton} data-testid="menu-mic-button">
          <Button
            onClick={handleTouchToSpeakClick}
            className={`${styles.touchToSpeakButton}`}
            sx={{
              backgroundColor: theme?.primary?.main,
              color: theme?.primary?.contrastText,
              '&:hover': { backgroundColor: theme?.primary?.main },
            }}
            startIcon={<MicNoneIcon fontSize="inherit" />}
          >
            {t('label.menu_tap_text')}
          </Button>
        </div>
      )}
      <div className={styles.buttonWrapper} data-testid="menu-notification-button">
        <Button
          onClick={handleNotificationClick}
          className={styles.btn}
          disabled={!config?.showNotificationsPage}
        >
          {isNotification ? (
            <NotificationsIcon fontSize="large" />
          ) : (
            <NotificationsNoneIcon fontSize="large" />
          )}
        </Button>
        <p className={styles.buttonText}>{t('label.menu_notification')}</p>
      </div>
    </div>
  );
};

export default Menu;
