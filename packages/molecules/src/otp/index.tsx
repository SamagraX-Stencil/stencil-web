import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { CSSProperties, useEffect, useState } from 'react';
import { OTPInput } from '../otp-input';
const styles: { [key: string]: CSSProperties } = {
  main: {
    display: 'flex',
    width: '100vw',
  },
  logo: {
    padding: '40px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  // Add media query styles
  // '@media (max-width: 768px)': {
  //   leftColumn: {
  //     display: 'none',
  //   },
  //   rightColumn: {
  //     flex: 1,
  //   },
  //   form: {
  //     width: '90%',
  //   },
  // },
};
interface OtpComponentProps {
  phoneNumber?: string;
  handleLogin?: () => Promise<string>;
  otp?: string;
  setOtp?: any;
  otpLength?: number;
  countdown?: number;
  resendOtp?: () => void;
  separator?: React.ReactNode;
  ResetOtpForgotPassworkPlaceHolder?: string;
  otpCustomStyle?: {
    mainStyle?: CSSProperties;
    formStyle?: CSSProperties;
    otpInputStyle?: CSSProperties;
    backButtonStyle?: CSSProperties;
    loginButtonStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    subtitleStyle?: CSSProperties;
    phoneNumberStyle?: CSSProperties;
    countdownStyle?: CSSProperties;
    resendTextStyle?: CSSProperties;
  };
}
const OtpComponent = ({
  phoneNumber,
  handleLogin,
  otp = '',
  setOtp,
  otpLength = 4,
  countdown: initialCountdown = 30,
  resendOtp,
  separator,
  ResetOtpForgotPassworkPlaceHolder,
  otpCustomStyle = {},
}: OtpComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);
  const handleLoginButtonClick = async () => {
    if (!handleLogin) return;
    setLoading(true);
    const status = await handleLogin();
    if (status == 'SUCCESS') setLoading(false);
  };

  const {
    mainStyle = {},
    formStyle = {},
    otpInputStyle = {},
    backButtonStyle = {},
    loginButtonStyle = {},
  } = otpCustomStyle;
  const mergedStyles = {
    main: { ...styles.main, ...mainStyle },
    form: { ...styles.form, ...formStyle },
  };
  return (
    <div style={mergedStyles.main}>
      <div style={mergedStyles.form}>
        {/* <Typography variant="h4" textAlign="center" width="90%" color="#1E232C" sx={{ m: 2 }}>
          {title}
        </Typography> */}
        <Typography variant="body2" textAlign="center" width="100%" color="#838BA1">
          Enter the verification code we just sent on your mobile number
        </Typography>
        <Typography fontWeight="bold" textAlign="center">
          +91-{phoneNumber}
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            mt: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <OTPInput
              separator={separator || <>-</>}
              value={otp || ''}
              onChange={setOtp}
              length={otpLength || 4}
              otpInputStyle={otpInputStyle}
            />
          </Box>
          <div style={{ marginTop: '10px', color: '#000' }}>
            {countdown > 0 ? (
              <Typography>Please wait {countdown} seconds before resending OTP</Typography>
            ) : (
              <>
                <Typography variant="body2" align="center" color="#838BA1">
                  Didn't receive the OTP? &nbsp;
                  <p
                    onClick={resendOtp}
                    style={{
                      // color: '#000',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {ResetOtpForgotPassworkPlaceHolder}
                  </p>
                </Typography>
              </>
            )}
          </div>
          <div
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              display: 'flex',
              gap: '10px',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              type="button"
              sx={{
                textTransform: 'none',

                p: 1,
                mt: 5,
                mb: 4,
                // background: config?.theme.secondaryColor.value,
                background: '#000',
                borderRadius: '10px',
                width: '50%',
                ...backButtonStyle,
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: 'none',
                mt: 5,
                mb: 4,
                p: 1,

                borderRadius: '10px',
                width: '50%',
                ...loginButtonStyle,
              }}
              onClick={handleLoginButtonClick}
              disabled={loading || otp.length < otpLength}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default OtpComponent;
