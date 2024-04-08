// @ts-ignore
import React, { useMemo, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { toast } from 'react-hot-toast';
import { CircularProgress, Divider } from '@mui/material';
import { useColorPalates } from '../theme-provider/hooks';
import config from './config.json';

const ShareButtons = () => {

  const theme = useColorPalates();

  // @ts-ignore
  const secondaryColor = useMemo(() => {
    return theme?.primary?.light;
  }, [theme?.primary?.light]);

  const primaryColor = useMemo(() => {
    return theme?.primary?.main
  }, [theme?.primary?.main])

  const [shareLoader, setShareLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);

  // @ts-ignore
  const downloadChat = async (type: string) => {
    // perform your download chat logic here
  };

  const downloadShareHandler = async (type: string) => {
    try {
      if (type === 'download') {
        setDownloadLoader(true);
      } else {
        setShareLoader(true);
      }

      if (type === 'download') {
        setDownloadLoader(false);

        setTimeout(() => {
          toast.success("Downloading...");
        }, 2000)
        

      } else if (type === 'share') {
        
          setShareLoader(false);
          setTimeout(() => {
            toast.success("Share successful")
          }, 2000)

        } else {
          toast.error("Your system doesn't support sharing this file.");
          setDownloadLoader(false);
          setShareLoader(false);
        }
    } catch (error: any) {
      setDownloadLoader(false);
      setShareLoader(false);
      
      toast.error("Error while performing")
      
    }
  };


  return (
    <>
      {(config?.component?.allowDownloadChat || config?.component?.allowShareChat) && (
        <div
          style={{
            // position: 'absolute',
            position: 'relative', // just to show them on website, ideally should keep absolute to stick them to right side
            right: 0,
            top: '40%',
            background: 'white',
            padding: '5px',
            borderRadius: '5px 0 0 5px',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
          }}>
          {config?.component?.allowShareChat && (
            <div
              onClick={() => downloadShareHandler('share')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}>

              {shareLoader ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '24px',
                    height: '24px',
                  }}>
                  <CircularProgress size="20px" />
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ShareIcon sx={{ color: primaryColor }} />
                </div>
              )}
              <p
                style={{
                  fontSize: '10px',
                  margin: 0,
                  color: theme?.primary?.dark,
                  fontFamily: 'Mulish-bold',
                }}>
                  Share
              </p>
            </div>
          )}
          {/* Only render divider when both share and download allowed */}
          {config?.component?.allowDownloadChat && config?.component?.allowShareChat && <Divider />}
          {config?.component?.allowDownloadChat && (
            <div
              onClick={() => downloadShareHandler('download')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
              {/* Download */}
              {downloadLoader ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '24px',
                    height: '24px',
                  }}>
                  <CircularProgress size="20px" />
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FileDownloadOutlinedIcon sx={{ color: primaryColor }} />
                </div>
              )}
              <p
                style={{
                  fontSize: '10px',
                  margin: 0,
                  color: theme?.primary?.dark,
                  fontFamily: 'Mulish-bold',
                }}>
                  Download
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShareButtons;