import { useState, useContext } from 'react';
import VoiceRecorder from '@samagra-x/stencil-molecules/lib/voice-recorder';
import { useLocalization } from '../../hooks';
import { AppContext } from '../../context';
import saveTelemetryEvent from '../../utils/telemetry';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const RenderVoiceRecorder = ({ setInputMsg, tapToSpeak, showVoiceRecorder }) => {
  const t = useLocalization();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isErrorClicked, setIsErrorClicked] = useState(false);
  const [recorderStatus, setRecorderStatus] = useState('idle');
  const [isRecording, setIsRecording] = useState(false);
  const context = useContext(AppContext);

  const VOICE_MIN_DECIBELS = -35;
  const DELAY_BETWEEN_DIALOGS = 2500;
  const DIALOG_MAX_LENGTH = 60 * 1000;
  const WAIT_MESSAGE = t('message.recorder_wait');
  const RECORDER_ERROR_MESSAGE = t('message.recorder_error');

  const startRecording = async () => {
    try {
      saveTelemetryEvent('0.1', 'E044', 'micAction', 'micTap', {
        botId: process.env.NEXT_PUBLIC_BOT_ID || '',
        orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
        userId: localStorage.getItem('userID') || '',
        phoneNumber: localStorage.getItem('phoneNumber') || '',
        conversationId: sessionStorage.getItem('conversationId') || '',
      });
      setIsRecording(true);
      await record();
    } catch (error) {
      handleError(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder !== null) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const record = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();

      const audioChunks = [];
      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = VOICE_MIN_DECIBELS;
      audioStreamSource.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      let time = new Date();
      let startTime = time.getTime();
      let lastDetectedTime = time.getTime();
      let anySoundDetected = false;

      const detectSound = () => {
        if (!isRecording) return;

        time = new Date();
        const currentTime = time.getTime();

        if (currentTime > startTime + DIALOG_MAX_LENGTH) {
          recorder.stop();
          return;
        }

        if (anySoundDetected === true && currentTime > lastDetectedTime + DELAY_BETWEEN_DIALOGS) {
          recorder.stop();
          return;
        }

        analyser.getByteFrequencyData(domainData);
        for (let i = 0; i < bufferLength; i++) {
          if (domainData[i] > 0) {
            anySoundDetected = true;
            time = new Date();
            lastDetectedTime = time.getTime();
          }
        }

        window.requestAnimationFrame(detectSound);
      };
      window.requestAnimationFrame(detectSound);

      recorder.addEventListener('stop', () => {
        stream.getTracks().forEach((track) => track.stop());
        if (!anySoundDetected) return;

        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        makeComputeAPICall(audioBlob);
      });
    } catch (error) {
      handleError(error);
    }
  };

  const makeComputeAPICall = async (blob) => {
    const startTime = Date.now();
    const s2tMsgId = uuidv4();
    try {
      setRecorderStatus('processing');
      toast.success(WAIT_MESSAGE);

      const apiEndpoint = process.env.NEXT_PUBLIC_AI_TOOLS_API + '/speech-to-text';
      const formData = new FormData();
      formData.append('file', blob, 'audio.wav');
      formData.append('messageId', s2tMsgId);
      formData.append('conversationId', sessionStorage.getItem('conversationId') || '');
      formData.append('language', localStorage.getItem('locale') || 'en');

      const resp = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
        },
        body: formData,
      });

      if (resp.ok) {
        const rsp_data = await resp.json();
        if (rsp_data.text === '') throw new Error('Unexpected end of JSON input');
        setInputMsg(rsp_data.text);
        const endTime = Date.now();
        const latency = endTime - startTime;
        await saveTelemetryEvent('0.1', 'E046', 'aiToolProxyToolLatency', 's2tLatency', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: sessionStorage.getItem('conversationId') || '',
          timeTaken: latency,
          messageId: s2tMsgId,
          createdAt: Math.floor(startTime / 1000),
        });
      } else {
        handleError(new Error(t('message.recorder_error')));
      }
    } catch (error) {
      handleError(error);
    }
    context?.sets2tMsgId((prev) => (prev = s2tMsgId));
  };

  const handleError = async (error) => {
    console.error(error);
    setRecorderStatus('error');
    toast.error(RECORDER_ERROR_MESSAGE);
    setIsErrorClicked(false);
    const endTime = Date.now();
    const latency = endTime - startTime;
    await saveTelemetryEvent('0.1', 'E046', 'aiToolProxyToolLatency', 's2tLatency', {
      botId: process.env.NEXT_PUBLIC_BOT_ID || '',
      orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
      userId: localStorage.getItem('userID') || '',
      phoneNumber: localStorage.getItem('phoneNumber') || '',
      conversationId: sessionStorage.getItem('conversationId') || '',
      timeTaken: latency,
      messageId: s2tMsgId,
      createdAt: Math.floor(startTime / 1000),
      error: error?.message || t('message.recorder_error'),
    });

    setTimeout(() => {
      if (!isErrorClicked) {
        setRecorderStatus('idle');
      }
    }, 2500);
  };

  

  if (!showVoiceRecorder === false) return null;
 

  return (
   
   
    <VoiceRecorder 
      setInputMsg={setInputMsg}
      tapToSpeak={tapToSpeak}
      showVoiceRecorder={showVoiceRecorder}
      delayBetweenDialogs={DELAY_BETWEEN_DIALOGS}
      voiceMinDecibels={VOICE_MIN_DECIBELS}
      dialogMaxLength={DIALOG_MAX_LENGTH}
      isRecording={isRecording}
      waitMessage={WAIT_MESSAGE}
      recorderErrorMessage={RECORDER_ERROR_MESSAGE}
      handleVoiceRecorder={startRecording}
    />
  );
};

export default RenderVoiceRecorder;
