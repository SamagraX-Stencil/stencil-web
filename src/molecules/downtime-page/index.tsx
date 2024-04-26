import React, { useCallback } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import CallRoundedIcon from "@mui/icons-material/Call";
import { useColorPalates } from "../../molecules/theme-provider/hooks";
import { useUiConfig } from "../../hook/useConfig";
import styles from "./index.module.css";
import DowntimeGif from "./assets/downTimeGIF.gif";

const DowntimePage: React.FC = () => {
  const config = useUiConfig("component", "downtime");
  const theme = useColorPalates();

  const handleRefreshClick = useCallback(() => {
    console.log(config.refreshText ?? "Reload Page");
  }, [config.refreshText]);

  const handlePreviousClick = useCallback(() => {
    console.log(config.previousPageText ?? "Previous Page");
  }, [config.previousPageText]);

  const handleContactUserClick = useCallback(() => {
    console.log(config.contactLink ?? "Contact Details");
  }, [config.contactLink]);

  return (
    <Box className={styles.container}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        color={theme?.primary?.main}
      >
        {config.title ?? "Downtime"}
      </Typography>

      <Box textAlign="center">
        <img
          src={DowntimeGif}
          alt="downtimeGif"
          className={styles.imageContainer}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      <Typography
        fontWeight={600}
        fontSize={18}
        color={theme?.grey?.[600]}
        textAlign="center"
        mb={2}
      >
        {config.supportingText ?? "Description"}
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Avatar sx={{ bgcolor: theme.primary.main }}>
          <CallRoundedIcon fontSize="small" />
        </Avatar>
        <Button
          variant="text"
          sx={{ textTransform: "none", ml: 1 }}
          onClick={handleContactUserClick}
        >
          <Typography fontSize={17} fontWeight={600}>
            {config.contactLink ?? "Contact Details"}
          </Typography>
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={10}>
        <Button
          className={styles.roundedButton}
          onClick={handleRefreshClick}
          variant="contained"
          size="large"
          style={{ backgroundColor: theme?.grey?.[600], marginRight: "10px" }}
        >
          <Typography variant="body1" fontWeight={"bold"}>
            {config.refreshText ?? "Reload Page"}
          </Typography>
        </Button>
        <Button
          className={styles.roundedButton}
          variant="contained"
          size="medium"
          style={{ backgroundColor: theme?.primary?.main }}
          onClick={handlePreviousClick}
        >
          <Typography variant="body1" fontWeight={"bold"}>
            {config.previousPageText ?? "Previous Page"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DowntimePage;
