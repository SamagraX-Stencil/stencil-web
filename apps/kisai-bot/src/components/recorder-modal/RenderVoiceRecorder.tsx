import React, { useState, useContext, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useLocalization } from '../../hooks';
import { useConfig } from '../../hooks/useConfig';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type RenderVoiceRecorderProps = {
  setInputMsg: (msg: string) => void;
  tapToSpeak: boolean;
  onCloseModal: () => void;
  onProcessingStart: () => void;
  onProcessingEnd: () => void;
};

type RenderVoiceRecorderRef = {
  stopRecording: () => void;
};

const RenderVoiceRecorder: React.ForwardRefRenderFunction<
  RenderVoiceRecorderRef,
  RenderVoiceRecorderProps
> = ({ setInputMsg, tapToSpeak, onCloseModal, onProcessingStart, onProcessingEnd }, ref) => {
  const t = useLocalization();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recorderStatus, setRecorderStatus] = useState('idle');
  const [isErrorClicked, setIsErrorClicked] = useState(false);
  const config = useConfig('component', 'voiceRecorder');
  const context = useContext(AppContext);

  const VOICE_MIN_DECIBELS = -35;
  const DELAY_BETWEEN_DIALOGS = config?.delayBetweenDialogs || 2500;
  const DIALOG_MAX_LENGTH = 60 * 1000;
  let IS_RECORDING = false;

  useEffect(() => {
    startRecording();
    // Cleanup on component unmount
    return () => stopRecording();
  }, []);

  useImperativeHandle(ref, () => ({
    stopRecording: () => {
      stopRecording();
    },
  }));

  const startRecording = async () => {
    IS_RECORDING = true;
    record();
  };

  const stopRecording = () => {
    IS_RECORDING = false;
    if (mediaRecorder !== null) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setMediaRecorder(null);
    }
  };

  function record() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setMediaRecorder(recorder);

      const audioChunks: Blob[] = [];
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
      let startTime = time.getTime(),
        lastDetectedTime = time.getTime();
      let anySoundDetected = false;
      const detectSound = () => {
        if (!IS_RECORDING) return;

        time = new Date();
        let currentTime = time.getTime();

        if (currentTime > startTime + DIALOG_MAX_LENGTH) {
          recorder.stop();
          return;
        }

        if (anySoundDetected === true && currentTime > lastDetectedTime + DELAY_BETWEEN_DIALOGS) {
          recorder.stop();
          return;
        }

        analyser.getByteFrequencyData(domainData);
        for (let i = 0; i < bufferLength; i++)
          if (domainData[i] > 0) {
            anySoundDetected = true;
            time = new Date();
            lastDetectedTime = time.getTime();
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
    });
  }

  const makeComputeAPICall = async (blob: Blob) => {
    const startTime = Date.now();
    const s2tMsgId = uuidv4();
    console.log('s2tMsgId:', s2tMsgId);
    try {
      onProcessingStart();
      setRecorderStatus('processing');
      console.log('base', blob);
      toast.success(t('message.recorder_wait'));

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
        console.log('hi', rsp_data);
        if (rsp_data.text === '') throw new Error('Unexpected end of JSON input');
        setInputMsg(rsp_data.text);
        const endTime = Date.now();
        const latency = endTime - startTime;
      } else {
        toast.error(t('message.recorder_error'));
        console.log(resp);
        setIsErrorClicked(false);
        setTimeout(() => {
          if (!isErrorClicked) {
            setRecorderStatus('idle');
          }
        }, 2500);
      }
      onProcessingEnd();
      setRecorderStatus('idle');
    } catch (error) {
      console.error(error);
      onProcessingEnd();
      setRecorderStatus('error');
      toast.error(t('message.recorder_error'));
      setIsErrorClicked(false);
      const endTime = Date.now();
      const latency = endTime - startTime;

      setTimeout(() => {
        if (!isErrorClicked) {
          setRecorderStatus('idle');
        }
      }, 2500);
    }
    context?.sets2tMsgId((prev: any) => s2tMsgId);
  };

  if (config?.showVoiceRecorder === false) {
    return null;
  }

  return (
    <>
      {mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder}
          width={250}
          height={150}
          gap={2}
          barWidth={6}
          barColor="white"
        />
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: 'white', color: '#115223' }}
          onClick={stopRecording}
          endIcon={<ArrowForwardIcon />}
        >
          {t('label.ask')}
        </Button>
      </div>
    </>
  );
};

export default forwardRef(RenderVoiceRecorder);
