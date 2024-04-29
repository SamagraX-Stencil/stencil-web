import React from "react";
import sun from "./assets/sun.png";
import book from "./assets/book.png";
import chat from "./assets/chat.png";
import pest from "./assets/pest.png";
import cloud from "./assets/cloud.png";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { map } from "lodash";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useColorPalates } from "../theme-provider/hooks";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#363A44",
  borderRadius: "5px",
  position: "relative",
}));

const AkaiDashboard = () => {
  const theme = useColorPalates();
  const [value, setValue] = React.useState(0);
  const chips = [
    { id: 1, label: "उत्तर पश्चिम" },
    { id: 2, label: "धीमी", color: "#101860" },
    { id: 3, label: "ज़्यादा", color: "#4CC3CB" },
    { id: 4, label: "हवा की दिशा" },
    { id: 5, label: "हवा की गति" },
    { id: 6, label: "नमी" },
  ];

  const options = [
    { id: 1, label: "मौसम की जानकारी", key: "मौसम की जानकारी", image: cloud },
    {
      id: 2,
      label: "योजनाओं की जानकारी",
      key: "चायोजनाओं की जानकारीवल",
      image: book,
    },
    { id: 3, label: "कीट एवं रोग", key: "कीट एवं रोग", image: pest },
    { id: 3, label: "अन्य सूचना", key: "अन्य सूचना", image: chat },
  ];
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(90deg, #26C3E4 20%, #3A7BD5 100%)`,
          color: "white",
          borderRadius: "5px",
        }}
        className="p-2"
      >
        <div style={{ height: "50%" }} className="mb-1">
          <div className="text-right">
            <img src={sun} style={{ height: "30px", width: "30px" }} />
            <div style={{ display: "flex" }}>
              <div style={{ width: "30%" }}>
                <h1 style={{ color: "white" }}>27°C</h1>
              </div>
              <div className="text-right" style={{ width: "70%" }}>
                <h3>स्पष्ट</h3>
                <p>
                  <LocationOnRoundedIcon style={{ fontSize: "18px" }} /> बिशनपुर
                  सेक्टर 58, नोएडा
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ background: "#fff", height: "50%", borderRadius: "5px" }}
          className="p-2 text-center"
        >
          <div style={{ width: "80%" }} className="mx-auto ">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 3, sm: 8, md: 12 }}
            >
              {map(chips, (chip) => (
                <Grid item xs={1} sm={4} md={4}>
                  <Chip
                    label={chip?.label}
                    size="small"
                    sx={{
                      minWidth: "70px",
                      background: chip?.color ?? null,
                      color: chip?.color ? "white" : "black",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              fullWidth
              variant="contained"
              style={{
                marginTop: "30px",
                backgroundColor: "#F6F7F9",
                color: theme?.primary?.dark,
              }}
              endIcon={<ArrowForwardRoundedIcon />}
            >
              जानिए मौसम के बारे में
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div style={{ width: "90%" }} className="mx-auto">
          <p
            style={{
              color: "#51586B",
              background: theme.primary.light,
              borderRadius: "5px",
            }}
            className="p-1"
          >
            मुझसे कुछ भी पूछें
          </p>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
            style={{ marginTop: "20px" }}
          >
            {options.map((_) => (
              <Grid item xs={1} sm={4} md={4}>
                <Item
                  style={{
                    border: "1px solid #B0B0B0",
                  }}
                >
                  <img
                    src={_?.image}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <p style={{ lineHeight: "1rem" }} className="mt-2">
                    {_?.label}
                  </p>
                </Item>
              </Grid>
            ))}
          </Grid>
          <div className="mt-4 text-center">
            <p style={{ color: "##6C758B", fontSize: "12px" }}>
              आमा कृषी चैटबॉट गलतियाँ कर सकता है। महत्वपूर्ण जानकारी की जाँच
              करने पर विचार करें. हमारी शर्तें और गोपनीयता नीति पढ़ें।
            </p>
          </div>
        </div>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="होम " icon={<HomeRoundedIcon />} />
            <Button
              className="my-auto"
              sx={{
                height: "30px",
                borderRadius: "40px",
                background: theme.primary.dark,
                color: "white",
              }}
              size="small"
              variant="contained"
              startIcon={<KeyboardVoiceRoundedIcon />}
            >
              बोल के पूछे
            </Button>

            <BottomNavigationAction
              label="अलर्टस"
              icon={
                <Badge badgeContent="3" color="error">
                  <Typography fontSize="xl">🔔</Typography>
                </Badge>
              }
            />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
};

export default AkaiDashboard;
