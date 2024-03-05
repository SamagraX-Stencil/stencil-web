import { Box, Container } from "@mui/material";
import { OTPInput } from "../molecules/OTPInput";

const Components = () => {
  return (
    <Box
      minHeight="95vh" // Full viewport height
      style={{ background: "lightgray" }}
      className="bg-light"
    >
      <Container>
        <h4>OTP Input</h4>
        <div className="mt-2 p-5 border">
          <OTPInput separator="-" length={4} value="" onChange={() => null} />
        </div>
      </Container>
    </Box>
  );
};

export default Components;
