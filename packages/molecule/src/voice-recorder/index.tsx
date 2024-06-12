import { useState } from 'react';
import styles from './styles.module.css';
import toast from 'react-hot-toast';

import { useUiConfig } from '@samagra-x/hooks';
import RecorderControl from './record-controller';

interface VoiceRecorder {
  setInputMsg: (msg: string) => void;
  tapToSpeak: boolean;
  includeDiv?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorder> = ({
  setInputMsg,
  tapToSpeak,
  includeDiv = false,
}) => {
  const config = useUiConfig('component', 'voiceRecorder');

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isErrorClicked, setIsErrorClicked] = useState(false);
  const [recorderStatus, setRecorderStatus] = useState('idle');

  const voiceMinDecibels: number = config.voiceMinDecibels;
  const delayBetweenDialogs: number = config.delayBetweenDialogs;
  const dialogMaxLength: number = config.dialogMaxLength;
  const [isRecording, setIsRecording] = useState(config.isRecording);

  const startRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      record();
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      if (mediaRecorder !== null) {
        mediaRecorder.stop();
        setIsRecording(false);
        setMediaRecorder(null);
      }
    }
  };

  function record() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      //start recording:
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setMediaRecorder(recorder);

      //save audio chunks:
      const audioChunks: BlobPart[] = [];
      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      //analysis:
      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = voiceMinDecibels;
      audioStreamSource.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      //loop:
      let time: Date = new Date();
      let startTime: number;
      let lastDetectedTime: number = time.getTime();
      let anySoundDetected: boolean = false;
      const detectSound = () => {
        //recording stopped by user:
        if (!isRecording) return;

        time = new Date();
        const currentTime = time.getTime();

        //time out:
        if (currentTime > startTime + dialogMaxLength) {
          recorder.stop();
          return;
        }

        //a dialog detected:
        if (anySoundDetected === true && currentTime > lastDetectedTime + delayBetweenDialogs) {
          recorder.stop();
          return;
        }

        //check for detection:
        analyser.getByteFrequencyData(domainData);
        for (let i = 0; i < bufferLength; i++)
          if (domainData[i] > 0) {
            anySoundDetected = true;
            time = new Date();
            lastDetectedTime = time.getTime();
          }

        //continue the loop:
        window?.requestAnimationFrame(detectSound);
      };
      window?.requestAnimationFrame(detectSound);

      //stop event:
      recorder.addEventListener('stop', () => {
        //stop all the tracks:
        stream.getTracks().forEach((track) => track.stop());
        if (!anySoundDetected) return;

        //send to server:
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        makeComputeAPICall(audioBlob);
      });
    });
  }
  const makeComputeAPICall = async (blob: Blob) => {
    try {
      setRecorderStatus('processing');
      toast.success(`${config.waitMessage}`);
      // Define the API endpoint and make api call here
      if (blob) {
        //set api result in setInputMsg
        setInputMsg('');
      }
    } catch (error) {
      console.error(error);
      setRecorderStatus('error');
      toast.error(`${config.recorderErrorMessage}`);
      // Set isErrorClicked to true when an error occurs
      setIsErrorClicked(false);
      setTimeout(() => {
        // Check if the user has not clicked the error icon again
        if (!isErrorClicked) {
          setRecorderStatus('idle');
        }
      }, 2500);
    }
  };

  return (
    <div>
      <div>
        {mediaRecorder && mediaRecorder.state === 'recording' ? (
          <div className={styles.center}>
            <RecorderControl status={'recording'} onClick={stopRecording} includeDiv={includeDiv} />
          </div>
        ) : (
          <div className={styles.center}>
            {recorderStatus === 'processing' ? (
              <div>
                <RecorderControl status={'processing'} onClick={() => {}} />
              </div>
            ) : recorderStatus === 'error' ? (
              <div>
                <RecorderControl
                  status={'error'}
                  onClick={() => {
                    setIsErrorClicked(true);
                    startRecording();
                  }}
                  includeDiv={includeDiv}
                />
              </div>
            ) : (
              <div>
                <RecorderControl
                  status={'start'}
                  onClick={() => {
                    setIsErrorClicked(true);
                    startRecording();
                  }}
                  includeDiv={includeDiv}
                  tapToSpeak={tapToSpeak}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
