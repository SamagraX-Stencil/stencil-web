import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import { Sidebar } from '../../components/sidebar';
import ThemePicker from '../../components/theme-picker'; 
import { useColorPalates } from '../../molecules/theme-provider/hooks';  
import config from './config.json';

const Navbar: React.FC = () => {
  const {
    component: {
      navbar: {
        brandName,
        showHamburgerMenu,
        showHomeIcon,
        leftHomeIcon,
        logos: {
          showCenterLogos,
          centerLogoIcons,
          showRightLogos,
          rightLogoIcons
        }
      }
    }
  } = config;

  const theme = useColorPalates();  
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: theme.primary.dark }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {showHamburgerMenu && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
            )}
            {showHomeIcon && (
              <div>
                <IconButton
                  color="inherit"
                  size="large"
                  edge="start"
                  aria-label="home"
                  style={{ fontSize: '2rem', height: '48px' }}
                >
                  <HomeIcon />
                </IconButton>
                {leftHomeIcon && (
                  <img
                    src={leftHomeIcon.src}
                    alt={`Left Home Icon ${leftHomeIcon.id}`}
                    style={{ maxHeight: '48px' }}
                  />
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            {showCenterLogos && centerLogoIcons.map((logo) => (
              <img key={logo.id} src={logo.src} alt={`Logo ${logo.id}`} style={{ maxHeight: '48px' }} />
            ))}

            {brandName && (
              <Typography variant="h6" color="inherit" sx={{ marginTop: 1, fontSize: '1.5rem' }}>
                {brandName}
              </Typography>
            )}
          </div>

         
        
          
          {showRightLogos && (
            <div>
              {rightLogoIcons.map((logo) => (
                <img key={logo.id} src={logo.src} alt={`Right Logo ${logo.id}`} style={{ maxHeight: '48px' }} />
              ))}
            </div>
          )}
            <ThemePicker />
        </Toolbar>
      </AppBar>

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  );
};

export default Navbar;
