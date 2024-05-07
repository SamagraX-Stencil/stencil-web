import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useUiConfig } from '../../hook/useConfig';
import { toast } from 'react-hot-toast';

const about: React.FC = () => {
  const theme = useTheme();
  const config = useUiConfig('component', 'feedbackPage');

  const [star, setStar] = useState(0);
  const [review, setReview] = useState('');

  const handleFeedback = () => {
    if (star === 0 && config.ratingBox) {
      toast.error('Please provide a rating');
    } else if (!review && config.reviewBox) {
      toast.error('Please provide a review');
    } else {
      // Handle feedback submission
      toast.success('Feedback submitted successfully');
      setStar(0);
      setReview('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        marginTop:-80
      }}
    >
      <Typography variant="h4" align="center" color={theme.palette.primary.main} gutterBottom>
        {config.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        {config.ratingBox && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{textAlign:"center",fontWeight:"bold"}} color={theme.palette.primary.main} gutterBottom>
              {config.ratingBoxTitle}
            </Typography>
            <Rating
              data-testid="ratingComponent"
              name="simple-controlled"
              value={star}
              max={config.ratingMaxStars}
              onChange={(event, newValue) => {
                console.log(event)
                setStar(() => {
                  return newValue === null ? 0 : newValue
                })
              }}
              defaultValue={1}
              sx={{
                fontSize: '3rem',
                mb: 2,
              }}
            />
            <Typography variant="body1" color={theme.palette.primary.main} align="center" gutterBottom>
              {config.ratingStarDescription}
            </Typography>
            <Button variant="contained" sx={{marginBottom:20,marginTop:10,marginLeft:42}} onClick={handleFeedback}>
              {config.ratingButtonText}
            </Button> 
          </Box>
        )}
        {config.reviewBox && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" color={theme.palette.primary.main} gutterBottom>
              {config.reviewBoxTitle}
            </Typography>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={config.reviewPlaceholder}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" sx={{marginTop:10}} onClick={handleFeedback}>
              {config.reviewButtonText}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default about;
