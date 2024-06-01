import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { CallRounded } from '@mui/icons-material';
import downTimeGit from './assets/downTimeGIF.gif';
import { useUiConfig, useColorPalates } from '@repo/hooks';

const DowntimePage: React.FC = () => {
  const config = useUiConfig('component', 'downtime');

  const theme = useColorPalates();

  console.log('testing at downtime page', config, theme);
  const handleRefreshClick = useCallback(() => {
    // window?.location.reload()
    console.log(config.refreshText ?? 'Contact Details');
  }, []);
  const handlePreviousClick = useCallback(() => {
    // window?.history.back();
    console.log(config.previousPageText ?? 'Contact Details');
  }, []);

  const handleContactUserClick = useCallback(() => {
    console.log(config.contactLink ?? 'Contact Details');
  }, []);

  return (
    <Box className={styles.container}>
      <Typography variant="h4" fontWeight={600} textAlign="center" color={theme?.primary?.main}>
        {config.title ?? 'Downtime'}
      </Typography>
      <Box textAlign="center">
        <img
          // src={config?.downTimeImage ?? './assets/downTimeGIF.gif'}
          src={downTimeGit.src}
          alt="downtimeGif"
          className={styles.imageContainer}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>

      <Typography
        fontWeight={600}
        fontSize={18}
        color={theme?.grey?.[600]}
        textAlign="center"
        mb={2}
      >
        {config.supportingText ?? 'Description'}
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Avatar sx={{ bgcolor: theme.primary.main }}>
          <CallRounded fontSize="small" />
        </Avatar>
        <Button
          variant="text"
          sx={{ textTransform: 'none', ml: 1 }}
          onClick={handleContactUserClick}
        >
          <Typography fontSize={17} fontWeight={600}>
            {config.contactLink ?? 'Contact Details'}
          </Typography>
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={1}>
        <Button
          className={styles.roundedButton}
          onClick={handleRefreshClick}
          variant="contained"
          size="large"
          style={{ backgroundColor: theme?.grey?.[600], marginRight: '10px' }}
        >
          <Typography variant="body1" fontWeight={'bold'}>
            {config.refreshText ?? 'Reload Page'}
          </Typography>
        </Button>
        <Button
          className={styles.roundedButton}
          variant="contained"
          size="medium"
          style={{ backgroundColor: theme?.primary?.main }}
          onClick={handlePreviousClick}
        >
          <Typography variant="body1" fontWeight={'bold'}>
            {config.previousPageText ?? 'Previous Page'}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DowntimePage;
