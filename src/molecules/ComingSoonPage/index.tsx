import React from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import config from './config.json';

const ComingSoonPage: React.FC = () => {
  const handleBack = ()=>{
    window?.history?.back()
  }

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
        <Box my={15} className={styles.container}>
          <Box mt={5}><Typography variant='h4' sx={{color: config.theme.primaryColor.value, fontWeight: "700"}}>{config.component.title}</Typography></Box>
          <Box><img src={config.component.comingSoonImage} alt="hourGlass" className={styles.imageContainer}/></Box>
          <Box><Typography variant='body1' sx={{fontWeight:"600", color: config.theme.secondaryColor.value}}>{config.component.description}</Typography></Box>
          <Box my={5}><Button variant='contained' className={styles.backButton} size='large' style={{backgroundColor: config.theme.primaryColor.value}} onClick={handleBack}>{config.component.backText}</Button></Box>
        </Box>
    </>
  );
};

export default ComingSoonPage;