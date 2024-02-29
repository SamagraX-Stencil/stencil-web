import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import { OTP } from './OtpInput';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logo from './logo.png';
import { OtpPageProps } from './otp';
import { MenuItem, Select } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const OtpPage: React.FC<OtpPageProps> = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleLanguage = useCallback((e: any) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, []);

  const handleLogin = () => {
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success(`${t('successfullyLoggedIn')}`);
      }, 2000);
    } else {
      toast.error(`${t('pleaseEnterValidOtp')}`);
    }
  };

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <div className={styles.main}>
        <div className={styles.leftColumn}>
          <div className={styles.logo}>
            <Image src={logo} width={150} height={40} alt="" />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.topSection}>
            <div className={styles.dropdown}>
              <Select
                size="small"
                id="lang-select"
                value={language}
                label=""
                onChange={handleLanguage}>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिंदी</MenuItem>
              </Select>
            </div>
          </div>
          <div className={styles.form}>
            {/* Form */}
            <Typography
              variant="h4"
              textAlign="left"
              width="90%"
              color="#1E232C"
              sx={{ m: 2 }}>
              {t('otpTitle')}
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              width="90%"
              color="#838BA1">
              {t('otpDescription')}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '90%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}>
                <OTP
                  separator={<></>}
                  value={otp}
                  onChange={setOtp}
                  length={4}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  background: '#1E232C',
                  borderRadius: '10px',
                  width: '50%'
                }}
                onClick={handleLogin}
                disabled={loading}>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('login')
                )}
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
