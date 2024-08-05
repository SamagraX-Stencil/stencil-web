import * as React from 'react';
import styles from './index.module.css';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, List, Typography } from '@mui/material';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useLocalization } from '../../hooks';
import axios from 'axios';
import { useConfig } from '../../hooks/useConfig';
import { useState } from 'react';
import toast from 'react-hot-toast';

const WeatherAdvisoryPopup = (props: any) => {
  const t = useLocalization();
  const config = useConfig('component', 'botDetails');
  const [open, setOpen] = React.useState(true);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseAudio = async () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    } else {
      const url = await fetchAudio(props?.advisory?.descriptor?.long_desc);
      if (url) {
        const audio = new Audio(url);
        audio.playbackRate = config?.component?.botDetails?.audioPlayback || 1.5;

        audio.addEventListener('ended', () => {
          setAudioElement(null);
          setIsPlaying(false);
        });

        audio
          .play()
          .then(() => {
            console.log('Audio played:', url);
            setAudioElement(audio);
            setIsPlaying(true);
          })
          .catch((error) => {
            setAudioElement(null);
            setIsPlaying(false);
            toast.error(t('message.no_link'));
            console.error('Error playing audio:', error);
          });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    props?.setShowWeatherAdvisoryPopup(false);
    audioElement && audioElement.pause();
  };

  const fetchAudio = async (text: string) => {
    const toastId = toast.loading(`${t('message.download_audio')}`);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_TOOLS_API}/text-to-speech`,
        {
          text: text,
          language: localStorage.getItem('locale'),
          disableTelemetry: true,
        },
        {
          headers: {
            botId: process.env.NEXT_PUBLIC_BOT_ID || '',
            orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
            userId: localStorage.getItem('userID') || '',
          },
        }
      );
      toast.dismiss(toastId);
      return response?.data?.url;
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(t('message.no_link'));
      console.error('Error fetching audio:', error);
      return null;
    }
  };

  const theme = useColorPalates();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            timeout: 300,
          },
        }}
      >
        <Fade in={open}>
          <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p
                style={{
                  display: 'inline-block',
                  color: '#023035',
                  fontWeight: 600,
                  fontSize: '20px',
                }}
              >
                {t('label.crop_advisory')} - {props?.advisory?.descriptor?.name}
              </p>
              <CloseRoundedIcon onClick={handleClose} />
            </div>
            <div
              style={{
                marginTop: '4px',
                height: '1px',
                borderColor: 'black',
                backgroundColor: '#B4B9C5',
              }}
            ></div>
            <div
              className="p-3"
              style={{
                maxHeight: '400px',
                overflow: 'auto',
                paddingRight: '10px',
              }}
            >
              <List>
                <Typography
                  color="black"
                  style={{
                    wordBreak: 'break-word',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `&#x2022; ${props?.advisory?.descriptor?.long_desc?.replaceAll('\n', '<br/><br/>&#x2022; ')}`,
                    }}
                  />
                </Typography>
                {/* {weatherDetails.map((item) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      textAlign: 'start',
                    }}>
                    <span
                      style={{
                        marginRight: '8px',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}>{`${item.id}.`}</span>
                    <Typography
                      color="black"
                      style={{
                        wordBreak: 'break-word',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}>
                      {item.label}
                    </Typography>
                  </div>
                ))} */}
              </List>
              <p
                style={{
                  color: theme.primary.main,
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  className="rounded-circle"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '4px',
                  }}
                >
                  <CheckCircleRoundedIcon color="success" style={{ fontSize: '16px' }} />
                </span>
                {t('label.verified_advisory')}
              </p>
              <Button
                onClick={playPauseAudio}
                fullWidth
                variant="contained"
                style={{
                  marginTop: '30px',
                  backgroundColor: `${theme.primary.main}`,
                  color: theme.primary.contrastText,
                  padding: '8px 0',
                  textTransform: 'none',
                }}
                startIcon={<VolumeUpIcon />}
              >
                {t('label.play_advisory')}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default WeatherAdvisoryPopup;
