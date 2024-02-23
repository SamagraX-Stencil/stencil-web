import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logo from './logo.png';
import { LoginMobileAadharPageProps } from './login';
import { MenuItem, Select } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const LoginMobileAadharPage: React.FC<LoginMobileAadharPageProps> = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const [isAadharClicked, setIsAadharClicked] = useState(false);
  const [input, setInput] = useState('');
  const [valid, setValid] = useState(true);
  const [language, setLanguage] = useState('en');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLanguage = useCallback((e: any) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, []);

  const handleInput = useCallback(
    (e: any) => {
      let reg;
      let maxLength;
      let errorMessage = '';

      if (isAadharClicked) {
        reg = /^\d{0,12}$/; // Allow up to 12 digits for Aadhar
        maxLength = 12;
        errorMessage = t('pleaseEnterValidAadhar');
      } else {
        reg = /^\d{0,10}$/; // Allow up to 10 digits for Phone Number
        maxLength = 10;
        errorMessage = t('pleaseEnterValidMobile');
      }

      const isValid = reg.test(e.target.value);
      setValid(isValid);

      if (isValid || e.target.value === '') {
        setInput(e.target.value);
      } else {
        // Truncate input if it exceeds maximum length
        setInput(e.target.value.slice(0, maxLength));
      }

      if (e.target.value.length > maxLength) {
        // If input length exceeds maximum allowed digits
        setValid(false);
        setInput(e.target.value.slice(0, maxLength));
        errorMessage = isAadharClicked
          ? `${t('pleaseEnterValidAadhar')}`
          : `${t('pleaseEnterValidMobile')}`;
      }

      setErrorMessage(errorMessage);
    },
    [isAadharClicked]
  );

  const handleAadharClick = useCallback(() => {
    setIsAadharClicked((prop) => !prop);
  }, []);

  const handleRegistration = () => {
    // Register User
  };

  const handleLogin = () => {
    if (
      (isAadharClicked && input.length === 12) ||
      (!isAadharClicked && input.length === 10)
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success(`${t('successfullySentOTP')}`);
      }, 2000);
    } else {
      toast.error(`${t('pleaseEnterValidInput')}`);
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
            <div className={styles.register}>
              <Typography variant="body2" color="#1E232C" className={styles.registerText}>
                {t('dontHaveAccount')}
              </Typography>
              <Typography
                onClick={handleRegistration}
                variant="button"
                sx={{
                  textTransform: 'none',
                  color: '#1E232C',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}>
                {t('registerNow')}
              </Typography>
            </div>
          </div>
          <div className={styles.form}>
            {/* Form */}
            <Typography
              component="h1"
              variant="h4"
              textAlign="left"
              width="90%"
              color="#1E232C">
              {t('welcome')}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '90%' }}>
              <TextField
                margin="normal"
                error={!valid}
                required
                fullWidth
                value={input}
                helperText={!valid ? errorMessage : ''}
                onChange={(e) => handleInput(e)}
                label={
                  isAadharClicked
                    ? `${t('enterAadharNumber')}`
                    : `${t('enterPhoneNumber')}`
                }
                name={isAadharClicked ? 'aadhar' : 'phone'}
                autoComplete={isAadharClicked ? 'aadhar' : 'phone'}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  background: '#1E232C',
                  borderRadius: '10px',
                }}
                onClick={handleLogin}
                disabled={!valid || loading}>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('login')
                )}
              </Button>
            </Box>
            <Typography
              variant="caption"
              textAlign="center"
              width="90%"
              color="#1E232C"
              sx={{ mb: 1 }}>
              {t('orLoginUsing')}
            </Typography>
            <Typography
              onClick={handleAadharClick}
              width="90%"
              textAlign="center"
              variant="button"
              sx={{
                textTransform: 'none',
                textDecoration: 'underline',
                color: '#1E232C',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}>
              {!isAadharClicked
                ? `${t('aadharNumber')}`
                : `${t('phoneNumber')}`}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginMobileAadharPage;
