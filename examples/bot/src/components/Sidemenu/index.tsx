import React from 'react';
import styles from './index.module.css';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import hamburgerIcon from '../../assets/icons/hamburger.svg';
import Image from 'next/image';
import leftArrowIcon from '../../assets/icons/leftArrow.svg';
import userCircleIcon from '../../assets/icons/user-circle.svg';
import msgIcon from '../../assets/icons/sidemenu-msg.svg';
import questionMarkIcon from '../../assets/icons/question-mark.svg';
import thumbsUpIcon from '../../assets/icons/thumbs-up.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import RightIcon from '../../assets/icons/right.jsx';
import flagsmith from 'flagsmith/isomorphic';
import { useLocalization } from '../../hooks';
import { AppContext } from '../../context';
import { useCookies } from 'react-cookie';
import router from 'next/router';
// import { logEvent } from 'firebase/analytics';
// import { analytics } from '../../utils/firebase';
import BhashiniImg from '../../assets/images/bhashinilogo.png';
import darshanLogo from '../../assets/images/darshan-logo.png';
import toast from 'react-hot-toast';

export const Sidemenu = ({ bgColor }: { bgColor: string }) => {
  const t = useLocalization();
  const context = React.useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const defaultLang = flagsmith.getValue('default_lang', { fallback: 'hi' });
  const defaultLang = 'en';
  const [welcome, chats, faqs, feedback, logoutLabel] = React.useMemo(
    () => [
      t('label.welcome'),
      t('label.chats'),
      t('label.faqs'),
      t('label.feedback'),
      t('label.logout'),
    ],
    [t]
  );
  const [cookies, setCookies, removeCookie] = useCookies();
  const [isEngActive, setIsEngActive] = React.useState(
    localStorage.getItem('locale')
      ? localStorage.getItem('locale') === 'en'
      : defaultLang === 'en'
  );

  const toggleLanguage = React.useCallback(
    (newLanguage: string) => () => {
      if (newLanguage === context?.locale) return;
      localStorage.setItem('locale', newLanguage);
      context?.setLocale(newLanguage);
      setIsEngActive((prev) => (prev === true ? false : true));
    },
    [context]
  );

  function logout() {
    removeCookie('access_token', { path: '/' });
    removeCookie('phoneNumber', { path: '/' });
    removeCookie('locale', { path: '/' });
    removeCookie('userID', { path: '/' });
    removeCookie('auth', { path: '/' });
    removeCookie('fcm-token', { path: '/' });
    removeCookie('installPwa', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
    context?.setMessages([]);
    //@ts-ignore
    // logEvent(analytics, 'Logout_pressed');
    router.push('/login');
    if (typeof window !== 'undefined') window.location.reload();
  }

  return (
    <>
      <div>
        <Image
          src={hamburgerIcon}
          alt=""
          width={40}
          height={40}
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        {/* @ts-ignore */}
        <DrawerContent>
          <div className={styles.sideMenu} style={{backgroundColor: bgColor}}>
            <div className={styles.closeButton}>
              <Image
                src={leftArrowIcon}
                alt=""
                width={30}
                height={30}
                onClick={onClose}
              />
              {/* <div
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={onClose}>
                <button
                  id="eng"
                  className={isEngActive ? styles.active : styles.btn}
                  style={{ borderRadius: '10px 0px 0px 10px' }}
                  onClick={toggleLanguage('en')}>
                  ENG
                </button>
                <button
                  id="hindi"
                  className={!isEngActive ? styles.active : styles.btn}
                  style={{ borderRadius: '0px 10px 10px 0px' }}
                  onClick={toggleLanguage('hi')}>
                  हिंदी
                </button>
              </div> */}
            </div>
            <div className={styles.user}>
              <div className={styles.icon1}>
                <Image src={userCircleIcon} alt="" layout="responsive" />
              </div>
              <div className={styles.userInfo}>
                <p style={{ fontWeight: 'bold' }}>{welcome}</p>
                {/* <p>+91 {cookies['phoneNumber']}</p> */}
              </div>
            </div>
            <div
              className={styles.user}
              onClick={() => {
                if (context?.isMsgReceiving) {
                  toast.error(`${t('error.wait_new_chat')}`);
                  onClose();
                  return;
                }
                // router.push('/history');
                onClose();
              }}>
              <div className={styles.icon2}>
                <Image src={msgIcon} alt="" layout="responsive" />
              </div>
              <div className={styles.userInfo2}>
                <p style={{ fontWeight: 'bold' }}>{chats}</p>
              </div>
              <div className={styles.icon3}>
                <RightIcon width="24px" color="white" />
              </div>
            </div>
            <div
              className={styles.user}
              onClick={() => {
                if (context?.isMsgReceiving) {
                  toast.error(`${t('error.wait_new_chat')}`);
                  onClose();
                  return;
                }
                // router.push('/faq');
                onClose();
              }}>
              <div className={styles.icon2}>
                <Image src={questionMarkIcon} alt="" layout="responsive" />
              </div>
              <div className={styles.userInfo2}>
                <p style={{ fontWeight: 'bold' }}>{faqs}</p>
              </div>
              <div className={styles.icon3}>
                <RightIcon width="24px" color="white" />
              </div>
            </div>
            <div
              className={styles.user}
              onClick={() => {
                if (context?.isMsgReceiving) {
                  toast.error(`${t('error.wait_new_chat')}`);
                  onClose();
                  return;
                }
                // router.push('/feedback');
                onClose();
              }}>
              <div className={styles.icon2}>
                <Image src={thumbsUpIcon} alt="" layout="responsive" />
              </div>
              <div className={styles.userInfo2}>
                <p style={{ fontWeight: 'bold' }}>{feedback}</p>
              </div>
              <div className={styles.icon3}>
                <RightIcon width="24px" color="white" />
              </div>
            </div>
            <div
              className={styles.user}
              onClick={() => {
                // logout();
                onClose();
              }}>
              <div className={styles.icon2}>
                <Image src={logoutIcon} alt="" layout="responsive" />
              </div>
              <div className={styles.userInfo2}>
                <p style={{ fontWeight: 'bold' }}>{logoutLabel}</p>
              </div>
              <div className={styles.icon3}>
                <RightIcon width="24px" color="white" />
              </div>
            </div>
            
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
