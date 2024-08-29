import React, { useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import Loader from '../loader';
import Draggable from 'react-draggable';
import { useLocalization } from '../../hooks';
import ShareIcon from '../../assets/icons/share';
import DownloadIcon from '../../assets/icons/download';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context';
import axios from 'axios';
import { CircularProgress, Divider } from '@mui/material';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useConfig } from '../../hooks/useConfig';
import NewShareButtons from '@samagra-x/stencil-molecules/lib/share-buttons/shareButtons';
const ShareButtons = () => {
  const config = useConfig('component', 'share-buttons');
  const theme = useColorPalates();
  const secondaryColor = useMemo(() => {
    return theme?.primary?.main;
  }, [theme?.primary?.main]);

  const t = useLocalization();
  const context = useContext(AppContext);
  const [shareLoader, setShareLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);

  const downloadChat = async () => {
    const url = `${
      process.env.NEXT_PUBLIC_BFF_API_URL
    }/history/generate-pdf/${sessionStorage.getItem('conversationId')}`;

    return axios.get(url, {
      headers: {
        botId: '74b41966-c74a-43e7-ba43-07f038893cb4' || '',
        userId: localStorage.getItem('userID'),
        template: 'kmai-dev' || 'akai',
      },
    });
  };

  const downloadShareHandler = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string
  ) => {
    try {
      if (type === 'download') {
        setDownloadLoader(true);
      } else setShareLoader(true);

      const response = await downloadChat();
      const pdfUrl = response.data.pdfUrl;

      if (!pdfUrl) {
        toast.error(`${t('message.no_link')}`);
        return;
      }

      if (type === 'download') {
        setDownloadLoader(false);
        toast.success(`${t('message.downloading')}`);
        const link = document.createElement('a');

        link.href = pdfUrl;
        link.target = '_blank';
        // link.href = window.URL.createObjectURL(blob);

        link.download = 'Chat.pdf';
        link.click();
        setDownloadLoader(false);
        context?.downloadChat(pdfUrl);
      } else if (type === 'share') {
        setShareLoader(false);
        const response = await axios.get(pdfUrl, {
          responseType: 'arraybuffer',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const file = new File([blob], 'Chat.pdf', { type: blob.type });

        setShareLoader(false);

        if (!navigator.canShare) {
          //@ts-ignore
          if (window?.AndroidHandler?.shareUrl) {
            //@ts-ignore
            window.AndroidHandler.shareUrl(pdfUrl);
          } else {
            context?.shareChat(pdfUrl);
          }
        } else if (navigator.canShare({ files: [file] })) {
          toast.success(`${t('message.sharing')}`);
          console.log('hurray', file);
          await navigator
            .share({
              files: [file],
              title: 'Chat',
              text: 'Check out my chat with Bot!',
            })
            .catch((error) => {
              toast.error(error.message);
              console.error('Error sharing', error);
            });
        } else {
          toast.error(`${t('message.cannot_share')}`);
          console.error("Your system doesn't support sharing this file.");
        }
      } else {
        console.log(response.data);
        setDownloadLoader(false);
        setShareLoader(false);
      }
    } catch (error: any) {
      console.error(error);
      setDownloadLoader(false);
      setShareLoader(false);
      if (error.message === "Cannot read properties of undefined (reading 'shareUrl')") {
        toast.success(`${t('message.shareUrl_android_error')}`);
      } else toast.error(error.message);

      console.error(error);
    }
  };

  return (
    <NewShareButtons
      allowDownloadChat={config?.allowDownloadChat}
      handleButton={downloadShareHandler}
      allowShareChat={config?.allowShareChat}
      shareLoader={shareLoader}
      downloadLoader={downloadLoader}
    />
  );
};

export default ShareButtons;
