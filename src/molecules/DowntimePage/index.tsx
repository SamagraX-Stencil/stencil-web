import React from 'react';
import styles from './index.module.css';
import { Box, Button, Typography} from '@mui/material';
import config from './config.json';
import CallIcon from './assets/call-icon.svg';
import DowntimeGif from './assets/downTimeGIF.gif'

const DowntimePage: React.FC = () => {
  const handleRefreshClick = ()=>{
    window?.location.reload()
  }
  const handlePreviousClick = ()=>{
    console.log(config.component.previousPageText)
            // router.push('/history');
  }

  const handleContactUserClick = ()=>{
    console.log(config.component.contactLink)
  }
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <Box className={styles.container} px={18} py={12}>
        <Box><Typography variant='h5' sx={{color: config.theme.primaryColor.value, fontWeight: "500"}}>{config.component.title? config.component.title:"We're under maintainance"}</Typography></Box>
        <Box my={4}>
          <img src={config.component.downTimeImage?config.component.downTimeImage: DowntimeGif} alt='downtimeGif' className={styles.imageContainer}/>
        </Box>
        <Box><Typography variant='h6' sx={{color: config.theme.secondaryColor.value, fontWeight:"600"}}>{config.component.supportingText ? config.component.supportingText:"Have an urgent query?"}</Typography></Box>
        <Box  gap={1} display={'flex'} my={2}>
          <Box><img src={config.component.callIcon?config.component.callIcon: CallIcon} className={styles.callImage} alt="callIcon" /></Box>
          <Button variant={"text"} sx={{textTransform: 'none'}} onClick={handleContactUserClick}>
            <Typography variant='h5' sx={{color: config.theme.secondaryColor.value, textDecoration: 'underline',fontWeight:"600"}}>{config.component.contactLink?config.component.contactLink:"Contact Us"}</Typography>
          </Button>
        </Box>

        <Box display={"flex"} justifyContent={"space-around"} width={"100%"} my={4}>
          <Button
            className={styles.roundedButton}
            onClick={handleRefreshClick}
            variant='contained'
            size='large'
            sx={{ textTransform: 'none', backgroundColor: config.theme.secondaryColor.value }}>
            <Typography variant='body1'>{config.component.refreshText?config.component.refreshText:"Try Again"}</Typography>
          </Button>
          <Button
          className={styles.roundedButton}
          variant='contained'
          size='large'
          style={{ textTransform: 'none', backgroundColor: config.theme.primaryColor.value }}
          onClick={handlePreviousClick}
          >
          <Typography variant='body1'>{config.component.previousPageText?config.component.previousPageText:"Previous Page"}</Typography>
        </Button>
        </Box>
    </Box>
    </>
  );
};

export default DowntimePage;
