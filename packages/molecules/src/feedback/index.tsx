import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';
import { toast } from 'react-hot-toast';

type FeedbackStyles = {
  heading?: object;
  rating?: object;
  review?: object;
  submitButton?: object;
};

type FeedbackProps = {
  showReviewBox?: boolean;
  showRatingBox?: boolean;
  star?: number | null;
  review?: string;
  onChangeReview?: (newReview: string) => void;
  onChangeRating?: (newRating: number | null) => void;
  handleFeedback?: () => void;
  customStyles?: FeedbackStyles;
};

const Feedback: React.FC<FeedbackProps> = ({
  showReviewBox = false,
  showRatingBox = false,
  star = 0,
  review = '',
  onChangeReview = () => {},
  onChangeRating = () => {},
  handleFeedback = () => {},
  customStyles = {},
}) => {
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
          padding: '2rem',
          borderRadius: '10px',
        }}
      >
        <Box>
          <Typography
            data-testid="feedback-title"
            sx={{
              fontSize: '5vh',
              fontWeight: 'bold',
              color: '#1976d2', // primary.main color
              ...customStyles.heading,
            }}
          >
            Feedback
          </Typography>
        </Box>

        {showRatingBox && (
          <Box className="section">
            <Typography
              data-testid="feedback-rating-title"
              sx={{
                fontWeight: 'bold',
                fontSize: '3vh',
                ...customStyles.rating,
              }}
            >
              Rating
            </Typography>

            <Rating
              data-testid="feedback-rating-component"
              name="simple-controlled"
              value={star}
              max={5}
              onChange={(event, newValue) => onChangeRating(newValue)}
              defaultValue={1}
              sx={{
                fontSize: '6vh',
                ...customStyles.rating,
              }}
            />
            <Typography
              data-testid="feedback-rating-description"
              sx={{
                textAlign: 'center',
                fontSize: '2vh',
                ...customStyles.rating,
              }}
            >
              Please provide a rating.
            </Typography>
            <Button
              data-testid="feedback-rating-button"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#1976d2',
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: '#115293', // primary.dark color
                },
                ...customStyles.submitButton,
              }}
              onClick={handleFeedbackClick}
            >
              Submit Review
            </Button>
          </Box>
        )}

        {showReviewBox && (
          <Box className="section">
            <Typography
              data-testid="feedback-review-title"
              sx={{
                m: '1rem',
                fontWeight: 'bold',
                fontSize: '3vh',
                ...customStyles.review,
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
                border: '2px solid #1976d2',
                ...customStyles.review,
              }}
            />
            <Button
              id="reviewBtn"
              variant="contained"
              data-testid="feedback-review-button"
              sx={{
                mt: 2,
                backgroundColor: '#1976d2',
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: '#115293',
                },
                ...customStyles.submitButton,
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
