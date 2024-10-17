import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import _logo from './assets/logo.png';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useLocalization } from '../../hooks';
import { useRouter } from 'next/router';
import { useConfig } from '../../hooks/useConfig';
import LanguagePicker from '../../components/language-picker';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoginComponent } from '@samagra-x/stencil-molecules';
// , {
//   ButtonProps,
//   InputProps,
// }

const LoginPage: React.FC = () => {
  const config = useConfig('component', 'loginPage');
  const { logo, showLogo } = config;

  const t = useLocalization();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useColorPalates();

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let reg;
    let errorMessage = '';

    const inputValue = e.target.value;
    const numericInput = inputValue.replace(/[^0-9]/g, '');

    reg = /^\d{10}$/; // Allow any number of digits for Phone Number
    errorMessage = 'Please enter a valid mobile number';

    const isValid = reg.test(numericInput);
    setValid(isValid);

    setInput(numericInput); // Update input directly

    if (!isValid) {
      setErrorMessage(errorMessage);
    }
  }, []);

  const handleLogin = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (input.length === 10) {
        console.log('hello');
        setLoading(true);
        if (navigator.onLine) {
          // fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/sendOTP?phone=${input}`, {
          //   method: 'GET',
          // })
          //   .then((response) => {
          setLoading(false);
          // if (response.status === 200) {
          // Perform the navigation and resolve the promise
          router.push({ pathname: '/otp', query: { state: input } });
          resolve('SUCCESS');
          // } else {
          //   setLoading(false);
          //   toast.error(`${t('message.otp_not_sent')}`);
          //   reject('FAILURE');
          // }
          // })
          // .catch(() => {
          //   setLoading(false);
          //   toast.error(`${t('message.otp_not_sent')}`);
          //   reject('FAILURE');
          // });
        } else {
          toast.error(`${t('label.no_internet')}`);
          reject('FAILURE');
        }
      } else {
        reject('FAILURE');
      }
    });
  }, [input]);

  console.log('debug login:', { config });
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <div className={styles.rightColumn}>
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: 'calc(100% - 117px)',
            zIndex: 10,
          }}
        >
          <LanguagePicker />
        </div>

        {showLogo && logo && (
          <div
            style={{
              height: '400px',
              overflow: 'hidden',
              objectFit: 'cover',
              maxWidth: '415px',
              margin: '0 auto',
            }}
          >
            <img data-testid="login-page-img" src={logo} alt="loginPageImg" width={'100%'} />
          </div>
        )}
        <div className={styles.form}>
          <LoginComponent
            title={t('label.subtitle')}
            type="mobile"
            titleStyle={{
              color: theme?.primary?.main || 'black',
              fontSize: '34px',
            }}
            buttonProps={{
              handleNextTask: handleLogin,
              buttonText: t('label.continue'),
            }}
            inputProps={{
              errorMessage: 'Mobile Number is required',
              value: input,
              onChange: setInput,
              placeholder: t('message.enter_mobile'),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
