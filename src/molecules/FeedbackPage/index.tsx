import React, { useState } from "react";
import styles from "./index.module.css";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import config from "./config.json";
import { toast } from "react-hot-toast";

const FeedbackPage: React.FC = () => {
  const [star, setStar] = useState(1);
  const [review, setReview] = useState("");

  const handleFeedback = () => {
    const rateBox = config.component.ratingBox;
    const reviewContainer = config.component.reviewBox;

    if (rateBox && reviewContainer) {
      if (star == 0) {
        toast.error(`Please provide valid review`);
      } else {
        setTimeout(() => {
          toast.success(`Review sent successfully`);
          setReview("");
        }, 2000);
      }
    } else if (rateBox && !reviewContainer) {
      if (star === 0) {
        toast.error(`Please provide valid review`);
      } else {
        setTimeout(() => {
          toast.success(`Review sent successfully`);
        }, 2000);
      }
    } else if (!rateBox && reviewContainer) {
      if (review === "") {
        toast.error(`Please provide valid review`);
      } else {
        setTimeout(() => {
          toast.success(`Review sent successfully`);
          setReview("");
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.container}>

      <Typography
              sx={{
                fontSize: "5vh",
                fontWeight: 'bold',
                m: 2,
                p: 2,
                display: 'fixed'
              }}
            >
        {config.component.Title}
      </Typography>

      <Box className={styles.main}>
        {config.component.ratingBox === true ? (
          <Box className={styles.section}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "3vh",
              }}
            >
              {config.component.ratingBoxTitle}
            </Typography>

            <Rating
              id="ratingComponent"
              name="simple-controlled"
              value={star}
              max={config.component.ratingMaxStars}
              
              // @ts-ignore
              onChange={(event, newValue) => {
                setStar(() => {
                  return newValue === null ? 1 : newValue;
                });
              }}
              defaultValue={1}
              sx={{
                fontSize: '6vh'
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "2vh"
              }}
            >
              {config.component.ratingStarDescription}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: `${config.theme.primaryColor.value}`,
                fontWeight: "bold",
                borderRadius: "10rem",
                fontSize: "10px",
                p: 1.5,
                "&:hover": {
                  backgroundColor: `${config.theme.secondaryColor.value}`,
                },
              }}
              onClick={handleFeedback}
            >
              {config.component.ratingButtonText}
            </Button>
          </Box>
        ) : null}

        {config.component.reviewBox === true ? (
          <Box className={styles.section}>
            <Typography
              sx={{
                m: "1rem",
                fontWeight: "bold",
                fontSize: "3vh",
              }}
            >
              {config.component.reviewBoxTitle}
            </Typography>
            <textarea
              placeholder={config.component.reviewPlaceholder}
              value={review}
              className={styles.textBlock}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: `${config.theme.primaryColor.value}`,
                fontWeight: "bold",
                borderRadius: "10rem",
                fontSize: "10px",
                p: 1.5,
                "&:hover": {
                  backgroundColor: `${config.theme.secondaryColor.value}`,
                },
              }}
              onClick={handleFeedback}
            >
              {config.component.reviewButtonText}
            </Button>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default FeedbackPage;
