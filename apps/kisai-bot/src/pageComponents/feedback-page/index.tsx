import React, { useEffect, useState } from 'react';

import Feedback from '@samagra-x/stencil-molecules/lib/feedback';

import { toast } from 'react-hot-toast';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useConfig } from '../../hooks/useConfig';
import axios from 'axios';
import { useLocalization } from '../../hooks';
import Menu from '../../components/menu';

const FeedbackPage: React.FC = () => {
  const [star, setStar] = useState(1);
  const [review, setReview] = useState('');
  const theme = useColorPalates();
  const config = useConfig('component', 'feedbackPage');
  const t = useLocalization();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BFF_API_URL}/feedback/${localStorage.getItem('userID')}`, {
        headers: {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
        },
      })
      .then((res) => {
        setStar(res?.data?.rating);
        setReview(res?.data?.review);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFeedback = () => {
    if (!config) return;

    if (config?.ratingBox && star === 0) {
      toast.error('Please provide a rating');
      return;
    }

    if (config?.reviewBox && review === '') {
      toast.error('Please provide a review');
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BFF_API_URL}/feedback/${localStorage.getItem('userID')}`,
        {
          rating: star,
          review: review,
        },
        {
          headers: {
            botId: process.env.NEXT_PUBLIC_BOT_ID || '',
            orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          },
        }
      )
      .then(() => {
        toast.success('Feedback submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback. Please try again later.');
      });
  };

  return (
    <>
      <Feedback star={5} showRatingBox={true} showReviewBox={true} />
      <Menu />
    </>
  );
};

export default FeedbackPage;
