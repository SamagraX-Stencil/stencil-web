import {
  FC,
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react'
import styles from './style.module.css'
import { List } from '../../components/list'
import ForumIcon from '@mui/icons-material/Forum'
import { IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import moment from 'moment'
import _ from 'underscore'
import { ChatItem, HistoryItem } from './index.d'
import { map } from 'lodash'
import { useBotAppColorPalates } from '@repo/hooks'
import { FullPageLoader } from '../../components/fullpage-loader'
import { useFlags } from 'flagsmith/react'
import { useLocalization } from '@repo/hooks'
import axios from 'axios'
import ComingSoonPage from '../coming-soon-page'
import { useBotConfig } from '@repo/hooks'
import router from 'next/router'
import { toast } from 'react-hot-toast'
import { AppContext } from '@repo/provider'
import { recordUserLocation } from '../../utils/location'
import { v4 as uuidv4 } from 'uuid'

const HistoryPage: FC = () => {
  const [isFetching, setIsFetching] = useState(true)
  const theme = useBotAppColorPalates()
  const [conversations, setConversations] = useState([])
  const flags = useFlags(['show_chat_history_page'])
  const context = useContext(AppContext)
  const t = useLocalization()

  const config = useBotConfig('component', 'historyPage')
  const handleClick = useCallback((activeItem: ChatItem) => {
    sessionStorage.setItem(
      'conversationId',
      activeItem?.conversationId || 'null'
    )
    context?.setConversationId(activeItem?.conversationId)
    router.push('/chat')
  }, [])

  const deleteConversation = useCallback(
    (conversationId: any) => {
      const confirmed = window?.confirm(`${t('label.confirm_delete')}`)
      if (confirmed) {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BFF_API_URL}/user/conversations/delete/${conversationId}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem('auth')}`,
              },
            }
          )
          .then((res) => {
            if (conversationId === sessionStorage.getItem('conversationId')) {
              recordUserLocation()
              const newConversationId = uuidv4()
              sessionStorage.setItem('conversationId', newConversationId)
              context?.setConversationId(newConversationId)
              context?.setMessages([])
            }
            deleteConversationById(conversationId)
            fetchHistory()
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    [context?.setConversationId, context?.setMessages, t]
  )

  const deleteConversationById = useCallback(
    (conversationIdToDelete: any) => {
      const filteredConversations = [...conversations].filter(
        (conversation: any) =>
          conversation.conversationId !== conversationIdToDelete
      )
      setConversations(filteredConversations)
    },
    [conversations]
  )

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = () => {
    setIsFetching(true)
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_BFF_API_URL
        }/history/conversations?userId=${localStorage.getItem('userID')}`,
        {
          headers: {
            botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          },
        }
      )
      .then((res) => {
        console.log('All chat history:', { res })
        const sortedConversations = _.filter(
          res?.data,
          (conv) => conv?.channelMessageId !== null
        ).sort(
          //@ts-ignore
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
        console.log({ sortedConversations })
        const historyList = map(sortedConversations, (chatItem: any) => {
          const text = chatItem?.payload?.text.replace(/<end\/>/g, '') || ''
          let label
          if (text.startsWith('{') && text.endsWith('}')) {
            try {
              const parsedText = JSON.parse(text)
              const generalAdvice = parsedText?.generalAdvice
              if (generalAdvice) {
                label =
                  generalAdvice?.split(' ').slice(0, 12).join(' ') +
                  (generalAdvice?.split(' ').length > 12 ? '...' : '')
              } else {
                label =
                  text.split(' ').slice(0, 12).join(' ') +
                  (text.split(' ').length > 12 ? '...' : '')
              }
            } catch (error) {
              label =
                text.split(' ').slice(0, 12).join(' ') +
                (text.split(' ').length > 12 ? '...' : '')
            }
          } else {
            label =
              text.split(' ').slice(0, 12).join(' ') +
              (text.split(' ').length > 12 ? '...' : '')
          }

          return {
            id: chatItem?.messageId,
            label: label,
            conversationId: chatItem?.channelMessageId,
            userId: chatItem?.from,
            secondaryLabel: moment(chatItem?.timestamp).format(
              'hh:mm A DD/MM/YYYY'
            ),
            icon: <ForumIcon style={{ color: theme?.primary?.light }} />,
            secondaryAction: (
              <IconButton edge="end" aria-label="comments">
                {config?.allowDelete && (
                  <DeleteOutlineIcon
                    onClick={() => deleteConversation(chatItem?.conversationId)}
                  />
                )}
              </IconButton>
            ),
            onClick: handleClick,
            isDivider: true,
          }
        })
        //@ts-ignore
        setConversations(historyList)
        setIsFetching(false)
      })
      .catch((error) => {
        console.error(error)
        setIsFetching(false)
      })
  }

  if (!flags?.show_chat_history_page?.enabled) {
    return <ComingSoonPage />
  }
  return (
    <>
      <div className={styles.main}>
        <FullPageLoader
          loading={isFetching}
          color={theme?.primary?.main}
          label="Fetching History"
        />
        <div className={styles.title} style={{ color: theme?.primary?.main }}>
          {t('label.chats') ?? 'No Label Provided'}
        </div>
        <div className={styles.chatList}>
          <List
            items={conversations}
            noItem={{
              label: t('label.no_history') ?? 'No History Found',
              icon: <ForumIcon style={{ color: theme?.primary?.light }} />,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default HistoryPage
