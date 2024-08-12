import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import LoginInput from '../login-input';
import OtpComponent from '../otp';

type InputType = 'mobile' | 'password' | 'email' | 'aadhaar' | 'otp' | 'username';

interface LoginProps {
  title?: string;
  handleNextTask: () => Promise<string>;
  ResetOtpForgotPassworkAction?: () => void;
  jwksUrl?: string;
  nextRoute?: string;
  type: InputType;
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  buttonText: string;
  errorMessage: string;
  otpCountDown?: number;
  mobileNumberForOtpScreen?: string;
  optBoxSeparator?: React.ReactNode;
  passWordPlaceholder?: string;
  ResetOtpForgotPassworkPlaceHolder?: string;
  passwordvalue?: string;
  passwordOnchange?: (value: any) => void;
  customStyles?: {
    containerStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    passwordInputStyle?: React.CSSProperties;
    forgotPasswordStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    otpStyles?: {
      mainStyle?: React.CSSProperties;
      formStyle?: React.CSSProperties;
      otpInputStyle?: React.CSSProperties;
      backButtonStyle?: React.CSSProperties;
      loginButtonStyle?: React.CSSProperties;
    };
  };
}
const InputComponent: React.FC<LoginProps> = ({
  title,
  handleNextTask,
  ResetOtpForgotPassworkAction,
  ResetOtpForgotPassworkPlaceHolder,
  // jwksUrl,
  // nextRoute,
  buttonText,
  type,
  value,
  onChange,
  errorMessage,
  placeholder,
  otpCountDown,
  mobileNumberForOtpScreen,
  optBoxSeparator,
  passWordPlaceholder,
  passwordvalue,
  passwordOnchange,
  customStyles = {},
}) => {
  const {
    containerStyle = {},
    titleStyle: titleStyle = {},
    inputStyle = {},
    passwordInputStyle = {},
    forgotPasswordStyle = {},
    buttonStyle = {},
    otpStyles = {},
  } = customStyles;
  const [valid, setValid] = useState(true);
  return (
    <Box
      display="flex"
      flexDirection="column"
      // alignItems="center"
      justifyContent="center"
      sx={containerStyle}
    >
      {title && (
        <Typography variant="h4" gutterBottom sx={titleStyle}>
          {title}
        </Typography>
      )}
      {type !== 'otp' ? (
        <>
          <LoginInput
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            inputstyle={inputStyle}
            valid={valid}
            errorMessage={errorMessage}
            setValid={setValid}
          />
          {type == 'username' && (
            <div style={{ marginTop: '12px' }}>
              <LoginInput
                type={'password'}
                value={passwordvalue || ''}
                onChange={passwordOnchange || (() => {})}
                placeholder={passWordPlaceholder || ''}
                inputstyle={passwordInputStyle}
              />
              <a
                style={{
                  textAlign: 'end',
                  display: 'block',
                  marginTop: '4px',
                  ...forgotPasswordStyle,
                }}
                onClick={ResetOtpForgotPassworkAction}
              >
                {ResetOtpForgotPassworkPlaceHolder}
              </a>
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTask}
            fullWidth
            size="large"
            sx={{ mt: 2, height: '60px', ...buttonStyle }}
            disabled={type === 'password' ? !valid || !passwordvalue?.length : !valid}
          >
            {buttonText}
          </Button>
        </>
      ) : (
        <OtpComponent
          countdown={otpCountDown}
          handleLogin={handleNextTask}
          otp={value}
          otpLength={4}
          phoneNumber={mobileNumberForOtpScreen}
          resendOtp={ResetOtpForgotPassworkAction}
          setOtp={onChange}
          separator={optBoxSeparator}
          ResetOtpForgotPassworkPlaceHolder={ResetOtpForgotPassworkPlaceHolder}
          otpCustomStyle={otpStyles}
        />
      )}
    </Box>
  );
};

export default InputComponent;
