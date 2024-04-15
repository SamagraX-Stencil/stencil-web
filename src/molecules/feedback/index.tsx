import React, { useState } from 'react'
import styles from './index.module.css'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { component } from './../../../app.config.json'
import { toast } from 'react-hot-toast'
import { useColorPalates } from '../theme-provider/hooks'

const FeedbackPage: React.FC = () => {
  const { feedbackPage } = component

  const [star, setStar] = useState(1)
  const [review, setReview] = useState('')

  const theme = useColorPalates()

  const handleFeedback = () => {
    const rateBox = feedbackPage.ratingBox
    const reviewContainer = feedbackPage.reviewBox

    const sendReviewSuccess = () => {
      setTimeout(() => {
        toast.success(`Review sent successfully`)
        setReview('')
      }, 2000)
    }

    const sendReviewError = () => {
      toast.error(`Please provide valid review`)
    }

    if (rateBox && reviewContainer) {
      star === 0 ? sendReviewError() : sendReviewSuccess()
    } else if (rateBox && !reviewContainer) {
      star === 0 ? sendReviewError() : sendReviewSuccess()
    } else if (!rateBox && reviewContainer) {
      review === '' ? sendReviewError() : sendReviewSuccess()
    }
  }

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          fontSize: '5vh',
          fontWeight: 'bold',
          m: 2,
          p: 2,
          display: 'fixed',
          color: theme?.primary?.main,
        }}
      >
        {feedbackPage.Title}
      </Typography>

      <Box className={styles.main}>
        {feedbackPage.ratingBox === true && (
          <Box className={styles.section}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '3vh',
                color: theme?.primary?.main,
              }}
            >
              {feedbackPage.ratingBoxTitle}
            </Typography>

            <Rating
              data-testid="ratingComponent"
              name="simple-controlled"
              value={star}
              max={feedbackPage.ratingMaxStars}
              onChange={(event, newValue) => {
                console.log(event)
                setStar(() => {
                  return newValue === null ? 1 : newValue
                })
              }}
              defaultValue={1}
              sx={{
                fontSize: '6vh',
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '2vh',
                color: theme?.primary?.main,
              }}
            >
              {feedbackPage.ratingStarDescription}
            </Typography>
            <Button
              id="ratingBtn"
              variant="contained"
              data-testid="ratingBtn"
              sx={{
                mt: 2,
                backgroundColor: `${theme.primary?.dark}`,
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '10px',
                p: 1.5,
                '&:hover': {
                  backgroundColor: `${theme.primary?.main}`,
                },
              }}
              onClick={handleFeedback}
            >
              {feedbackPage.ratingButtonText}
            </Button>
          </Box>
        )}

        {feedbackPage.reviewBox === true && (
          <Box className={styles.section}>
            <Typography
              sx={{
                m: '1rem',
                fontWeight: 'bold',
                fontSize: '3vh',
                color: theme?.primary?.main,
              }}
            >
              {feedbackPage.reviewBoxTitle}
            </Typography>
            <textarea
              placeholder={feedbackPage.reviewPlaceholder}
              value={review}
              className={styles.textBlock}
              style={{
                border: `2px solid ${theme?.primary?.light}`,
              }}
              onChange={(e) => {
                setReview(e.target.value)
              }}
            />

            <Button
              id="reviewBtn"
              variant="contained"
              data-testid="reviewBtn"
              sx={{
                mt: 2,
                backgroundColor: `${theme.primary?.dark}`,
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '10px',
                p: 1.5,
                '&:hover': {
                  backgroundColor: `${theme.primary?.main}`,
                },
              }}
              onClick={handleFeedback}
            >
              {feedbackPage.reviewButtonText}
            </Button>
          </Box>
        )}
      </Box>
    </div>
  )
}

export default FeedbackPage
