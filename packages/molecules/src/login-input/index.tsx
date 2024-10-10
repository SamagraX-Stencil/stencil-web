import * as React from 'react';
import { TextField, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

type InputType = 'mobile' | 'password' | 'email' | 'aadhaar' | 'username';

interface InputProps {
  type: InputType;
  value: string | number;
  onChange: (event: any) => void;
  placeholder: string;
  inputstyle?: React.CSSProperties;
  valid?: boolean;
  setValid?: (val: boolean) => void;
  errorMessage?: string;
}

const LoginInput: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  inputstyle,
  valid = true,
  setValid = () => {},
  errorMessage = '',
}) => {
  const getType = () => {
    switch (type) {
      case 'mobile':
        return 'tel';
      case 'aadhaar':
        return 'tel';
      case 'password':
        return 'password';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  };
  const getMaxLength = () => {
    switch (type) {
      case 'mobile':
        return 10;
      case 'aadhaar':
        return 12;
      case 'password':
        return 20;
      case 'email':
        return 50;
      default:
        return undefined;
    }
  };
  const validateInput = (inputValue: string) => {
    let isValid = true;

    switch (type) {
      case 'mobile':
        isValid = /^\d{10}$/.test(inputValue);
        break;
      case 'aadhaar':
        isValid = /^\d{12}$/.test(inputValue);
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
        break;
      default:
        break;
    }

    setValid(isValid);
  };
  const handleInputChange = (inputValue: string) => {
    let formattedValue = inputValue;

    switch (type) {
      case 'mobile':
        formattedValue = inputValue.replace(/[^0-9]/g, '');
        break;
      case 'aadhaar':
        formattedValue = inputValue.replace(/[^0-9]/g, '');
        break;
      case 'email':
        formattedValue = inputValue.trim();
        break;
      case 'password':
        formattedValue = inputValue;
        break;
      case 'username':
        formattedValue = inputValue;
        break;
      default:
        formattedValue = inputValue;
        break;
    }
    validateInput(formattedValue);
    onChange(formattedValue);
  };

  return (
    <TextField
      type={getType()}
      value={value}
      onChange={(e) => handleInputChange(e.target.value)}
      label={placeholder}
      variant="outlined"
      sx={{ width: '100%', ...inputstyle }}
      defaultValue={value}
      inputProps={{
        maxLength: getMaxLength(),
      }}
      fullWidth
      autoFocus
      error={!valid}
      helperText={!valid ? errorMessage : ''}
    />
  );
};

export default LoginInput;

export const LoginCheckBox = ({
  selectedValue,
  title,
  onChange,
}: {
  selectedValue: boolean;
  title: string;
  onChange: (value: boolean) => void;
}) => {
  return (
    <div>
      <Typography variant="body2" gutterBottom>
        {title}:
      </Typography>
      <RadioGroup
        name="custom-radio-group"
        value={selectedValue ? 'true' : 'false'}
        onChange={(e) => {
          const newValue = e.target.value === 'true';
          onChange(newValue);
        }}
        sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
      >
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </div>
  );
};
