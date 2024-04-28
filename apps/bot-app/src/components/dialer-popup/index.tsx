import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import crossIcon from '../../assets/icons/crossIcon.svg';
import styles from './index.module.css';
import Image from 'next/image';
import { useLocalization } from '../../hooks';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AppContext } from '../../context';

const DialerPopup: React.FC<any> = ({ setShowDialerPopup }) => {
  const t = useLocalization();
  const [reviewSubmitted, reviewSubmitError] = useMemo(
    () => [t('message.review_submitted'), t('error.fail_to_submit_review')],
    [t]
  );
  const context = useContext(AppContext);
  const [review, setReview] = useState('');
  const inputRef = useRef(null);
  const negativeFeedbackPayload = {
    from: localStorage.getItem('phoneNumber'),
    appId: 'AKAI_App_Id',
    channel: 'AKAI',
    userId: localStorage.getItem('userID'),
    messageType: 'FEEDBACK_NEGATIVE',
    replyId: context?.currentQuery,
    conversationId: sessionStorage.getItem('conversationId'),
    botId: process.env.NEXT_PUBLIC_BOT_ID || '',
  };

  const submitReview = useCallback(
    (r: string) => {
      context?.newSocket.sendMessage({
        text: r,
        payload: negativeFeedbackPayload
      });
      context?.setCurrentQuery('');
      setShowDialerPopup(false);
    },
    [reviewSubmitError, reviewSubmitted, setShowDialerPopup]
  );

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setReview(inputValue);
    // Adjust textarea height dynamically based on content
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.style.height = 'auto';
      //@ts-ignore
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={styles.main}>
      <div
        className={styles.crossIconBox}
        onClick={() => {
          context?.setCurrentQuery('');
          setShowDialerPopup(false);
          context?.newSocket.sendMessage({
            payload: negativeFeedbackPayload
          });
        }}>
        <Image src={crossIcon} alt="crossIcon" layout="responsive" />
      </div>
      <p>{t('label.comment')}</p>
      <div className={styles.dialerBox}>
        <textarea
          ref={inputRef}
          value={review}
          onChange={handleInputChange}
          name="experience-feedback"
          id="experience-feedback"
          cols={35}
          rows={5}
          placeholder={t('message.comment_description')}></textarea>

        <button onClick={() => submitReview(review)}>
          {t('label.submit_feedback')}
        </button>
      </div>
    </div>
  );
};

export default DialerPopup;
