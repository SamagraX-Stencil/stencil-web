/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
 
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useColorPalates } from "../theme-provider/hooks";
import { OTPInput } from "../otp-input";




const OtpMobile = () => {
  const theme = useColorPalates();
  const [otp, setOtp] = useState('')
  
  return (
    <Container>
      <div className="d-flex">
        <IconButton
          aria-label="fingerprint"
          style={{
            borderRadius: "12px",
            background: "",
            border: "1px solid #E8ECF4",
          }}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <div className="text-center w-100">
          <p
            style={{
              lineHeight: "40px",
              fontWeight: "500",
              fontSize: "22px",
              color: theme.primary.dark,
            }}
          >
            ओटीपी सत्यापन
          </p>
        </div>
      </div>

      <div className="text-center mt-3">
      
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "65vh",
          }}
        >
            <p style={{ color: "#51586B", fontSize: "18px",marginTop:'20%' }}>
        वह सत्यापन कोड दर्ज करें जो हमने अभी आपके मोबाइल नंबर पर भेजा है।
        </p>
           <Box
                className="text-center"  sx={{
                  mt: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <OTPInput
                  separator={<span style={{width:'10px'}}></span>}
                  value={otp}
                  onChange={setOtp}
                  length={4}
                />
              </Box>
          <div>
            <Box sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  textTransform: "none",
                  mt: 3,
                  mb: 4,
                  p: 1,
                  background: theme.primary?.main,
                  borderRadius: "10px",
                }}
              >
                सबमिट करे
              </Button>
              <div className="mt-2 d-flex justify-content-center">
              ओटीपी नहीं मिला?  &nbsp;
              <Link
                component="button"
                variant="body2"
                onClick={() => {}}
                
              >
                ओटीपी पुनः भेजें
              </Link>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Container>
  );
};



export default OtpMobile