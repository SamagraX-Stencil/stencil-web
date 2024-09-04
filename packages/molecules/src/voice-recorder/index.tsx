import React, { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';
import RecorderControl from './record-controller';

interface VoiceRecorderProps {
  setInputMsg: (msg: string) => void;
  tapToSpeak: boolean;
  includeDiv?: boolean;
  showVoiceRecorder?: boolean;
  delayBetweenDialogs?: number;
  handleVoiceRecorder?: () => void;
  customStyles?: {
    centerStyles?: CSSProperties;
  };
  voiceMinDecibels: number;
  dialogMaxLength: number;
  isRecording: boolean;
  waitMessage: string;
  recorderErrorMessage: string;
}

const defaultCenterStyles: CSSProperties = {
  display: 'block',
  height: '100%',
  width: '100%',
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  setInputMsg,
  tapToSpeak,
  includeDiv = false,
  showVoiceRecorder = true,
  delayBetweenDialogs = 1000,
  handleVoiceRecorder,
  customStyles = {},
  voiceMinDecibels,
  dialogMaxLength,
  isRecording: initialIsRecording,
  waitMessage,
  recorderErrorMessage,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isErrorClicked, setIsErrorClicked] = useState(false);
  const [recorderStatus, setRecorderStatus] = useState('idle');
  const [isRecording, setIsRecording] = useState(initialIsRecording);

  useEffect(() => {
    if (!showVoiceRecorder) return;

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, showVoiceRecorder]);

  const startRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      record();
      if (handleVoiceRecorder) handleVoiceRecorder();
    }
  };

  const stopRecording = () => {
    if (isRecording && mediaRecorder !== null) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const record = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setMediaRecorder(recorder);

      const audioChunks: BlobPart[] = [];
      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = voiceMinDecibels;
      audioStreamSource.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      let startTime = Date.now();
      let lastDetectedTime = startTime;
      let anySoundDetected = false;

      const detectSound = () => {
        if (!isRecording) return;

        const currentTime = Date.now();

        if (currentTime > startTime + dialogMaxLength) {
          recorder.stop();
          return;
        }

        if (anySoundDetected && currentTime > lastDetectedTime + delayBetweenDialogs) {
          recorder.stop();
          return;
        }

        analyser.getByteFrequencyData(domainData);
        for (let i = 0; i < bufferLength; i++) {
          if (domainData[i] > 0) {
            anySoundDetected = true;
            lastDetectedTime = Date.now();
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
    });
  };

  const makeComputeAPICall = async (blob: Blob) => {
    try {
      setRecorderStatus('processing');
      toast.success(waitMessage);

      // Call your API with the audio blob here
      // await someApiCall(blob);

      // Simulate API call success
      setTimeout(() => {
        setInputMsg('Transcription result'); // Replace with actual API response
        setRecorderStatus('idle');
      }, 2000);
    } catch (error) {
      console.error(error);
      setRecorderStatus('error');
      toast.error(recorderErrorMessage);
      setIsErrorClicked(false);
      setTimeout(() => {
        if (!isErrorClicked) {
          setRecorderStatus('idle');
        }
      }, 2500);
    }
  };

  if (!showVoiceRecorder) return null;

  return (
    <div>
      <Box style={customStyles.centerStyles || defaultCenterStyles}>
        {mediaRecorder && mediaRecorder.state === 'recording' ? (
          <RecorderControl
            status="recording"
            onClick={stopRecording}
            includeDiv={includeDiv}
            primaryColor={''}
            primaryDarkColor={''}
          />
        ) : (
          <Box style={defaultCenterStyles}>
            {recorderStatus === 'processing' ? (
              <RecorderControl
                status="processing"
                onClick={() => {}}
                primaryColor={''}
                primaryDarkColor={''}
              />
            ) : recorderStatus === 'error' ? (
              <RecorderControl
                status="error"
                onClick={() => {
                  setIsErrorClicked(true);
                  startRecording();
                }}
                includeDiv={includeDiv}
                primaryColor={''}
                primaryDarkColor={''}
              />
            ) : (
              <RecorderControl
                status="start"
                onClick={() => {
                  setIsErrorClicked(true);
                  startRecording();
                }}
                includeDiv={includeDiv}
                tapToSpeak={tapToSpeak}
                primaryColor={''}
                primaryDarkColor={''}
              />
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default VoiceRecorder;
