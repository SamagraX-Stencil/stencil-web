import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { CSSProperties, useEffect, useState } from 'react';
import { OTPInput } from '../otp-input';
import { FormattedMessage } from 'react-intl';

const styles: { [key: string]: CSSProperties } = {
  main: {
    display: 'flex',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
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
  textBeforeOtpBox?: string;
  waitMessage?: string;
  handleLogin?: () => Promise<string>;
  otp?: string;
  setOtp?: any;
  otpLength?: number;
  otpDidntReceiveText?: string;
  resendOtpText?: string;
  countdown?: number;
  resendOtp?: () => void;
  separator?: React.ReactNode;
  otpCustomStyle?: {
    mainStyle?: CSSProperties;
    formStyle?: CSSProperties;
    otpInputStyle?: CSSProperties;
    resendTextStyle?: CSSProperties;
  };
}
const OtpComponent = ({
  phoneNumber,
  textBeforeOtpBox,
  waitMessage,
  handleLogin,
  otpDidntReceiveText,
  resendOtpText,
  otp = '',
  setOtp,
  otpLength = 4,
  countdown: initialCountdown = 30,
  resendOtp,
  separator,
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
    resendTextStyle = {},
  } = otpCustomStyle;
  const mergedStyles = {
    main: { ...styles.main, ...mainStyle },
    form: { ...styles.form, ...formStyle },
  };
  return (
    <>
      <Typography
        data-testid="otp-verification-line2"
        variant="subtitle1"
        textAlign="center"
        color="#1E232C"
        sx={{ m: 2 }}
      >
        <FormattedMessage
          id={textBeforeOtpBox}
          defaultMessage=""
          values={{
            mobile: phoneNumber,
            br: (chunks) => <br />,
            b: (chunks) => <b>{chunks}</b>,
          }}
        />
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', ...otpInputStyle }}>
        <OTPInput
          separator={separator}
          value={otp}
          onChange={(value) => {
            setOtp(value);
            // setOtpError(false);
          }}
          length={otpLength}
        />
      </Box>
      {/* {otpError && (
        <Typography color="error" variant="subtitle2" align="center" sx={{ mt: 1 }}>
          {t('message.invalid_otp')}
        </Typography>
      )} */}
      <div style={{ margin: '10px', textAlign: 'center' }} data-testid="resend-otp">
        {countdown > 0 ? (
          <span>
            <FormattedMessage
              id={waitMessage}
              defaultMessage="Please wait {countdown} seconds before resending OTP"
              values={{ countdown }}
            />
          </span>
        ) : (
          <Typography variant="subtitle1" align="center" color="#838BA1">
            {otpDidntReceiveText} &nbsp;
            <p
              onClick={resendOtp}
              style={{
                // color: theme?.primary?.main || '#3da156',
                fontWeight: 'bold',
                cursor: 'pointer',
                ...resendTextStyle,
              }}
            >
              {resendOtpText}
            </p>
          </Typography>
        )}
      </div>
    </>
  );
};

export default OtpComponent;
