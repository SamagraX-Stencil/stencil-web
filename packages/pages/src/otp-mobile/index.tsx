/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Box, Button, Container, IconButton, Link } from '@mui/material';
import { ArrowBackIosNewRounded } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from '@samagra-x/stencil-hooks';
import { OTPInput } from '@samagra-x/stencil-molecules';

const OtpMobile = () => {
  const theme = useColorPalates();
  const [otp, setOtp] = useState('');
  const config = useUiConfig('component', 'otpMobilePage');

  return (
    <Container>
      <div className="d-flex">
        <IconButton
          aria-label="fingerprint"
          style={{
            borderRadius: '12px',
            background: '',
            border: '1px solid #E8ECF4',
          }}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
        <div className="text-center w-100">
          <p
            style={{
              lineHeight: '40px',
              fontWeight: 600,
              fontSize: '24px',
              color: config?.topTextColor || theme.primary.dark,
            }}
          >
            {config?.topText}
          </p>
        </div>
      </div>

      <div className="text-center mt-3">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '65vh',
          }}
        >
          <p
            style={{
              color: '#51586B',
              fontSize: '24px',
              marginTop: '20%',
              fontWeight: 400,
            }}
          >
            {config?.centerText}
          </p>
          <Box
            className="text-center"
            sx={{
              mt: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <OTPInput
              separator={config?.otpSeparator || <span style={{ width: '10px' }}></span>}
              value={otp}
              onChange={setOtp}
              length={config?.otpLength || 4}
            />
          </Box>
          <div>
            <Box sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  borderRadius: '10px',
                  background: theme.primary?.dark,
                  height: '60px',
                }}
              >
                {config?.btnText}
              </Button>
              <div className="mt-2 d-flex justify-content-center">
                {config?.helpingText1} &nbsp;
                <Link component="button" variant="body2" onClick={() => {}}>
                  {config?.helpingText2}
                </Link>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OtpMobile;
