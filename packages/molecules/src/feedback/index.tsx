import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useColorPalates } from '@samagra-x/stencil-hooks';
import { useUiConfig } from '@samagra-x/stencil-hooks';
import styles from './index.module.css';

type FeedbackProps = {
  showReviewBox?: boolean;
  showRatingBox?: boolean;
  star?: number | null;
  review?: string;
  onChangeReview?: (newReview: string) => void;
  onChangeRating?: (newRating: number | null) => void;
  handleFeedback?: () => void;
  styles?: object;
};

const Feedback: React.FC<FeedbackProps> = ({
  showReviewBox = false,
  showRatingBox = false,
  star = 0,
  review = '',
  onChangeReview = () => {},
  onChangeRating = () => {},
  handleFeedback = () => {},
  styles = {},
}) => {
  const theme = useColorPalates();
  const config = useUiConfig('component', 'feedback');

  const [feedbackLoader, setFeedbackLoader] = useState(false);

  const handleFeedbackClick = async () => {
    try {
      setFeedbackLoader(true);
      await handleFeedback();
      setFeedbackLoader(false);
      toast.success('Feedback submitted successfully');
    } catch (error) {
      setFeedbackLoader(false);
      toast.error('Error while submitting feedback');
    }
  };

  return (
    <div className={styles.container}>
      <Box className={styles.main}>
        <Box>
          <Typography
            data-testid="feedback-title"
            sx={{
              fontSize: '5vh',
              fontWeight: 'bold',
              color: theme?.primary?.main,
            }}
          >
            Feedback
          </Typography>
        </Box>

        {showRatingBox && (
          <Box className={styles.section}>
            <Typography
              data-testid="feedback-rating-title"
              sx={{
                fontWeight: 'bold',
                fontSize: '3vh',
              }}
            >
              Rating
            </Typography>

            <Rating
              data-testid="feedback-rating-component"
              name="simple-controlled"
              value={star}
              max={config?.ratingMaxStars || 5}
              onChange={(event, newValue) => onChangeRating(newValue)}
              defaultValue={1}
              sx={{
                fontSize: '6vh',
              }}
            />
            <Typography
              data-testid="feedback-rating-description"
              sx={{
                textAlign: 'center',
                fontSize: '2vh',
              }}
            >
              Please provide a rating.
            </Typography>
            <Button
              data-testid="feedback-rating-button"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: `${theme?.primary?.main}`,
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: `${theme?.primary?.dark}`,
                },
              }}
              onClick={handleFeedbackClick}
            >
              Submit Review
            </Button>
          </Box>
        )}

        {showReviewBox && (
          <Box className={styles.section}>
            <Typography
              data-testid="feedback-review-title"
              sx={{
                m: '1rem',
                fontWeight: 'bold',
                fontSize: '3vh',
              }}
            >
              Review
            </Typography>
            <TextField
              data-testid="feedback-review-component"
              placeholder="Write your review here"
              value={review}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              onChange={(e) => onChangeReview(e.target.value)}
              sx={{
                border: `2px solid ${theme?.primary?.main}`,
              }}
            />
            <Button
              id="reviewBtn"
              variant="contained"
              data-testid="feedback-review-button"
              sx={{
                mt: 2,
                backgroundColor: `${theme?.primary?.main}`,
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: `${theme?.primary?.dark}`,
                },
              }}
              onClick={handleFeedbackClick}
            >
              Submit Review
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Feedback;
