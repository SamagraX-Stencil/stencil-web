import React, { CSSProperties, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import LoginInput from '../login-input';
import OtpComponent from '../otp';

type InputType = 'mobile' | 'password' | 'email' | 'aadhaar' | 'otp' | 'username';

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
  value: string;
  onChange: (value: any) => void;
  handleResendOtpButton: () => void;
  countDownTime?: number;
  mobileNumberForOtpScreen: string;
  optBoxSeparator?: React.ReactNode;
  ResetOtpPlaceHolder?: string;
  styles?: {
    titleStyle?: CSSProperties;
    subtitleStyle?: CSSProperties;
    phoneNumberStyle?: CSSProperties;
    countdownStyle?: CSSProperties;
    resendTextStyle?: CSSProperties;
    mainStyle?: React.CSSProperties;
    formStyle?: React.CSSProperties;
    otpInputStyle?: React.CSSProperties;
    backButtonStyle?: React.CSSProperties;
    loginButtonStyle?: React.CSSProperties;
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
const InputComponent: React.FC<LoginProps> = ({
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
    <Box display="flex" flexDirection="column" justifyContent="center" sx={mainContainerStyle}>
      {title && (
        <Typography variant="h4" gutterBottom sx={titleStyle}>
          {title}
        </Typography>
      )}
      {type !== 'otp' ? (
        <>
          {inputProps && (
            <LoginInput
              type={type}
              value={inputProps.value}
              onChange={inputProps.onChange}
              placeholder={inputProps.placeholder}
              inputstyle={inputProps.inputStyle}
              valid={valid}
              errorMessage={inputProps.errorMessage}
              setValid={setValid}
            />
          )}

          {type == 'username' && passwordProp && (
            <div style={{ marginTop: '12px' }}>
              <LoginInput
                type="password"
                value={passwordProp.passwordvalue || ''}
                onChange={passwordProp.passwordOnchange || (() => {})}
                placeholder={passwordProp.passWordPlaceholder || ''}
                inputstyle={passwordProp.passwordInputStyle}
              />
              <a
                style={{
                  textAlign: 'end',
                  display: 'block',
                  marginTop: '4px',
                  ...passwordProp.forgotPasswordStyleText,
                }}
                onClick={passwordProp.handleForgotPasswordButton}
              >
                {passwordProp.ForgotPassworkPlaceHolder}
              </a>
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={buttonProps.handleNextTask}
            fullWidth
            size="large"
            sx={{ mt: 2, height: '60px', ...buttonProps.buttonStyle }}
            disabled={type === 'password' ? !valid || !passwordProp?.passwordvalue?.length : !valid}
          >
            {buttonProps.buttonText}
          </Button>
        </>
      ) : (
        otpProps && (
          <OtpComponent
            countdown={otpProps.countDownTime}
            handleLogin={buttonProps.handleNextTask}
            otp={otpProps?.value || ''}
            otpLength={4}
            phoneNumber={otpProps.mobileNumberForOtpScreen}
            resendOtp={otpProps.handleResendOtpButton}
            setOtp={otpProps?.onChange}
            separator={otpProps.optBoxSeparator}
            ResetOtpForgotPassworkPlaceHolder={otpProps.ResetOtpPlaceHolder}
            otpCustomStyle={otpProps.styles}
          />
        )
      )}
    </Box>
  );
};

export default InputComponent;
