import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Avatar, Box, Button, Typography} from '@mui/material';
import downTimeGIF from './assets/downTimeGIF.gif'
import CallRoundedIcon from '@mui/icons-material/Call';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useFlags } from 'flagsmith/react';
import { useConfig } from '../../hooks/useConfig';
import { useLocalization } from '../../hooks';

const DowntimePage: React.FC = () => {
  const t = useLocalization();
  const theme = useColorPalates(); 
  const config = useConfig('component', 'downtimePage');
  const flags = useFlags(['dialer_number']);
  const handleRefreshClick = useCallback(()=>{
    window?.location.reload()
  }, [])
  const handlePreviousClick = useCallback(()=>{
      window?.history.back();
  }, [])

  const handleContactUserClick = useCallback(()=>{
    const phoneNumber = `tel:${flags.dialer_number.value}`;
    window.location.href = phoneNumber;
  }, [flags])
  
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <Box className={styles.container} px={18} py={12}>
        <Box><Typography variant='h5' fontWeight={600} color={theme?.primary?.main}>{t('message.down_time_title')}</Typography></Box>
        <Box my={4}>
          <img src={config?.downTimeImage || downTimeGIF?.src} alt='downtimeGif' className={styles.imageContainer}/>
        </Box>
        <Box><Typography variant='h6' fontWeight={600} color={theme?.grey?.[600]}>{t('message.temporarily_down')}</Typography></Box>
        <Box  gap={1} display={'flex'} my={2}>
          <Box><Avatar
            sx={{ bgcolor: theme.primary.main, width:"7vh",height:"7vh" }}
            alt="Call Icon"
           >
           <CallRoundedIcon fontSize='large'/>
           </Avatar></Box>
          <Button variant={"text"} sx={{textTransform: 'none'}} onClick={handleContactUserClick}>
            <Typography variant='h5' color={theme?.grey?.[600]} fontWeight={600} sx={{textDecoration: 'underline'}}>{t('label.call_amakrushi')}</Typography>
          </Button>
        </Box>

        <Box display={"flex"} justifyContent={"space-around"} width={"100%"} my={4}>
          <Button
            className={styles.roundedButton}
            onClick={handleRefreshClick}
            variant='contained'
            size='large'
            style={{ textTransform: 'none', backgroundColor: theme?.grey?.[600] }}>
            <Typography variant='body1'>{t('message.down_time_retry')}</Typography>
          </Button>
          <Button
          className={styles.roundedButton}
          variant='contained'
          size='large'
          style={{ textTransform: 'none', backgroundColor: theme?.primary?.main }}
          onClick={handlePreviousClick}
          >
          <Typography variant='body1'>{t('message.down_time_view_prev_chats')}</Typography>
        </Button>
        </Box>
    </Box>
    </>
  );
};

export default DowntimePage;
