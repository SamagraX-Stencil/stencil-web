import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";

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

export default Sidebar;
