 
import  { useState, useEffect } from "react";
 
 
 
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
 
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
 

 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
 
export const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {
  const [config, setConfig] = useState<{
    showLangSwitcher: boolean;
    languages: { code: string; label: string; }[];
    showProfileIcon: boolean;
    profileText: string;
    links: { label: string; icon: string; route: string; }[];
    showLogoutButton: boolean;
    logoutButtonLabel: string;
  } | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string>("en");  

  useEffect(() => {
    import("./config.json")
      .then((data) => {
        setConfig(data.component.sidebar);
      });
  }, []);

  const handleLanguageClick = (langCode: string) => {
    setActiveLanguage(langCode);
    onToggle();
  };

  const handleItemClick = () => {
    onToggle();
 

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {
  const [isEnglish, setIsEnglish] = useState(true);  

  const toggleLanguage = () => {
    setIsEnglish((prevState) => !prevState);  
  };
 

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
                      <ArrowBackIcon />
                    </ListItemIcon>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                      }}
                    >
                      {config.languages.map((lang, index) => (
                        <button
                          key={index}
                          id={lang.code}
                          className={`Sidemenu_button ${
                            lang.code === activeLanguage ? "active" : ""
                          }`}
                          style={{
                            borderTopLeftRadius: index === 0 ? "10px" : "0",
                            borderBottomLeftRadius: index === 0 ? "10px" : "0",
                            borderTopRightRadius: index === config.languages.length - 1 ? "10px" : "0",
                            borderBottomRightRadius: index === config.languages.length - 1 ? "10px" : "0",
                            backgroundColor: lang.code === activeLanguage ? "#00FF00" : "#FFFFFF",
                            border: "1px solid #000",
                            width: "60px",
                            height: "30px",
                            padding: "5px",
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
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={config.profileText} />
                  </ListItemButton>
                </ListItem>
              )}

              {config.links.map((link, index) => (
                <div key={index}>
                  <ListItem disablePadding sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
                    <ListItemButton>
                      <ListItemIcon>
                        {getIconComponent(link.icon)}
                      </ListItemIcon>
                      <ListItemText primary={link.label} />
                      <ChevronRightIcon />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}

              {config.showLogoutButton && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={config.logoutButtonLabel} />
                    <ChevronRightIcon />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          )}
 
          
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleItemClick}>
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",  
                  }}
                >
                  <button
                    id="eng"
                    className={`Sidemenu_button ${
                      isEnglish ? "active" : ""
                    }`}
                    style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      marginRight: "0",
                      backgroundColor: isEnglish ? "#00FF00" : "#FFFFFF",
                      border: "1px solid #000",
                      width: "60px",
                      height: "30px",
                      padding: "5px",
                    }}
                    onClick={toggleLanguage}
                  >
                    ENG
                  </button>
                  <button
                    id="hindi"
                    className={`Sidemenu_button ${
                      !isEnglish ? "active" : ""
                    }`}
                    style={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      marginLeft: "-1px",
                      backgroundColor: isEnglish ? "#FFFFFF" : "#00FF00",
                      border: "1px solid #000",
                      width: "60px",
                      height: "30px",
                      padding: "5px",
                    }}
                    onClick={toggleLanguage}
                  >
                    ଓଡ଼ିଆ
                  </button>
                </div>
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Welcome, User" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        
          <List>
       
            <ListItem disablePadding sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <ListItemButton>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Chat History"  />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
         
            <ListItem disablePadding sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <ListItemButton>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="FAQ Page"   />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
          
            <ListItem disablePadding sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <ListItemButton>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback"  />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
           
            <ListItem disablePadding sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout"    />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
 
        </Box>
      </Drawer>
    </div>
  );
};
 
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "HistoryIcon":
      return <HistoryIcon />;
    case "HelpIcon":
      return <HelpIcon />;
    case "FeedbackIcon":
      return <FeedbackIcon />;
    default:
      return null;
  }
};

 
export default Sidebar;
