import React, { useCallback, useState } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-hot-toast'
import { useColorPalates } from '../theme-provider/hooks'
import { useConfig } from '../../hook/useConfig'

const LoginMobileAadharPage: React.FC = () => {
  const [isAadharClicked, setIsAadharClicked] = useState(false)
  const [input, setInput] = useState('')
  const [valid, setValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const theme = useColorPalates()
  const config = useConfig('component', 'loginMobileAadharPage')

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let reg
      let maxLength
      let errorMessage = ''

      const inputValue = e.target.value
      const numericInput = inputValue.replace(/[^0-9]/g, '')

      // Update the input value with the numeric value
      setInput(numericInput)

      if (isAadharClicked) {
        reg = /^\d{0,12}$/ // Allow up to 12 digits for Aadhar
        maxLength = 12
        errorMessage = 'Please enter a valid Aadhar number'
      } else {
        reg = /^\d{0,10}$/ // Allow up to 10 digits for Phone Number
        maxLength = 10
        errorMessage = 'Please enter a valid mobile number'
      }

      const isValid = reg.test(numericInput)
      setValid(isValid)

      if (isValid || numericInput === '') {
        setInput(numericInput)
      } else {
        // Truncate input if it exceeds maximum length
        setInput(numericInput.slice(0, maxLength))
      }

      if (numericInput.length > maxLength) {
        // If input length exceeds maximum allowed digits
        setValid(false)
        setInput(numericInput.slice(0, maxLength))
        errorMessage = isAadharClicked
          ? `Please enter a valid Aadhar number`
          : `Please enter a valid mobile number`
      }

      setErrorMessage(errorMessage)
    },
    [isAadharClicked]
  )

  const handleAadharClick = useCallback(() => {
    setIsAadharClicked((prop) => !prop)
  }, [])

  const handleRegistration = () => {
    // Register User
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      (isAadharClicked && input.length === 12) ||
      (!isAadharClicked && input.length === 10)
    ) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        toast.success(`Successfully sent OTP`)
      }, 2000)
    } else {
      console.log(input.length)
      toast.error(`Please enter a valid input`)
    }
  }

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <div className={styles.main}>
        <div
          className={styles.leftColumn}
          style={{ background: theme?.primary?.main }}
        >
          <div className={styles.logo}>
            <img src={config.logo} width={150} height={40} alt="" />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.topSection}>
            <div className={styles.register}>
              <Typography
                variant="body2"
                color={theme.primary?.main}
                className={styles.registerText}
              >
                Don’t have an account?
              </Typography>
              {config.showSignUp && (
                <Typography
                  onClick={handleRegistration}
                  variant="button"
                  sx={{
                    textTransform: 'none',
                    color: theme.primary?.main,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Register Now
                </Typography>
              )}
            </div>
          </div>
          <div className={styles.form}>
            {/* Form */}
            <Typography
              component="h1"
              variant="h4"
              textAlign="left"
              width="90%"
              color={theme.primary?.main}
            >
              {config.title}
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, width: '90%' }}
            >
              <TextField
                type="text"
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
                    background: theme.primary?.main,
                    borderRadius: '10px',
                  }}
                  onClick={handleLogin}
                  disabled={!valid || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Login'
                  )}
                </Button>
              }
            </Box>
            <Typography
              variant="caption"
              textAlign="center"
              width="90%"
              color={theme.primary?.main}
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
                color: theme.primary?.main,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {!isAadharClicked ? `Aadhar Number` : `Phone Number`}
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginMobileAadharPage
