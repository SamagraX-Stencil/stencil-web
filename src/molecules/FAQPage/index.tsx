import React from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import callIcon from './assets/call-icon.svg'
import config from './config.json';

const FAQPage: React.FC = () => {
  const downloadPDFHandler=()=>{
    console.log(config.component.userManualText)
  }

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <Box className={styles.main}>
          <Box m={3}><Typography variant='h4' sx={{fontWeight:"600", color: config.theme.primaryColor.value}}>{config.component.title?config.component.title:"FAQs"}</Typography></Box>
          <Box>
            {config?.component?.userManualText && (
              <Box className={styles.manualButtons} m={3}>
                <Button
                  onClick={downloadPDFHandler}
                  variant='contained' sx={{textTransform:'none', backgroundColor:config.theme.primaryColor.value, "&:hover":{backgroundColor:config.theme.primaryColor.value}}}>
                  {config.component.userManualText?config.component.userManualText:"User Manual - For VAWs"}
                </Button>
              </Box>
            )}
            {config?.component?.contactText && (
              <Box className={styles.dialerBox} m={3}>
                <Box p={1.5}><Typography variant='body1' sx={{fontWeight:"bold"}}>{config.component.contactDescriptionText?config.component.contactDescriptionText:"To connect with call centre"}</Typography>
                </Box>
                <Box px={2} >
                  <img src={callIcon?callIcon:config.component.contactIcon} alt="callIcon" className={styles.callIconBox}/>
                  <Button variant='text' size="large" sx={{textTransform:'none',color:config.theme.primaryColor.value, "&:hover":{color:config.theme.primaryColor.value}}}><Typography variant='h5' fontWeight={600}>{config.component.contactText?config.component.contactText:"Dial 155333"}</Typography></Button>
                </Box>
              </Box>
            )}
          </Box>
      </Box>
    </>
  );
};

export default FAQPage;
