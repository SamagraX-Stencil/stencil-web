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
import NewLanguagePicker from '@samagra-x/stencil-molecules/lib/language-picker/languagePicker';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { OTPInput } from 'stencil-molecules/lib/otp-input';
import InputComponent from '@samagra-x/stencil-molecules/lib/input-component';
// import ContextProvider from '../../providers/context-provider';

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
          fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/sendOTP?phone=${input}`, {
            method: 'GET',
          })
            .then((response) => {
              setLoading(false);
              if (response.status === 200) {
                // Perform the navigation and resolve the promise
                router.push({ pathname: '/otp', query: { state: input } });
                resolve('SUCCESS');
              } else {
                setLoading(false);
                toast.error(`${t('message.otp_not_sent')}`);
                reject('FAILURE');
              }
            })
            .catch(() => {
              setLoading(false);
              toast.error(`${t('message.otp_not_sent')}`);
              reject('FAILURE');
            });
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
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: 'calc(100% - 117px)',
            zIndex: 10,
          }}
        ></div>
        {showLogo && logo && (
          <div
            style={{
              height: '400px',
              overflow: 'hidden',
              objectFit: 'cover',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <img data-testid="login-page-img" src={logo} alt="loginPageImg" width={'100%'} />
          </div>
        )}
        <div className={styles.form}>
          {/* Form */}
          {/* <Typography
            data-testid="login-page-title"
            component="h1"
            variant="h4"
            fontWeight={'bold'}
            textAlign="center"
            width="100%"
            color={theme?.primary?.main || 'black'}
            dangerouslySetInnerHTML={{
              __html: t('label.subtitle'),
            }}
          ></Typography> */}
          {/*   <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              mt: 1,
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <TextField
              data-testid="mobile-input"
              margin="normal"
              error={!valid}
              required
              fullWidth
              value={input}
              helperText={!valid ? errorMessage : ''}
              onChange={handleInput}
              label={t('message.enter_mobile')}
              name={'phone'}
              autoComplete={'phone'}
              autoFocus
            />

            // {/* @ts-ignore 
            <Button
              data-testid="login-button"
              fullWidth
              variant="contained"
              sx={{
                textTransform: 'none',
                mt: 2,
                height: '60px',
                fontSize: '16px',
                p: 1,
                background: theme?.primary?.main,
                borderRadius: '10px',
              }}
              onClick={handleLogin}
              disabled={!valid || loading}
              endIcon={<ArrowForwardIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : `${t('label.continue')}`}
            </Button>
          </Box> 
          */}
          <InputComponent
            errorMessage="Mobile Number is required"
            buttonText={t('label.continue')}
            handleNextTask={handleLogin}
            onChange={setInput}
            placeholder={t('message.enter_mobile')}
            type="mobile"
            value={input}
            title={t('label.subtitle')}
            customStyles={{
              titleStyle: { color: theme?.primary?.main || 'black', fontWeight: 'bold' },
              containerStyle: { width: '100%' },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
