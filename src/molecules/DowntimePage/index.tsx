import React from 'react';
import styles from './index.module.css';
import { Box, Button} from '@mui/material';
import config from './config.json';
import CallIcon from './assets/call-icon.svg';

const DowntimePage: React.FC = () => {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <Box className={styles.container}>
        <Box className={styles.title} style={{color: config.theme.tertiaryColor.value}}>{config.component.title}</Box>
        <Box className={styles.imageContainer}>
        {/* Contains the down time gif in css */}
        </Box>
        <Box className={styles.supportingText} style={{color: config.theme.secondaryColor.value}}>{config.component.supportingText}</Box>
        <Box className={styles.dialerBox}>
          <Button variant={"text"} style={{gap:"12px", textTransform: 'none'}} onClick={()=>console.log(config.component.contactLink)}
          // href={`tel:${flags.dialer_number.value}`}
            >
            <img src={CallIcon} width={50} height={50} alt="callIcon" />
            <span className={styles.footerTitle} style={{color: config.theme.secondaryColor.value, textDecoration: 'underline'}}>{config.component.contactLink}</span>
          </Button>
        </Box>

        <Box display={"flex"} justifyContent={"space-around"} mx={30}>
          <Button
            className={styles.retryButton}
            onClick={() => window?.location.reload()}
            style={{ textTransform: 'none', backgroundColor: config.theme.secondaryColor.value, color:"white", padding: "1vh 2vh" }}
            id='reloadButton'
            >
            {config.component.refreshTextButton}
          </Button>
           <Button
          className={styles.viewPrevChatsButton}
          style={{ textTransform: 'none', backgroundColor: config.theme.tertiaryColor.value, color:"white", padding: "1vh 2vh" }}
          onClick={() => {
            console.log(config.component.previousPageButton)
            // router.push('/history');
          }}
          >
          {config.component.previousPageButton}
        </Button>
        </Box>
      {/* <Menu /> */}
    </Box>
    </>
  );
};

export default DowntimePage;
