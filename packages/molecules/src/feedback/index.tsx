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
  // const [feedbackLoader, setFeedbackLoader] = useState(false);

  const handleFeedbackClick = async () => {
    try {
      // setFeedbackLoader(true);
      await handleFeedback();
      // setFeedbackLoader(false);
      toast.success('Feedback submitted successfully');
    } catch (error) {
      // setFeedbackLoader(false);
      toast.error('Error while submitting feedback');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Box
        style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px',
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
              color: '#f5952f', // primary.main color
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
              Do you find it useful?
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
              Tap a Star to Rate.
            </Typography>
            <Button
              data-testid="feedback-rating-button"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#f5952f',
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: '#f5952f', // primary.dark color
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
             Write your review (optional)
            </Typography>
            <TextField
              data-testid="feedback-review-component"
              placeholder="Write your review here"
              multiline
              rows={8}
              variant="outlined"
              fullWidth
              onChange={(e) => onChangeReview(e.target.value)}
               sx={{
    border: '2px solid #f5952f',
    width: '100%',  
    maxWidth: '1200px',  
  }}
            />
            <Button
              id="reviewBtn"
              variant="contained"
              data-testid="feedback-review-button"
              sx={{
                mt: 2,
                backgroundColor: '#f5952f',
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: '#f5952f',
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
