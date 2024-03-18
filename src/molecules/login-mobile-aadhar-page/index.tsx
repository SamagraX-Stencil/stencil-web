import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './assets/logo.png';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import config from './config.json';

const LoginMobileAadharPage: React.FC = () => {
  const [isAadharClicked, setIsAadharClicked] = useState(false);
  const [input, setInput] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let reg;
      let maxLength;
      let errorMessage = '';

      if (isAadharClicked) {
        reg = /^\d{0,12}$/; // Allow up to 12 digits for Aadhar
        maxLength = 12;
        errorMessage = 'Please enter a valid Aadhar number';
      } else {
        reg = /^\d{0,10}$/; // Allow up to 10 digits for Phone Number
        maxLength = 10;
        errorMessage = 'Please enter a valid mobile number';
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
          ? `Please enter a valid Aadhar number`
          : `Please enter a valid mobile number`;
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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (isAadharClicked && input.length === 12) ||
      (!isAadharClicked && input.length === 10)
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success(`Successfully sent OTP`);
      }, 2000);
    } else {
      toast.error(`Please enter a valid input`);
    }
  };

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <div className={styles.main}>
        <div className={styles.leftColumn} style={{background: config.theme.secondaryColor.value}}>
          <div className={styles.logo}>
            <img src={logo} width={150} height={40} alt="" />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.topSection}>
            <div className={styles.register}>
              <Typography
                variant="body2"
                color={config.theme.primaryColor.value}
                className={styles.registerText}>
                Don’t have an account?
              </Typography>
              <Typography
                onClick={handleRegistration}
                variant="button"
                sx={{
                  textTransform: 'none',
                  color: config.theme.primaryColor.value,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}>
                Register Now
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
              color={config.theme.primaryColor.value}>
              {config.component.title}
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, width: '90%' }}>
              <TextField
                margin="normal"
                error={!valid}
                required
                fullWidth
                value={input}
                helperText={!valid ? errorMessage : ''}
                onChange={handleInput}
                label={
                  isAadharClicked ? `Enter Aadhar Number` : `Enter Phone Number`
                }
                name={isAadharClicked ? 'aadhar' : 'phone'}
                autoComplete={isAadharClicked ? 'aadhar' : 'phone'}
                autoFocus
              />
             {
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             //@ts-ignore
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  background: config.theme.primaryColor.value,
                  borderRadius: '10px',
                }}
                onClick={handleLogin}
                disabled={!valid || loading}>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Login'
                )}
              </Button>}
            </Box>
            <Typography
              variant="caption"
              textAlign="center"
              width="90%"
              color={config.theme.primaryColor.value}
              sx={{ mb: 1 }}>
              or Login using
            </Typography>
            <Typography
              onClick={handleAadharClick}
              width="90%"
              textAlign="center"
              variant="button"
              sx={{
                textTransform: 'none',
                textDecoration: 'underline',
                color: config.theme.primaryColor.value,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}>
              {!isAadharClicked ? `Aadhar Number` : `Phone Number`}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginMobileAadharPage;
