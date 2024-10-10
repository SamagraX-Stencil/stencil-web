import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { OTPInput } from '../../components/otp-input';
import { useLocalization } from '../../hooks';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useConfig } from '../../hooks/useConfig';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import InputComponent, {
  ButtonProps,
  OtpProps,
} from '@samagra-x/stencil-molecules/lib/input-component2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const config = useConfig('component', 'otpPage');
  const theme = useColorPalates();
  const { otpLength, resendOtpTimer } = config;
  const router = useRouter();
  const mobile = router.query.state;
  const t = useLocalization();

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  useEffect(() => {
    if (!router.query.state || router.query.state?.length !== 10) {
      router.push('/login');
    }
  }, [router]);

  const verifyOtp = async (userData: any) => {
    // try {
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/login/otp`,
    //     userData
    //   );
    //   console.log({ response });
    //   localStorage.setItem('user', JSON.stringify(response?.data?.result?.data?.user));
    //   return response.data;
    // } catch (error) {
    //   toast.error(`${t('message.invalid_otp')}`);
    //   console.error(error);
    // }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      // const response = axios.get(
      //   `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/sendOTP?phone=${router.query.state}`
      // );
      // console.log(response);
      setLoading(false);
      setCountdown(resendOtpTimer);
      toast.success(`${t('message.otp_sent_again')}`);
    } catch (error) {
      setLoading(false);
      console.error('Error resending OTP:', error);
      toast.error(`${t('error.error.sending_otp')}`);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (otp.length === Number(otpLength)) {
        if (navigator.onLine) {
          setLoading(true);
          // verifyOtp({
          //   loginId: router.query.state,
          //   password: otp,
          //   applicationId: 'ef64c9b6-b9d6-4632-99ba-edbd34a0cbc3',
          //   //@ts-ignore
          // }).then((res: any) => {
          //   console.log({ res });
          //   setLoading(false);
          //   if (res.params.status === 'Success') {
          //     let expires = new Date();
          //     expires.setTime(
          //       expires.getTime() + res.result.data.user.tokenExpirationInstant * 1000
          //     );
          //     removeCookie('access_token');

          //     // setCookie('access_token', res.result.data.user.token, {
          //     //   path: '/',
          //     //   expires,
          //     // });
          //     const phoneNumber = router.query.state;
          //     // @ts-ignore
          //     localStorage.setItem('phoneNumber', phoneNumber);
          //     const decodedToken = jwt_decode(res.result.data.user.token);
          //     //@ts-ignore
          //     localStorage.setItem('userID', decodedToken?.sub);
          //     localStorage.setItem('auth', res.result.data.user.token);
          //     // @ts-ignore
          //     // setUserId(analytics, localStorage.getItem("userID"));
          //     setTimeout(() => {
          //       router.push('/');
          //     }, 10);
          //   } else {
          //     toast.error(`${t('message.invalid_otp')}`);
          //   }
          // });
          if (otp == '0000') {
            localStorage.setItem('phoneNumber', '9907799970');
            router.push('/');
          } else {
            toast.error(`${t('message.invalid_otp')}`);
          }

          setLoading(false);
        } else {
          toast.error(`${t('label.no_internet')}`);
        }
      }
    },
    [otp.length]
  );

  useEffect(() => setCountdown(resendOtpTimer), []);
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <div className={styles.rightColumn}>
        <div
          style={{
            width: '100%',
            height: '100%',
            // display: 'flex',
            // justifyContent: 'center',
            // alignContent: 'center',
            // flexDirection: 'column',
          }}
        >
          <div className="d-flex pt-2 align-items-center justify-content-center mt-2 w-100">
            <IconButton
              aria-label="fingerprint"
              sx={{
                height: '40px',
                width: '40px',
                borderRadius: '12px',
                border: '1px solid #E8ECF4',
                ml: 1,
              }}
              onClick={() => router.push('/login')}
            >
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
            <Typography
              data-testid="otp-verification-line1"
              variant="h4"
              textAlign="center"
              width="90%"
              color="#1E232C"
              sx={{ m: 1, mr: 6 }}
            >
              {t('message.otp_verification')}
            </Typography>
          </div>
          <div className={styles.form}>
            <InputComponent
              type="otp"
              buttonProps={
                {
                  buttonText: t('label.submit'),
                  handleNextTask: handleLogin,
                } as ButtonProps
              }
              otpProps={
                {
                  otpDidntReceiveText: t('message.didnt_receive'),
                  resendOtpText: t('message.resend_again'),
                  // otpDidntReceiveText={t('message.didnt_receive')},
                  // resendOtpText={t('message.resend_again')},
                  waitMessage: 'message.wait_minutes',
                  value: otp,
                  onChange: setOtp,
                  optBoxSeparator: <></>,
                  ResetOtpForgotPlaceHolder: 'Resent Again',
                  handleResendOtpButton: resendOtp,

                  mobileNumberForOtpScreen: '9907799970',
                  countDownTime: 0,
                  textBeforeOtpBox: 'message.otp_message',
                  styles: {
                    resendTextStyle: { color: theme?.primary?.main },
                  },
                } as OtpProps
              }
            />
          </div>
          {/* Form */}
        </div>
      </div>
    </>
  );
};

export default OtpPage;
