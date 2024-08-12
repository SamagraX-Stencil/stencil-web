import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { NextPage } from 'next';
import { AppContext } from '../../context';
import SendButton from './assets/sendButton';
import { useLocalization } from '../../hooks';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import RenderVoiceRecorder from '../../components/recorder-modal/RenderVoiceRecorder';
import { useConfig } from '../../hooks/useConfig';
import DowntimePage from '../downtime-page';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { recordUserLocation } from '../../utils/location';
import FAQ from '../../components/chat-faq';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import styles from './index.module.css';
import CircularProgress from '@mui/material/CircularProgress';
// import TransliterationInput from '../../components/transliteration-input';
import { TransliterationInput } from '@samagra-x/stencil-molecules/lib/transliteration-input';

const ChatPage: NextPage = () => {
  const context = useContext(AppContext);
  const botConfig = useConfig('component', 'chatUI');
  const config = useConfig('component', 'homePage');
  const { micWidth, micHeight } = config;
  const t = useLocalization();
  const placeholder = t('message.ask_ur_question');
  const [inputMsg, setInputMsg] = useState('');
  const theme = useColorPalates();
  const secondaryColor = theme?.primary?.main;
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const voiceRecorderRef = useRef<{ stopRecording: () => void } | null>(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    // Stop recording when modal is closed
    if (voiceRecorderRef.current && voiceRecorderRef.current.stopRecording) {
      voiceRecorderRef.current.stopRecording();
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMsg(question);
  };

  useEffect(() => {
    context?.fetchIsDown(); // check if server is down

    if (!sessionStorage.getItem('conversationId')) {
      const newConversationId = uuidv4();
      sessionStorage.setItem('conversationId', newConversationId);
      context?.setConversationId(newConversationId);
    }
    recordUserLocation();

    const searchParams = new URLSearchParams(window.location.search);
    const voice = searchParams.get('voice');

    if (voice === 'true') {
      handleOpenModal();
      // Remove the 'voice' query parameter from the URL
      searchParams.delete('voice');
      router.replace({
        pathname: '/newchat',
        search: searchParams.toString(),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(
    async (msg: string) => {
      if (msg.length === 0) {
        toast.error(t('error.empty_msg'));
        return;
      }
      if (context?.newSocket?.socket?.connected) {
        context?.setMessages([]);
        router.push('/chat');
        context?.sendMessage(msg, msg);
      } else {
        toast.error(t('error.disconnected'));
      }
    },
    [context, t, router]
  );

  if (context?.isDown) {
    return <DowntimePage />;
  } else {
    return (
      <div className={styles.main} style={{ color: secondaryColor }}>
        {config?.showMic && (
          <div className={styles.voiceRecorder} style={{ height: micHeight, width: micWidth }}>
            <IconButton onClick={handleOpenModal}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: micWidth,
                  height: micHeight,
                  bgcolor: theme?.primary?.light,
                  borderRadius: '50%',
                }}
              >
                <MicIcon style={{ color: 'white', fontSize: 100 }} />
              </Box>
            </IconButton>
          </div>
        )}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="voice-recorder-modal"
          aria-describedby="voice-recorder"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: theme?.primary?.light,
              boxShadow: 24,
              p: 4,
              outline: 'none',
              color: 'white',
              width: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {t(`label.help_text`)}
            </Typography>
            {isLoading ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : (
              <RenderVoiceRecorder
                ref={voiceRecorderRef}
                setInputMsg={(msg: string) => {
                  setInputMsg(msg);
                  handleCloseModal();
                }}
                tapToSpeak={config?.showTapToSpeakText}
                onCloseModal={handleCloseModal}
                onProcessingStart={() => setIsLoading(true)}
                onProcessingEnd={() => setIsLoading(false)}
              />
            )}
          </Box>
        </Modal>

        <div className="faq-section">
          <FAQ onQuestionClick={handleQuestionClick} />
        </div>

        <form onSubmit={(event) => event?.preventDefault()}>
          <div className={`${`${styles.inputBox} ${styles.inputBoxOpen}`}`}>
            <TransliterationInput
              data-testid="homepage-input-field"
              config={botConfig}
              style={{ fontFamily: 'NotoSans-Regular' }}
              rows={1}
              value={inputMsg}
              setValue={setInputMsg}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage(inputMsg);
                }
              }}
              multiline={false}
              placeholder={!context?.kaliaClicked ? placeholder : t('label.enter_aadhaar_number')}
            />
            <button
              data-testid="homepage-send-button"
              type="submit"
              className={styles.sendButton}
              onClick={() => sendMessage(inputMsg)}
              title="Send Message"
            >
              <SendButton width={40} height={40} color={theme?.primary?.light} />
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default ChatPage;
