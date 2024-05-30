'use client'
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import crossIcon from '../../assets/icons/crossIcon.svg'
import styles from './index.module.css'
import Image from 'next/image'
import { useLocalization } from 'stencil-hooks'
import { AppContext } from 'stencil-provider'
import { MessageType, XMessage } from '@samagra-x/xmessage'

const DialerPopup: React.FC<any> = ({ setShowDialerPopup }) => {
  const t = useLocalization()
  const [reviewSubmitted, reviewSubmitError] = useMemo(
    () => [t('message.review_submitted'), t('error.fail_to_submit_review')],
    [t]
  )
  const context = useContext(AppContext)
  const [review, setReview] = useState('')
  const inputRef = useRef(null)

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
  } as Partial<XMessage>

  const submitReview = useCallback(
    (r: string) => {
      context?.newSocket.sendMessage({
        payload: {
          payload: {
            text: r,
          },
          ...negativeFeedbackPayload,
        } as Partial<XMessage>,
      })
      context?.setCurrentQuery('')
      setShowDialerPopup(false)
    },
    [reviewSubmitError, reviewSubmitted, setShowDialerPopup]
  )

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value
    setReview(inputValue)
    // Adjust textarea height dynamically based on content
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.style.height = 'auto'
      //@ts-ignore
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }

  return (
    <div className={styles.main}>
      <div
        className={styles.crossIconBox}
        onClick={() => {
          console.log('69')
          context?.setCurrentQuery('')
          setShowDialerPopup(false)
          context?.newSocket.sendMessage({
            payload: {
              ...negativeFeedbackPayload,
            } as Partial<XMessage>,
          })
        }}
      >
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
          placeholder={t('message.comment_description')}
        ></textarea>

        <button onClick={() => submitReview(review)}>
          {t('label.submit_feedback')}
        </button>
      </div>
    </div>
  )
}

export default DialerPopup
