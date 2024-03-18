import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './assets/logo.png';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { OTPInput } from '../otp-input';
// import config from './config.json';
import { useColorPalates } from '../theme-provider/hooks';
const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useColorPalates();
 

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success(`Successfully logged in`);
      }, 2000);
    } else {
      toast.error(`Please enter correct OTP`);
    }
  },[otp.length]);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <div className={styles.main}>
        <div className={styles.leftColumn} style={{background: theme?.primary?.main}}>
          <div className={styles.logo}>
            <img src={logo} width={150} height={40} alt="" />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.form}>
            {/* Form */}
            <Typography
              variant="h4"
              textAlign="left"
              width="90%"
              color="#1E232C"
              sx={{ m: 2 }}>
              OTP Verification
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              width="90%"
              color="#838BA1">
              Enter the verification code we just sent on your mobile number
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, width: '90%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}>
                <OTPInput
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
                 
                     // background: config.theme.secondaryColor.value,
                     background: theme.primary.main,
                  borderRadius: '10px',
                  width: '50%'
                }}
                onClick={handleLogin}
                disabled={loading}>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                 "Login"
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