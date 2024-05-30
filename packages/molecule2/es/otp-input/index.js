import * as React from "react";
import { Box, styled } from "@mui/material";
import { Input as BaseInput } from "@mui/material";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function OTPInput(_ref) {
  var separator = _ref.separator,
    length = _ref.length,
    value = _ref.value,
    onChange = _ref.onChange;
  var inputRefs = React.useRef(new Array(length).fill(null));
  var focusInput = function focusInput(targetIndex) {
    var targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };
  var selectInput = function selectInput(targetIndex) {
    var targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };
  var handleKeyDown = function handleKeyDown(event, currentIndex) {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange(function (prevOtp) {
          var otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        onChange(function (prevOtp) {
          var otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      default:
        break;
    }
  };
  var handleChange = function handleChange(event, currentIndex) {
    var currentValue = event.target.value;
    var indexToEnter = 0;
    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange(function (prev) {
      var otpArray = prev.split("");
      var lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };
  var handleClick = function handleClick(_event, currentIndex) {
    selectInput(currentIndex);
  };
  var handlePaste = function handlePaste(event, currentIndex) {
    event.preventDefault();
    var clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      var pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      var indexToEnter = 0;
      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1;
        } else {
          break;
        }
      }
      var otpArray = value.split("");
      for (var i = indexToEnter; i < length; i += 1) {
        var _pastedText;
        var lastValue = (_pastedText = pastedText[i - indexToEnter]) !== null && _pastedText !== void 0 ? _pastedText : " ";
        otpArray[i] = lastValue;
      }
      onChange(otpArray.join(""));
    }
  };
  return /*#__PURE__*/_jsx(Box, {
    sx: {
      display: "flex",
      gap: 1,
      alignItems: "center",
      border: 'none'
    },
    children: new Array(length).fill(null).map(function (_, index) {
      var _value$index;
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(BaseInput, {
          type: "number",
          slots: {
            input: InputElement
          },
          "aria-label": "Digit ".concat(index + 1, " of OTP"),
          slotProps: {
            input: {
              // @ts-ignore
              ref: function ref(ele) {
                inputRefs.current[index] = ele;
              },
              onKeyDown: function onKeyDown(event) {
                return handleKeyDown(event, index);
              },
              onChange: function onChange(event) {
                return handleChange(event, index);
              },
              onClick: function onClick(event) {
                return handleClick(event, index);
              },
              onPaste: function onPaste(event) {
                return handlePaste(event, index);
              },
              value: (_value$index = value[index]) !== null && _value$index !== void 0 ? _value$index : ""
            }
          }
        }), index === length - 1 ? null : separator]
      }, index);
    })
  });
}
var blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2"
};
var grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025"
};
var InputElement = styled("input")(function (_ref2) {
  var theme = _ref2.theme;
  return "\n  width: 40px;\n  font-family: 'IBM Plex Sans', sans-serif;\n  font-size: 0.875rem;\n  font-weight: 400;\n  line-height: 1.5;\n  padding: 8px 0px;\n  border-radius: 8px;\n  text-align: center;\n  color: ".concat(theme.palette.mode === "dark" ? grey[300] : grey[900], ";\n  background: ").concat(theme.palette.mode === "dark" ? grey[900] : "#fff", ";\n  border: 1px solid ").concat(theme.palette.mode === "dark" ? grey[700] : grey[200], ";\n  box-shadow: 0px 2px 4px ").concat(theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)", ";\n\n  // &:hover {\n  //   border-color: ").concat(blue[400], ";\n  // }\n\n  &:focus {\n    border-color: ").concat(blue[400], ";\n    box-shadow: 0 0 0 3px ").concat(theme.palette.mode === "dark" ? blue[600] : blue[200], ";\n  }\n\n  // firefox\n  &:focus-visible {\n    outline: 0;\n  }\n");
});