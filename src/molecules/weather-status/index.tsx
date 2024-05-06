import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import cloud from "./assets/cloud.png";
import { useColorPalates } from "../theme-provider/hooks";
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95vw",
  maxWidth: "500px",
  backgroundColor: "#fff",
  padding: "20px",
  border: "none",
  borderRadius: "5px",
};

const WeatherStatus = () => {
  const [open, setOpen] = React.useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 
  const handleClose = () => setOpen(false);

  const weatherDetails = [
    {
      id: 1,
      label:
        "उन्हें अच्छी तरह हाइड्रेटेड रखने के लिए स्वच्छ पेयजल उपलब्ध कराएं।",
    },
    {
      id: 2,
      label: "तूफ़ान गुज़रने तक उन्हें शांत और सुरक्षित स्थान पर रखें।",
    },
  ];

  const theme = useColorPalates();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div style={style}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  display: "inline-block",
                  color: "#023035",
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                मंगलवार को आंधी आने की अनुमान
              </p>
              <CloseRoundedIcon onClick={handleClose} />
            </div>
            <Divider />
            <div className="text-center p-3">
              <img src={cloud} />
              <List dense>
                {weatherDetails.map((item) => (
                  <ListItem>
                    <ListItemText
                      sx={{
                        color: "#000000",
                        lineHeight: "13px",
                        fontWeight: "400",
                        fontSize: "13px",
                      }}
                      primary={`${item?.id}. ${item.label}`}
                    />
                  </ListItem>
                ))}
              </List>
              <p
                style={{
                  fontWeight: "500",
                  color: theme.primary.dark,
                  fontSize: "12px",
                }}
              >
                <span
                  className="rounded-circle "
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <CheckCircleRoundedIcon
                    color="success"
                    style={{ fontSize: "14px" }}
                  />
                </span>
                वेरिफ़िएड बय ओडिशा कृषि एवं प्रौद्योगिकी विश्वविद्यालय
              </p>
              <Button
                fullWidth
                variant="contained"
                style={{ marginTop: "30px" }}
              >
                जानिए इसके बारे में
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default WeatherStatus;
