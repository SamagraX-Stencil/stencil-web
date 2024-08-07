import React, { useEffect, useState } from 'react';
import Feedback from '@samagra-x/stencil-molecules/lib/feedback';
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
    <>
      <Feedback
        star={star}
        review={review}
        showRatingBox={true}
        showReviewBox={true}
        onChangeReview={setReview}
        handleFeedback={handleFeedback}
      />
      <Menu />
    </>
  );
};

export default Feedback;