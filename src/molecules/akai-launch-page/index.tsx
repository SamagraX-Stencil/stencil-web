import logo from "./assets/main.png";
import cm from "./assets/cm.png";
import bottom from "./assets/bottom.png";
import LanguagePicker from "../language-picker";
import { Container, IconButton } from "@mui/material";
import { useColorPalates } from "../theme-provider/hooks";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const AkaiLaunch = () => {
  const theme = useColorPalates();
  return (
    <Container
      className="p-2"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", 
        height: "80vh", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        className="p-2"
      >
        <img src={logo} style={{ height: "40px" }} />
        <LanguagePicker />
      </div>
      <div className="text-center">
        <div className="mt-4">
          <img src={cm} style={{ width: "148px", height: "210px" }} />
        </div>
        <div>
          <text
            style={{
              fontSize: "22px",
              color: theme.primary.dark,
              lineHeight: "42px",
              fontWeight: "600",
            }}
          >
            आमा कृषी ए.आई चैटबॉटै
          </text>
        </div>
        <img src={bottom} style={{ maxWidth: "80vw" }} />
      </div>
      <div className="text-center">
        <IconButton
          aria-label="fingerprint"
          style={{ background: theme.primary.dark }}
        >
          <ArrowForwardIcon style={{ color: "white" }} />
        </IconButton>
      </div>
    </Container>
  );
};

export default AkaiLaunch;
