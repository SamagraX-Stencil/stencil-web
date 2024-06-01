import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import _logo from './assets/logo.png';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useBotAppColorPalates } from '@repo/hooks';
import { useLocalization } from '@repo/hooks';
import { useRouter } from 'next/navigation';
import { useBotConfig } from '@repo/hooks';
const LocalLoginMobileAadharPage: React.FC = () => {
  const config = useBotConfig('component', 'loginMobileAadharPage');
  const { loginWithAadhaar, showSignUp, showAlternateSignIn, logo, showLogo, showSplitedView } =
    config;

  const t = useLocalization();
  const router = useRouter();
  const [isAadharClicked, setIsAadharClicked] = useState<boolean>(loginWithAadhaar);
  const [input, setInput] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useBotAppColorPalates();

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let reg;
      let errorMessage = '';

      const inputValue = e.target.value;
      const numericInput = inputValue.replace(/[^0-9]/g, '');

      if (isAadharClicked) {
        reg = /^\d{12}$/; // Allow up to 12 digits for Aadhar
        errorMessage = 'Please enter a valid Aadhar number';
      } else {
        reg = /^\d{10}$/; // Allow any number of digits for Phone Number
        errorMessage = 'Please enter a valid mobile number';
      }

      const isValid = reg.test(numericInput);
      setValid(isValid);

      setInput(numericInput); // Update input directly

      if (!isValid) {
        setErrorMessage(errorMessage);
      }
    },
    [isAadharClicked],
  );

  const handleAadharClick = useCallback(() => {
    setIsAadharClicked((prop) => !prop);
  }, []);

  const handleRegistration = () => {
    // Register User
  };

  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if ((isAadharClicked && input.length === 12) || (!isAadharClicked && input.length === 10)) {
        console.log('hello');
        setLoading(true);
        if (navigator.onLine) {
          fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/sendOTP?phone=${input}`, {
            method: 'GET',
          })
            .then((response) => {
              setLoading(false);
              if (response.status === 200) {
                // localStorage.setItem('phoneNumber',input)
                const url = `/otp?state=${input}`;
                router.push(url);

                // router.push({ pathname: '/otp', query: { state: input } })
              } else {
                setLoading(false);
                toast.error(`${t('message.otp_not_sent')}`);
              }
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err.message);
            });
        } else {
          toast.error(`${t('label.no_internet')}`);
        }
      }
    },
    [isAadharClicked, input],
  );
  console.log('debug login:', { config });
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <div className={styles.main}>
        {showSplitedView && (
          <div className={styles.leftColumn} style={{ background: theme?.primary?.main }}></div>
        )}

        <div className={styles.rightColumn}>
          {showSignUp && (
            <div className={styles.topSection}>
              <div className={styles.register}>
                <Typography
                  variant="body2"
                  color={theme?.primary?.main}
                  className={styles.registerText}
                >
                  {t('message.not_register_yet')}
                </Typography>
                <Typography
                  onClick={handleRegistration}
                  variant="button"
                  sx={{
                    textTransform: 'none',
                    color: theme.primary.main,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {t('message.register_at_krushak')}
                </Typography>
              </div>
            </div>
          )}
          <div className={styles.form}>
            {/* Form */}
            <Typography
              component="h1"
              variant="h4"
              fontWeight={'bold'}
              textAlign="center"
              width="100%"
              color={theme?.primary?.main || 'black'}
              dangerouslySetInnerHTML={{ __html: t('label.subtitle') }}
            ></Typography>
            {showLogo && logo && (
              <img
                src={config?.logo}
                alt="loginPageImg"
                height={config.logoheight || '280px'}
                width={config.logowidth || '280px'}
              />
            )}
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                error={!valid}
                required
                fullWidth
                value={input}
                helperText={!valid ? errorMessage : ''}
                onChange={handleInput}
                label={isAadharClicked ? `Enter Aadhar Number` : t('message.enter_mobile')}
                name={isAadharClicked ? 'aadhar' : 'phone'}
                autoComplete={isAadharClicked ? 'aadhar' : 'phone'}
                autoFocus
              />
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    mt: 3,
                    mb: 4,
                    p: 1,
                    background: theme?.primary?.main || 'black',
                    borderRadius: '10px',
                  }}
                  onClick={handleLogin}
                  disabled={!valid || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `${t('label.continue')}`
                  )}
                </Button>
              }
            </Box>
            {showAlternateSignIn && (
              <>
                <Typography
                  variant="caption"
                  textAlign="center"
                  width="90%"
                  color={theme.primary.main}
                  sx={{ mb: 1 }}
                >
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
                    color: theme.primary.light,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {!isAadharClicked ? `Aadhar Number` : t('message.enter_mobile')}
                </Typography>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalLoginMobileAadharPage;
