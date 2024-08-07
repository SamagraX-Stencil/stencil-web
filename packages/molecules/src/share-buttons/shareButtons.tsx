// @ts-ignore
import React from 'react';
import { FileDownloadOutlined, Share } from '@mui/icons-material';
import { CircularProgress, Divider } from '@mui/material';

type ShareButtonProps = {
  allowDownloadChat?: boolean;
  handleButton: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => void;
  allowShareChat?: boolean;
  shareLoader?: boolean;
  downloadLoader?: boolean;
  style?: {
    container?: object;
    button?: object;
    icon?: object;
    text?: object;
    divider?: object;
  };
};

const NewShareButtons: React.FC<ShareButtonProps> = ({
  allowDownloadChat = false,
  handleButton,
  allowShareChat = false,
  shareLoader,
  downloadLoader,
  style = {},
}) => {
  return (
    <>
      {(allowDownloadChat || allowShareChat) && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '15%',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '5px',
            borderRadius: '5px 0 0 5px',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            ...style.container,
          }}
        >
          {allowShareChat && (
            <div
              onClick={(e) => handleButton(e, 'share')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                ...style.button,
              }}
            >
              {shareLoader ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <CircularProgress size="20px" />
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...style.icon,
                  }}
                >
                  <Share />
                </div>
              )}
              <p
                style={{
                  fontSize: '10px',
                  margin: 0,
                  fontFamily: 'Mulish-bold',
                  ...style.text,
                }}
              >
                Share
              </p>
            </div>
          )}
          {/* Only render divider when both share and download allowed */}
          {allowDownloadChat && allowShareChat && <Divider style={style.divider} />}
          {allowDownloadChat && (
            <div
              onClick={(e) => handleButton(e, 'download')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                ...style.button,
              }}
            >
              {/* Download */}
              {downloadLoader ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <CircularProgress size="20px" />
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...style.icon,
                  }}
                >
                  <FileDownloadOutlined />
                </div>
              )}
              <p
                style={{
                  fontSize: '10px',
                  margin: 0,
                  fontFamily: 'Mulish-bold',
                  ...style.text,
                }}
              >
                Download
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NewShareButtons;
