import { Box, Container } from "@mui/material";
import { OTPInput } from "../molecules/OTPInput";
import VoiceRecorder from '../molecules/VoiceRecorder'
const Components = () => {
  function setInputMsg (){
    //message to be passed to VoiceRecorders
  }
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
        <div className='mt-2 p-5 border'>
          <VoiceRecorder
            setInputMsg={setInputMsg}
            tapToSpeak={false}
            includeDiv={false}
          />
        </div>
      </Container>
    </Box>
  );
};

export default Components;
