import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";
import { OTPInput } from "../otp-input";
import { useColorPalates } from "../theme-provider/hooks";
import config from './config.json';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const theme = useColorPalates();
  const phNo = 9999999999 // update number here
  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (otp.length === config.component.otpPage.otpLength) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.success(`Successfully logged in`);
        }, 2000);
      } else {
        toast.error(`Please enter correct OTP`);
      }
    },
    [otp.length]
  );
  const resendOtp = async () => {
    try {
      setLoading(true);
      // Add api to resend otp here
      setLoading(false);
      setCountdown(config.component.otpPage.resendOtpTimer); 
      toast.success("Otp Sent Again");
    } catch (error) {
      setLoading(false);
      toast.error('Error Sending OTP');
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  useEffect(()=> setCountdown(config.component.otpPage.resendOtpTimer),[])
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <div className={styles.main}>
        {config.component.otpPage.showSplitedView && (
          <div
            className={styles.leftColumn}
            style={{ background: theme?.primary?.main }}
          >
            {config.component.otpPage.showLogo && (
              <div className={styles.logo}>
                <img src={config.component.otpPage.logo} width={150} height={40} alt="" />
              </div>
            )}
          </div>
        )}
        <div className={styles.rightColumn}>
          <div className={styles.form}>
            {/* Form */}
            <Typography
              variant="h4"
              textAlign="center"
              width="90%"
              color="#1E232C"
              sx={{ m: 2 }}
            >
              {config.component.otpPage.title}
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              width="90%"
              color="#838BA1"
            >
              Enter the verification code we just sent on your mobile number
            </Typography>
            <Typography
              fontWeight="bold"
              textAlign='center'>
              +91-{phNo}
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, width: "90%",display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <OTPInput
                  separator={<></>}
                  value={otp}
                  onChange={setOtp}
                  length={config.component.otpPage.otpLength}
                />
              </Box>
              <div style={{ marginTop: '10px' }}>
                {countdown > 0 ? (
                <Typography>Please wait {countdown} seconds before resending OTP</Typography>
                  ):(
                  <>
                    <Typography
                    variant='body2'
                    align='center'
                    color="#838BA1">
                      Didn't receive the OTP? &nbsp;
                    <p onClick={resendOtp} style={{color:'#3da156',fontWeight:'bold', cursor: 'pointer'}}>Resend again</p>
                    </Typography>
                  </>
                  )}
              </div>
            <div style={{marginTop: '10px',marginBottom: '10px',display: "flex", gap:"10px", width:'100%'}}> 
              <Button
                variant="contained"
                type="button"
                sx={{
                  textTransform: 'none',

                  p: 1,

                  // background: config?.theme.secondaryColor.value,
                  background: '#000',
                  borderRadius: '10px',
                  width: '50%',
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  mt: 5,
                  mb: 4,
                  p: 1,

                  background: theme.primary.main,
                  borderRadius: "10px",
                  width: "50%",
                }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
