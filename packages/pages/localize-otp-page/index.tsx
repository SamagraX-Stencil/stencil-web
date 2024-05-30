import React, { useCallback, useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-hot-toast'
import { useBotAppColorPalates } from 'stencil-hooks'
import { OTPInput } from 'stencil-molecule'
import { useLocalization } from 'stencil-hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import jwt_decode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useBotConfig } from 'stencil-hooks'
import axios from 'axios'
import { FormattedMessage } from 'react-intl'
const LocalOtpPage: React.FC = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const config = useBotConfig('component', 'otpPage')
  const theme = useBotAppColorPalates()
  const { logo, showLogo, showSplitedView, otpLength, resendOtpTimer } = config
  const router = useRouter()
  const searchParams = useSearchParams()
  const mobile = searchParams.get('state')
  const t = useLocalization()

  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
  useEffect(() => {
    if (!mobile || mobile?.length !== 10) {
      router.push('/login')
    }
  }, [router])

  const verifyOtp = async (userData: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/login/otp`,
        userData
      )
      console.log({ response })
      localStorage.setItem(
        'user',
        JSON.stringify(response?.data?.result?.data?.user)
      )
      return response.data
    } catch (error) {
      toast.error(`${t('message.invalid_otp')}`)
      console.error(error)
    }
  }

  const resendOtp = async () => {
    try {
      setLoading(true)
      const response = axios.get(
        `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/sendOTP?phone=${mobile}`
      )
      console.log(response)
      setLoading(false)
      setCountdown(resendOtpTimer)
      toast.success(`${t('message.otp_sent_again')}`)
    } catch (error) {
      setLoading(false)
      console.error('Error resending OTP:', error)
      toast.error(`${t('error.error.sending_otp')}`)
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(
        () => setCountdown((prevCountdown) => prevCountdown - 1),
        1000
      )
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (otp.length === Number(otpLength)) {
        if (navigator.onLine) {
          setLoading(true)
          verifyOtp({
            loginId: mobile,
            password: otp,
            applicationId: process.env.NEXT_PUBLIC_USER_SERVICE_APP_ID,
            //@ts-ignore
          }).then((res: any) => {
            console.log({ res })
            setLoading(false)
            if (res.params.status === 'Success') {
              let expires = new Date()
              expires.setTime(
                expires.getTime() +
                  res.result.data.user.tokenExpirationInstant * 1000
              )
              removeCookie('access_token')

              setCookie('access_token', res.result.data.user.token, {
                path: '/',
                expires,
              })
              const phoneNumber = mobile
              // @ts-ignore
              localStorage.setItem('phoneNumber', phoneNumber)
              const decodedToken = jwt_decode(res.result.data.user.token)
              //@ts-ignore
              localStorage.setItem('userID', decodedToken?.sub)
              localStorage.setItem('auth', res.result.data.user.token)
              // @ts-ignore
              // setUserId(analytics, localStorage.getItem("userID"));
              setTimeout(() => {
                router.push('/')
              }, 10)
            } else {
              toast.error(`${t('message.invalid_otp')}`)
            }
          })
        } else {
          toast.error(`${t('label.no_internet')}`)
        }
      }
    },
    [otp.length]
  )

  useEffect(() => setCountdown(resendOtpTimer), [])
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <div className={styles.main}>
        {showSplitedView && (
          <div
            className={styles.leftColumn}
            style={{ background: theme?.primary?.main }}
          >
            {showLogo && (
              <div className={styles.logo}>
                <img src={logo} width={150} height={40} alt="" />
              </div>
            )}
          </div>
        )}
        <div className={styles.rightColumn}>
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
            <Typography
              variant="h4"
              textAlign="center"
              width="90%"
              color="#1E232C"
              sx={{ m: 2 }}
            >
              {t('message.otp_verification')}
            </Typography>
            <FormattedMessage
              id="message.otp_message"
              defaultMessage="We will send you a 4 digit one time password on this mobile number <br><b>{mobile}</b>"
              values={{
                mobile: mobile,
                br: (chunks) => <br />,
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                mt: 1,
                width: '90%',
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
                  separator={<></>}
                  value={otp}
                  onChange={setOtp}
                  length={otpLength}
                />
              </Box>
              <div style={{ marginTop: '10px' }}>
                {countdown > 0 ? (
                  <span>
                    <FormattedMessage
                      id="message.wait_minutes"
                      defaultMessage="Please wait {countdown} seconds before resending OTP"
                      values={{ countdown }}
                    />
                  </span>
                ) : (
                  <>
                    <Typography variant="body2" align="center" color="#838BA1">
                      {t('message.didnt_receive')} &nbsp;
                      <p
                        onClick={resendOtp}
                        style={{
                          color: theme?.primary?.main || '#3da156',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        {t('message.resend_again')}
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
                  onClick={() => router.push('/login')}
                  sx={{
                    textTransform: 'none',

                    p: 1,

                    // background: config?.theme.secondaryColor.value,
                    background: '#000',
                    borderRadius: '10px',
                    width: '50%',
                  }}
                >
                  {t('label.back')}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    p: 1,

                    // background: config?.theme.secondaryColor.value,
                    background: theme.primary.main,
                    borderRadius: '10px',
                    width: '50%',
                  }}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `${t('label.submit')}`
                  )}
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

export default LocalOtpPage
