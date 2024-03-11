import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import { Sidebar } from '../sidebar';
import config from './config.json';

const Navbar: React.FC = () => {
  const {
    features: {
      brandName,
      showHamburgerMenu,
      showHomeIcon,
      logos: {
        showCenterLogos,
        centerLogoIcons,
        showRightLogos,
        rightLogoIcons
      }
    }
  } = config;

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AppBar position="static" style={{ background: 'white', color: 'black' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
     
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {showHamburgerMenu && (
              <IconButton edge="start" color="inherit" aria-label="menu" style={{ fontSize: '2rem', height: '48px' }} onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>
            )}
            
            {showHomeIcon && (
              <IconButton color="inherit" aria-label="home" style={{ fontSize: '2rem', height: '48px' }}>
                <HomeIcon />
              </IconButton>
            )}
          </div>

       
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
            {showCenterLogos && centerLogoIcons.map((logo, index) => (
              <img key={index} src={logo} alt={`Logo ${index}`} style={{ maxHeight: '48px' }} />
            ))}

           
            {brandName && (
              <Typography variant="h6" color="inherit" sx={{ marginTop: 1, fontSize: '1rem' }}>
                {brandName}
              </Typography>
            )}
          </div>

        
          {showRightLogos && (
            <div>
              {rightLogoIcons.map((logo, index) => (
                <img key={index} src={logo} alt={`Right Logo ${index}`} style={{ maxHeight: '48px' }} />
              ))}
            </div>
          )}
        </Toolbar>
      </AppBar>

 
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  );
};

export default Navbar;
