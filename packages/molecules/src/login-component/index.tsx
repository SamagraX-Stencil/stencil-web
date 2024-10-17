import React, { CSSProperties, useState } from 'react';
import { Button, Typography, Box, TextField, CircularProgress } from '@mui/material';
import LoginInput from '../login-input';
import OtpComponent from '../otp';
import DOMPurify from 'dompurify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export type InputType = 'mobile' | 'password' | 'email' | 'aadhaar' | 'otp' | 'username';

export interface ButtonProps {
  handleNextTask: () => Promise<string>;
  buttonText: string;
  jwksUrl?: string;
  nextRoute?: string;
  buttonStyle?: React.CSSProperties;
}

export interface InputProps {
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  errorMessage: string;
  inputStyle?: React.CSSProperties;
}

export interface OtpProps {
  waitMessage: string;
  otpDidntReceiveText: string;
  resendOtpText: string;
  textBeforeOtpBox: string;
  value: string;
  onChange: (value: any) => void;
  handleResendOtpButton: () => void;
  countDownTime?: number;
  mobileNumberForOtpScreen: string;
  optBoxSeparator?: React.ReactNode;
  ResetOtpPlaceHolder?: string;
  otpLength?: number;
  styles?: {
    mainStyle?: CSSProperties;
    formStyle?: CSSProperties;
    otpInputStyle?: CSSProperties;
    resendTextStyle?: CSSProperties;
  };
}

export interface PasswordProps {
  handleForgotPasswordButton: () => void;
  passWordPlaceholder?: string;
  passwordvalue?: string;
  passwordOnchange?: (value: any) => void;
  ForgotPassworkPlaceHolder?: string;
  forgotPasswordStyleText?: React.CSSProperties;
  passwordInputStyle?: React.CSSProperties;
}

export interface LoginProps {
  title?: string;
  type: InputType;
  mainContainerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  buttonProps: ButtonProps;
  inputProps?: InputProps;
  otpProps?: OtpProps;
  passwordProp?: PasswordProps;
}
const LoginComponent: React.FC<LoginProps> = ({
  title,
  type,
  mainContainerStyle,
  titleStyle,
  buttonProps,
  inputProps,
  otpProps,
  passwordProp,
}) => {
  const [valid, setValid] = useState(true);
  return (
    <Box
      sx={{
        height: '90%',
        width: '100%',
        ...mainContainerStyle,
      }}
    >
      {title && (
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontSize: '36px',
            width: '100%',
            fontWeight: 'bold',
            ...titleStyle,
          }}
        >
          {title}
        </Typography>
      )}
      <Box
        component="form"
        sx={{
          mt: 2,
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          {inputProps ? (
            <LoginInput
              type="mobile"
              value={inputProps?.value}
              onChange={inputProps?.onChange}
              placeholder={inputProps?.placeholder}
              errorMessage={inputProps?.errorMessage}
              setValid={setValid}
              inputstyle={inputProps?.inputStyle}
              valid={valid}
            />
          ) : (
            otpProps && (
              <OtpComponent
                waitMessage={otpProps?.waitMessage}
                otpDidntReceiveText={otpProps?.otpDidntReceiveText}
                resendOtpText={otpProps?.resendOtpText}
                countdown={otpProps.countDownTime}
                handleLogin={buttonProps.handleNextTask}
                otp={otpProps?.value || ''}
                otpLength={otpProps?.otpLength || 4}
                phoneNumber={otpProps.mobileNumberForOtpScreen}
                resendOtp={otpProps.handleResendOtpButton}
                setOtp={otpProps?.onChange}
                separator={otpProps.optBoxSeparator}
                otpCustomStyle={otpProps.styles}
                textBeforeOtpBox={otpProps.textBeforeOtpBox}
              />
            )
          )}
        </Box>
        {/* @ts-ignore */}
        <Button
          variant="contained"
          color="primary"
          onClick={buttonProps.handleNextTask}
          fullWidth
          size="large"
          sx={{
            textTransform: 'none',
            mt: 2,
            p: 1,
            height: '60px',
            fontSize: '16px',
            borderRadius: '10px',

            ...buttonProps?.buttonStyle,
          }}
          disabled={type === 'password' ? !valid || !passwordProp?.passwordvalue?.length : !valid}
          endIcon={<ArrowForwardIcon />}
        >
          {buttonProps.buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginComponent;
