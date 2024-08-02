import * as React from 'react';
import { TextField, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

type InputType = 'mobile' | 'password' | 'email' | 'aadhaar' | 'username';

interface InputProps {
  type: InputType;
  value: string | number;
  onChange: (event: any) => void;
  placeholder: string;
  inputstyle?: React.CSSProperties;
}

const LoginInput: React.FC<InputProps> = ({ type, value, onChange, placeholder, inputstyle }) => {
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

  return (
    <TextField
      type={getType()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      sx={{ width: '100%', ...inputstyle }}
      defaultValue={value}
      size="small"
      inputProps={{
        maxLength: getMaxLength(),
      }}
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
