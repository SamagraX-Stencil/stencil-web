import React, { useCallback, useState } from "react";

import farmer from "./assets/farmer.jpeg";
import { useColorPalates } from "../theme-provider/hooks";
import LanguagePicker from "../language-picker";
import { Box, CircularProgress, TextField, Button } from "@mui/material";
import { useUiConfig } from "../../hook/useConfig";

const LoginMobile = () => {
  const config = useUiConfig("component", "loginMobilePage");
  
  const theme = useColorPalates();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading] = useState(false);
  const [input, setInput] = useState("");
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^\d{0,10}$/;
    const maxLength = 10;
    const errorMessage = "Please enter a valid mobile number";

    const inputValue = e.target.value;
    const numericInput = inputValue.replace(/[^0-9]/g, "");

    // Update the input value with the numeric value
    setInput(numericInput);

    // Allow up to 10 digits for Phone Number

    const isValid = reg.test(numericInput);
    setValid(isValid);

    if (isValid || numericInput === "") {
      setInput(numericInput);
    } else {
      // Truncate input if it exceeds maximum length
      setInput(numericInput.slice(0, maxLength));
    }

    if (numericInput.length > maxLength) {
      // If input length exceeds maximum allowed digits
      setValid(false);
      setInput(numericInput.slice(0, maxLength));
    }

    setErrorMessage(errorMessage);
  }, []);

  return (
    <div
      style={{
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        color: "#333",
        margin: "auto",
        backgroundColor: "#fff",
        minHeight: "80vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "calc(100% - 85px - 10px)",
        }}
      >
        <LanguagePicker />
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%", // Adjust this value to move the container up or down
          width: "100%",
          bottom: "0",
          backgroundColor: "#fff",
          borderTopLeftRadius: "30% 5%", // Adjust the curvature
          borderTopRightRadius: "30% 5%",
          overflow: "hidden", // Ensures content aligns with the curved edges
        }}
      >
        <div className="p-4">
          <p
            style={{
              marginTop: "24px",
              fontSize: "24px",
              fontWeight: "400",
              color: "#51586B",
            }}
          >
          {config?.title}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "25vh",
            }}
          >
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                type="text"
                margin="normal"
                error={!valid}
                required
                fullWidth
                value={input}
                helperText={!valid ? errorMessage : ""}
                onChange={handleInput}
                label={config?.placeholder}
                name={"phone"}
                autoComplete={"phone"}
                autoFocus
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
                  // onClick={handleLogin}
                  disabled={!valid || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                   <>{config?.btnText}</> 
                  )}
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div>
          <img
            src={config?.backgroundImage || farmer}
            alt="Farmer with vegetables"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </main>
    </div>
  );
};

export default LoginMobile;
