import React, { useCallback } from "react";
import styles from "./index.module.css";
import { Avatar, Box, Button, Typography } from "@mui/material";
import CallRoundedIcon from "@mui/icons-material/Call";
import { useColorPalates } from "../../molecules/theme-provider/hooks";
import { useUiConfig } from "../../hook/useConfig";
import downtimeImage from ".././downtime-page/assets/downTimeGIF.gif";

const DowntimePage: React.FC = () => {
  const config = useUiConfig("component", "downtime");

  const theme = useColorPalates();
  const handleRefreshClick = useCallback(() => {
    // window?.location.reload()
    console.log(config.refreshText ?? "Contact Details");
  }, []);
  const handlePreviousClick = useCallback(() => {
    // window?.history.back();
    console.log(config.previousPageText ?? "Contact Details");
  }, []);

  const handleContactUserClick = useCallback(() => {
    console.log(config.contactLink ?? "Contact Details");
  }, []);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <Box className={styles.container}>
        <Box>
          <Typography
            fontSize="1.5rem"
            fontWeight={600}
            color={theme?.primary?.main}
          >
            {config.title ?? "Downtime"}
          </Typography>
        </Box>
        <Box my={4}>
          <img
            src={config.downTimeImage || downtimeImage}
            alt="downtimeGif"
            className={styles.imageContainer}
          />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600} color={theme?.grey?.[600]}>
            {config.supportingText ?? "Description"}
          </Typography>
        </Box>
        <Box gap={1} display={"flex"} my={2}>
          <Box>
            <Avatar
              sx={{ bgcolor: theme.primary.main, width: "7vh", height: "7vh" }}
              alt="Call Icon"
            >
              <CallRoundedIcon fontSize="large" />
            </Avatar>
          </Box>
          <Button
            variant={"text"}
            sx={{ textTransform: "none" }}
            onClick={handleContactUserClick}
          >
            <Typography
              variant="h5"
              color={theme?.grey?.[600]}
              fontWeight={600}
              sx={{ textDecoration: "underline" }}
            >
              {config.contactLink ?? "Contact Details"}
            </Typography>
          </Button>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-around"}
          width={"100%"}
          my={4}
        >
          <Button
            className={styles.roundedButton}
            onClick={handleRefreshClick}
            variant="contained"
            size="large"
            style={{
              textTransform: "none",
              backgroundColor: theme?.grey?.[600],
            }}
          >
            <Typography variant="body1">
              {config.refreshText ?? "Reload Page"}
            </Typography>
          </Button>
          <Button
            className={styles.roundedButton}
            variant="contained"
            size="large"
            style={{
              textTransform: "none",
              backgroundColor: theme?.primary?.main,
            }}
            onClick={handlePreviousClick}
          >
            <Typography variant="body1">
              {config.previousPageText ?? "Previous Page"}
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DowntimePage;
