import React, { useContext, useState } from 'react';
import crossIcon from '../../assets/icons/crossIcon.svg';
import styles from './index.module.css';
import Image from 'next/image';
import { useLocalization } from '../../hooks';
import { AppContext } from '../../context';
import { MessageType, XMessage } from '@samagra-x/xmessage';
import { useConfig } from '../../hooks/useConfig';
import toast from 'react-hot-toast';
import TransliterationInput from '../transliteration-input';

const FeedbackPopup: React.FC<any> = ({ setShowFeedbackPopup }) => {
  const t = useLocalization();
  const config = useConfig('component', 'chatUI');
  const context = useContext(AppContext);
  const [review, setReview] = useState('');

  const negativeFeedbackPayload = {
    app: process.env.NEXT_PUBLIC_BOT_ID || '',
    messageType: MessageType.FEEDBACK_NEGATIVE,
    messageId: {
      replyId: context?.currentQuery,
      channelMessageId: sessionStorage.getItem('conversationId'),
    },
    from: {
      userID: localStorage.getItem('userID'),
    },
  } as Partial<XMessage>;

  const submitReview = (r: string) => {
    context?.newSocket.sendMessage({
      payload: {
        payload: {
          text: r,
        },
        ...negativeFeedbackPayload,
      } as Partial<XMessage>,
    });
    context?.setCurrentQuery('');
    setShowFeedbackPopup(false);
  };

  return (
    <div className={styles.main}>
      <div
        className={styles.crossIconBox}
        onClick={() => {
          context?.setCurrentQuery('');
          setShowFeedbackPopup(false);
          context?.newSocket.sendMessage({
            payload: {
              ...negativeFeedbackPayload,
            } as Partial<XMessage>,
          });
        }}
      >
        <Image src={crossIcon} alt="crossIcon" layout="responsive" />
      </div>
      <p>{t('label.comment')}</p>
      <div className={styles.feedbackBox}>
        <TransliterationInput
          data-testid="feedback-popup-box"
          config={config}
          value={review}
          setValue={setReview}
          name="experience-feedback"
          id="inputBox"
          multiline={true}
          style={{ minHeight: '120px', minWidth: '250px', padding: '5px' }}
          placeholder={t('message.comment_description')}
        />

        <button onClick={() => submitReview(review)} data-testid="feedback-popup-button">
          {t('label.submit_feedback')}
        </button>
      </div>
    </div>
  );
};

export default FeedbackPopup;
