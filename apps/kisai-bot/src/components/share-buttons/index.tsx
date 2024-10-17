import React, { useContext, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
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

  const handleShareButton = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShareLoader(true);
    try {
      // Add your share logic here
      toast.success(t('Share successful!'));
    } catch (error) {
      toast.error(t('Error sharing the chat.'));
    } finally {
      setShareLoader(false);
    }
  };

  const handleDownloadButton = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDownloadLoader(true);
    try {
      // Add your download logic here
      toast.success(t('Download successful!'));
    } catch (error) {
      toast.error(t('Error downloading the chat.'));
    } finally {
      setDownloadLoader(false);
    }
  };

  return (
    <NewShareButtons
      allowDownloadChat={config?.allowDownloadChat}
      handleDownloadButton={handleDownloadButton}
      handleShareButton={handleShareButton}
      allowShareChat={config?.allowShareChat}
      shareLoader={shareLoader}
      downloadLoader={downloadLoader}
    />
  );
};

export default ShareButtons;







