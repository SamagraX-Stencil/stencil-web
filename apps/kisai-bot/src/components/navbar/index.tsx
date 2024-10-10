import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useConfig } from '../../hooks/useConfig';
import Sidebar from '../sidebar';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import toast from 'react-hot-toast';
import Nav from '@samagra-x/stencil-molecules/lib/navbar/navbar';

const Navbar: React.FC = () => {
  const router = useRouter();
  const config = useConfig('component', 'navbar');
  const botConfig = useConfig('component', 'botDetails');
  const context = useContext(AppContext);
  const t = useLocalization();

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

  console.log({ config, path: router.pathname });
  if (router.pathname === '/login' || router.pathname === '/otp') return null;

  return (
    <Nav
      onToggle={toggleSidebar}
      isOpen={isSidebarOpen}
      showHamburgerMenu={true}
      backIconRoutes={['/faq', '/history']}
      noMenuOrBackRoutes={['/feedback']}
      centerLogoIcons={[
        {
          id: 'logo1',
          src: 'https://kmai.staging.samagra.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fup-govt-logo.3dce86f4.png&w=128&q=75',
        },
      ]}
      style={{
        appBar: {
          background: 'var(--bg-color)',
          boxShadow: 'none',
          borderBottom: '1px solid lightgray',
          height: '80px',
          fontFamily: 'NotoSans-Regular',
        },
        toolbar: {
          height: '100%',
        },
        centerSection: {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        },
      }}
    >
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </Nav>
  );
};

export default Navbar;
