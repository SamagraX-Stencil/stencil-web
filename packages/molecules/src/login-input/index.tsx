import * as React from 'react';
import { TextField, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

type InputType = 'mobile' | 'password' | 'email' | 'aadhaar';

interface InputProps {
  type: InputType;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const LoginInput: React.FC<InputProps> = ({ type, value, onChange, placeholder }) => {
  const getType = () => {
    switch (type) {
      case 'mobile':
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

  return (
    <TextField
      type={getType()}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      sx={{ width: 300 }}
      defaultValue={value}
      size="small"
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
        sx={{ display: 'flex', flexDirection: 'row', width: '300px' }}
      >
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </div>
  );
};
