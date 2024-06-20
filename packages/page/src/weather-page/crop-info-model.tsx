import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import speaker from './assets/speaker.svg';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, Typography } from '@mui/material';
import { useUiConfig, useColorPalates } from '@samagra-x/stencil-hooks';
import facebookIcon from './assets/facebook.png';
import whatsappIcon from './assets/whatsapp.png';
import telegramIcon from './assets/telegram.png';
import socialSharingIcon from './assets/sharingIcon.png';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '500px',
  backgroundColor: '#fff',
  padding: '20px',
  border: 'none',
  borderRadius: '5px',
};
const canShare = navigator.share !== undefined;

const shareData = async (data: { title: string; text: string; url: string }) => {
  if (canShare) {
    await navigator.share(data);
  } else {
    toast.error('Sharing is not supported in this browser.');
  }
};

const handleShare = () => {
  shareData({
    title: 'My App',
    text: 'Check out my awesome PWA!',
    url: 'www.facebook.com',
  });
};
const CropInfoModel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const weatherDetails = [
    {
      id: 1,
      label: 'आज गेहूं में कीटनाशक डालने का सबसे अच्छा दिन है |',
    },
    {
      id: 2,
      label: 'आज कम बारिश है तो गेहूं की सिंचाई मत करो |',
    },
  ];

  const sharingIcon = [
    {
      id: 1,
      image: facebookIcon,
    },
    {
      id: 2,
      image: whatsappIcon,
    },
    {
      id: 3,
      image: telegramIcon,
    },
    {
      id: 4,
      image: socialSharingIcon,
    },
  ];

  const synth = React.useRef<SpeechSynthesis | null>(null);

  React.useEffect(() => {
    synth.current = window.speechSynthesis;
  }, []);
  const speakText = (text: string) => {
    if (synth.current && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.current.speak(utterance);
    }
  };

  const theme = useColorPalates();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <div style={style}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p
                style={{
                  display: 'inline-block',
                  color: '#023035',
                  fontWeight: 600,
                  fontSize: '20px',
                }}
              >
                फ़सल सलाह - गेहूँ
              </p>
              <CloseRoundedIcon onClick={onClose} />
            </div>
            <div
              style={{
                marginTop: '4px',
                height: '1px',
                borderColor: 'black',
                backgroundColor: '#B4B9C5',
              }}
            ></div>{' '}
            <div className="text-center p-3">
              <div
                style={{
                  margin: '16px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'flex-start',
                  textAlign: 'start',
                }}
              >
                {weatherDetails.map((item, index) => (
                  // <div key={index}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }} key={item.id}>
                    <span
                      style={{
                        marginRight: '8px',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >{`${index}.`}</span>
                    <Typography
                      color="black"
                      style={{
                        wordBreak: 'break-word',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </div>

                  // </div>
                ))}
              </div>
              {/* <List dense>
                {weatherDetails.map((item) => (
                  <ListItem>
                    <ListItemText
                      sx={{
                        color: '#000000',
                        lineHeight: '13px',
                        fontWeight: '400',
                        fontSize: '13px',
                      }}
                      primary={`${item?.id}. ${item.label}`}
                    />
                  </ListItem>
                ))}
              </List> */}
              <p
                style={{
                  color: theme.primary.dark,
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <span
                  className="rounded-circle "
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '4px',
                  }}
                >
                  <CheckCircleRoundedIcon color="success" style={{ fontSize: '14px' }} />
                </span>
                वेरिफ़िएड बय ओडिशा कृषि एवं प्रौद्योगिकी विश्वविद्यालय
              </p>
              <Button
                fullWidth
                variant="outlined"
                style={{
                  color: theme?.primary?.dark,

                  marginTop: '30px',
                  height: '60px',
                  border: '1px solid var(--Mid-Gray-50, #F6F7F9)',
                  background: 'var(--Mid-Gray-100, #EDEDF1)',
                  fontSize: '17px',
                  fontWeight: 600,
                }}
                onClick={() =>
                  speakText(
                    'आज गेहूं में कीटनाशक डालने का सबसे अच्छा दिन है  आज कम बारिश है तो गेहूं की सिंचाई मत करो|',
                  )
                }
              >
                <img src={speaker.src} alt="" style={{ marginRight: '10px' }} />
                सुनने के लिए यहां क्लिक करें
              </Button>

              <p style={{ margin: '8px 0' }}>साथी किसानों के साथ साझा करें</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '12px',
                }}
              >
                {sharingIcon.map((element) => (
                  <img
                    src={element.image.src}
                    key={element.id}
                    onClick={handleShare}
                    height="32px"
                    width="32px"
                  />
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CropInfoModel;
