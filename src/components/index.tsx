
import { Box, Container, Typography } from "@mui/material";
import { OTPInput } from "../molecules/OTPInput";
import Navbar from "./newnavbar/index";  

const Components = () => {
  return (
    <>
      <Box
        minHeight="5vh" // Full viewport height
        style={{ background: "lightgray" }}
        className="bg-light"
      >
        <Container>
          <Typography variant="h4" gutterBottom> OTP Input </Typography> 
          <div className="mt-2 p-5 border">
            <OTPInput separator="-" length={4} value="" onChange={() => null} />
          </div>
        </Container>
      </Box>

      <Box
      minHeight= "5vh"
        style={{ background: "lightgray" }}
        className="bg-light"
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            New Navbar  
          </Typography>
          <Navbar />
        </Container>
      </Box>
    </>
  );
};

export default Components;
