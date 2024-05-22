import {
  Image as Img,
  ScrollView,
  List,
  ListItem,
  FileCard,
  Typing,
} from 'chatui-package'
import { FC, ReactElement, useCallback, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styles from './index.module.css'
import RightIcon from './assets/right'
import SpeakerIcon from './assets/speaker.svg'
import MsgThumbsUp from './assets/msg-thumbs-up'
import MsgThumbsDown from './assets/msg-thumbs-down'
import { MessageItemPropType } from './index.d'
import { JsonToTable } from '../json-to-table'
import { useColorPalates } from '@repo/hooks'
import { UpdatedBubble } from './bubble'

// import BlinkingSpinner from '../blinking-spinner/index';

const NewMessageItem: FC<MessageItemPropType> = ({
  message,
  themeColor,
  chatUi,
}) => {
  const theme = useColorPalates()

  const [reaction, setReaction] = useState(message?.content?.data?.reaction)
  // @ts-ignore
  const [optionDisabled, setOptionDisabled] = useState(
    message?.content?.data?.optionClicked || false
  )

  useEffect(() => {
    setReaction(message?.content?.data?.reaction)
  }, [message?.content?.data?.reaction])

  const feedbackHandler = useCallback(
    ({ like }: { like: 0 | 1 | -1; msgId: string }) => {
      if (reaction === 0) {
        return setReaction(like)
      }
      if (reaction === 1 && like === -1) {
        return setReaction(-1)
      }
      if (reaction === -1 && like === 1) {
        return setReaction(1)
      }
      setReaction(0)
    },
    [reaction]
  )

  const getLists = useCallback(({ choices }: { choices: any }) => {
    return (
      <List className={`${styles.list}`}>
        {choices?.map((choice: any, index: string) => (
          // {_.map(choices ?? [], (choice, index) => (
          <ListItem
            key={`${index}_${choice?.key}`}
            className={`${styles.onHover} ${styles.listItem}`}
            onClick={(e: any): void => {
              e.preventDefault()
              if (optionDisabled) {
                toast.error(`Cannot answer again`)
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color:
                  content?.data?.position === 'right'
                    ? theme?.primary?.main
                    : optionDisabled
                      ? themeColor.primaryColor.value
                      : theme?.primary?.main,
              }}
            >
              <div>{choice}</div>
              <div style={{ marginLeft: 'auto' }}>
                <RightIcon
                  width="30px"
                  color={
                    optionDisabled
                      ? themeColor.primaryColor.value
                      : theme?.primary?.main
                  }
                />
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    )
  }, [])

  const { content, type } = message

  console.log('here', content)

  const handleAudio = useCallback((url: any) => {
    // console.log(url)
    if (!url) {
      toast.error('No audio')
      return
    }
    // Write logic for handling audio here
  }, [])

  return (
    <UpdatedBubble
      message={message}
      themeColor={themeColor}
      chatUi={chatUi}
      theme={theme}
      handleAudio={handleAudio}
      feedbackHandler={feedbackHandler}
      SpeakerIcon={SpeakerIcon}
      MsgThumbsUp={MsgThumbsUp}
      MsgThumbsDown={MsgThumbsDown}
      offlineBtnsStyle={styles.offlineBtns}
      messageSpeakerStyle={styles.msgSpeaker}
      tableContinerStyle={styles.tableContainer}
      messageTriangleLeftStyle={styles.messageTriangleLeft}
      messageTriangleRightStyle={styles.messageTriangleRight}
      optionsTextStyle={styles.optionsText}
      textBubbleStyle={styles.textBubble}
      msgFeedbackIconsStyle={styles.msgFeedbackIcons}
      msgFeedbackStyle={styles.msgFeedback}
      getLists={getLists}
      reaction={reaction}
    />
  )
}

export default NewMessageItem
