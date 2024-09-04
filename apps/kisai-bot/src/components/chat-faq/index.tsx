import React from 'react';
import { useRouter } from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './index.module.css';
import { useConfig } from '../../hooks/useConfig';
import { useLocalization } from '../../hooks';

interface FAQProps {
  onQuestionClick: (action: string) => void;
}

const FAQ: React.FC<FAQProps> = ({ onQuestionClick }) => {
  const router = useRouter();
  const config = useConfig('component', 'faq');
  const t = useLocalization();

  const questions = [t('label.faq_question1'), t('label.faq_question2'), t('label.faq_question3')];

  const handleClick = (question: string) => {
    onQuestionClick(question);
  };

  // const handleKnowMoreClick = () => {
  //   if (config.showKnowMoreButton) {
  //     router.push(config.knowMoreButtonLink);
  //   }
  // };

  return (
    <div className={styles.faqContainer}>
      <h3>{t('label.faq_title')}</h3>
      <br />
      {questions.map((question, index) => (
        <div key={index} className={styles.faqItem} onClick={() => handleClick(question)}>
          <div className={styles.faqBox}>
            <h3>{question}</h3>
          </div>
        </div>
      ))}

      {/* {config.showKnowMoreButton && (
        <div className={styles.knowMoreButton}>
          <button onClick={handleKnowMoreClick} style={{color: theme?.primary?.light}}>
            {t('label.know_more')} <ArrowForwardIcon />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default FAQ;
