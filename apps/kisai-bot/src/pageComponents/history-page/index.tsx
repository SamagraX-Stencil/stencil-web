import { FC, useCallback, useEffect, useState, useContext, useRef } from 'react';
import styles from './style.module.css';
// import { List } from '../../components/list';
import { List } from '@samagra-x/stencil-molecules/lib/list';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import moment from 'moment';
import _ from 'underscore';
import { ChatItem, HistoryItem } from './index.d';
import { map } from 'lodash';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { ImportedFullPageLoader } from '../../components/fullpage-loader';

import { useLocalization } from '../../hooks';
import axios from 'axios';
import ComingSoonPage from '../coming-soon-page';
import { useConfig } from '../../hooks/useConfig';
import router from 'next/router';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context';
import { recordUserLocation } from '../../utils/location';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import Menu from '../../components/menu';

const HistoryPage: FC = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [cookie] = useCookies();
  const theme = useColorPalates();
  const [conversations, setConversations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const context = useContext(AppContext);
  const t = useLocalization();
  const chatListRef = useRef<HTMLDivElement>(null);

  const config = useConfig('component', 'historyPage');

  const handleClick = useCallback((activeItem: ChatItem) => {
    sessionStorage.setItem('tags', JSON.stringify(activeItem?.tags || '[]'));
    sessionStorage.setItem('conversationId', activeItem?.conversationId || 'null');
    context?.setConversationId(activeItem?.conversationId);
    router.push('/chat');
  }, []);

  const deleteConversation = useCallback(
    (conversationId: any) => {
      const confirmed = window?.confirm(`${t('label.confirm_delete')}`);
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
              const newConversationId = uuidv4();
              sessionStorage.setItem('conversationId', newConversationId);
              context?.setConversationId(newConversationId);
              context?.setMessages([]);
            }
            deleteConversationById(conversationId);
            fetchHistory(currentPage);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [context?.setConversationId, context?.setMessages, t, currentPage]
  );

  const deleteConversationById = useCallback(
    (conversationIdToDelete: any) => {
      const filteredConversations = [...conversations].filter(
        (conversation: any) => conversation.conversationId !== conversationIdToDelete
      );
      setConversations(filteredConversations);
    },
    [conversations]
  );

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const fetchHistory = (page: number) => {
    setIsFetching(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BFF_API_URL}/history/conversations`,
        {
          userId: localStorage.getItem('userID'),
          page: page,
          perPage: 10,
        },
        {
          headers: {
            botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          },
        }
      )
      .then((res) => {
        console.log('All chat history:', { res });
        const sortedConversations = _.filter(
          res?.data?.data,
          (conv) => conv?.channelMessageId !== null
        ).sort(
          //@ts-ignore
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        console.log({ sortedConversations });
        const historyList = map(sortedConversations, (chatItem: any) => {
          let text = String(chatItem?.payload?.text || '').replace(/<end\/>/g, '');

          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          text = doc.body.textContent || '';

          let label;
          if (text.startsWith('{') && text.endsWith('}')) {
            try {
              const parsedText = JSON.parse(text);
              const generalAdvice = parsedText?.generalAdvice;
              if (generalAdvice) {
                label =
                  generalAdvice.split(' ').slice(0, 12).join(' ') +
                  (generalAdvice.split(' ').length > 12 ? '...' : '');
              } else {
                label =
                  text.split(' ').slice(0, 12).join(' ') +
                  (text.split(' ').length > 12 ? '...' : '');
              }
            } catch (error) {
              label =
                text.split(' ').slice(0, 12).join(' ') + (text.split(' ').length > 12 ? '...' : '');
            }
          } else {
            label =
              text.split(' ').slice(0, 12).join(' ') + (text.split(' ').length > 12 ? '...' : '');
          }

          return {
            id: chatItem?.messageId,
            label: label,
            conversationId: chatItem?.channelMessageId,
            userId: chatItem?.from,
            tags: chatItem?.tags,
            secondaryLabel: moment(chatItem?.timestamp).format('hh:mm A DD/MM/YYYY'),
            icon: <ForumIcon style={{ color: theme?.primary?.light }} />,
            secondaryAction: (
              <IconButton edge="end" aria-label="comments">
                {config?.allowDelete && (
                  <DeleteOutlineIcon
                    onClick={() => deleteConversation(chatItem?.channelMessageId)}
                  />
                )}
              </IconButton>
            ),
            onClick: handleClick,
            isDivider: true,
          };
        });
        //@ts-ignore
        setConversations(historyList);
        setTotalPages(res?.data?.pagination?.totalPages || 1);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
        setIsFetching(false);
      });
  };

  if (!config?.historyShowHistoryPage) {
    return <ComingSoonPage />;
  }
  return (
    <>
      <div className={styles.main}>
        <ImportedFullPageLoader
          loading={isFetching}
          color={theme?.primary?.main}
          label="Fetching History"
        />
        <div
          className={styles.title}
          style={{ color: theme?.primary?.main }}
          data-testid="history-title"
        >
          {t('label.chats') ?? 'No Label Provided'}
        </div>
        <div className={styles.chatList} data-testid="history-list" ref={chatListRef}>
          <List
            items={conversations}
            noItem={{
              label: t('label.no_history') ?? 'No History Found',
              icon: <ForumIcon style={{ color: theme?.primary?.light }} />,
            }}
          />
        </div>
        <div className={styles.pagination} style={{ color: theme?.primary?.main }}>
          <IconButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            style={{ position: 'absolute', left: 0 }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <span>
            {currentPage} / {totalPages}
          </span>
          <IconButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            style={{ position: 'absolute', right: 0 }}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Menu />
      </div>
    </>
  );
};

export default HistoryPage;
