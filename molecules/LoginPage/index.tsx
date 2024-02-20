import React, { useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface LoginPageProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ handleSubmit }) => {
  const [isAadharClicked, setIsAadharClicked] = useState(false);

  const handleAadharClick = () => {
    setIsAadharClicked((prop) => !prop);
  };

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <div className={styles.main}>
        <Typography
          component="h1"
          variant="h4"
          textAlign="left"
          width="90%"
          color="#1E232C">
          Welcome!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: '90%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={
              isAadharClicked ? 'Enter Aadhar Number' : 'Enter Phone Number'
            }
            name={
              isAadharClicked ? 'aadhar' : 'phone'
            }
            autoComplete={isAadharClicked ? 'aadhar' : 'phone'}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 4,
              p: 1,
              background: '#1E232C',
              borderRadius: '10px',
            }}>
            Login
          </Button>
        </Box>
        <Typography
          variant="caption"
          textAlign="center"
          width="90%"
          color="#1E232C"
          sx={{ mb: 1 }}>
          or Login using
        </Typography>
        <Button fullWidth variant="text" onClick={handleAadharClick}>
          <Typography
            variant="button"
            sx={{
              textDecoration: 'underline',
              color: '#1E232C',
              fontWeight: 'bold',
            }}>
            {!isAadharClicked ? 'Aadhar Number' : 'Phone Number'}
          </Typography>
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
