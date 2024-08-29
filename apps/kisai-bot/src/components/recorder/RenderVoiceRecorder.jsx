import { useState, useContext } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import styles from './styles.module.css';
import toast from 'react-hot-toast';
import { useLocalization } from '../../hooks';
import { useConfig } from '../../hooks/useConfig';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import { useColorPalates } from '../../providers/theme-provider/hooks';

const RenderVoiceRecorder = ({ setInputMsg, tapToSpeak }) => {
  const t = useLocalization();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recorderStatus, setRecorderStatus] = useState('idle');
  const [isErrorClicked, setIsErrorClicked] = useState(false);
  const config = useConfig('component', 'voiceRecorder');
  const context = useContext(AppContext);

  let VOICE_MIN_DECIBELS = -35;
  let DELAY_BETWEEN_DIALOGS = config?.delayBetweenDialogs || 2500;
  let DIALOG_MAX_LENGTH = 60 * 1000;
  let IS_RECORDING = false;

  const startRecording = async () => {
    IS_RECORDING = true;
    record();
  };

  const stopRecording = () => {
    IS_RECORDING = false;
    if (mediaRecorder !== null) {
      mediaRecorder.stop();
      setMediaRecorder(null); // Set mediaRecorder state to null after stopping
    }
  };

  //record:
  function record() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      //start recording:
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setMediaRecorder(recorder);

      //save audio chunks:
      const audioChunks = [];
      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      //analisys:
      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = VOICE_MIN_DECIBELS;
      audioStreamSource.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      //loop:
      let time = new Date();
      let startTime,
        lastDetectedTime = time.getTime();
      let anySoundDetected = false;
      const detectSound = () => {
        //recording stoped by user:
        if (!IS_RECORDING) return;

        time = new Date();
        let currentTime = time.getTime();

        //time out:
        if (currentTime > startTime + DIALOG_MAX_LENGTH) {
          recorder.stop();
          return;
        }

        //a dialog detected:
        if (anySoundDetected === true && currentTime > lastDetectedTime + DELAY_BETWEEN_DIALOGS) {
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
        window.requestAnimationFrame(detectSound);
      };
      window.requestAnimationFrame(detectSound);

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

  const makeComputeAPICall = async (blob) => {
    toast.success('speech to text called');
    // const startTime = Date.now();
    // const s2tMsgId = uuidv4();
    // console.log('s2tMsgId:', s2tMsgId);
    // try {
    //   setRecorderStatus('processing');
    //   console.log('base', blob);
    //   toast.success(`${t('message.recorder_wait')}`);

    //   // const audioElement = new Audio();

    //   // const blobUrl = URL.createObjectURL(blob);
    //   // audioElement.src = blobUrl;
    //   // console.log(audioElement)
    //   // audioElement.play();

    //   // Define the API endpoint
    //   const apiEndpoint = process.env.NEXT_PUBLIC_AI_TOOLS_API + '/speech-to-text';

    //   // Create a FormData object
    //   const formData = new FormData();

    //   // Append the WAV file to the FormData object
    //   formData.append('file', blob, 'audio.wav');
    //   formData.append('messageId', s2tMsgId);
    //   formData.append('conversationId', sessionStorage.getItem('conversationId') || '');
    //   formData.append('language', localStorage.getItem('locale') || 'en');

    //   // Send the WAV data to the API
    //   const resp = await fetch(apiEndpoint, {
    //     method: 'POST',
    //     headers: {
    //       botId: '74b41966-c74a-43e7-ba43-07f038893cb4' || '',
    //       orgId: 'f2070b8a-0491-45cb-9f35-8599d6dd77ef' || '',
    //       userId: localStorage.getItem('userID') || '',
    //     },
    //     body: formData,
    //   });

    //   if (resp.ok) {
    //     const rsp_data = await resp.json();
    //     console.log('hi', rsp_data);
    //     if (rsp_data.text === '') throw new Error('Unexpected end of JSON input');
    //     setInputMsg(rsp_data.text);
    //     const endTime = Date.now();
    //     const latency = endTime - startTime;
    //   } else {
    //     toast.error(`${t('message.recorder_error')}`);
    //     console.log(resp);
    //     // Set isErrorClicked to true when an error occurs
    //     setIsErrorClicked(false);

    //     // Automatically change back to startIcon after 3 seconds
    //     setTimeout(() => {
    //       // Check if the user has not clicked the error icon again
    //       if (!isErrorClicked) {
    //         setRecorderStatus('idle');
    //       }
    //     }, 2500);
    //   }
    //   setRecorderStatus('idle');
    // } catch (error) {
    //   console.error(error);
    //   setRecorderStatus('error');
    //   toast.error(`${t('message.recorder_error')}`);
    //   // Set isErrorClicked to true when an error occurs
    //   setIsErrorClicked(false);
    //   const endTime = Date.now();
    //   const latency = endTime - startTime;

    //   // Automatically change back to startIcon after 3 seconds
    //   setTimeout(() => {
    //     // Check if the user has not clicked the error icon again
    //     if (!isErrorClicked) {
    //       setRecorderStatus('idle');
    //     }
    //   }, 2500);
    // }
    // context?.sets2tMsgId((prev) => (prev = s2tMsgId));
  };

  if (config?.showVoiceRecorder === false) {
    return null;
  }
  return (
    <>
      {mediaRecorder && mediaRecorder.state === 'recording' ? (
        <div className={styles.center}>
          <RecorderControl status={'recording'} onClick={stopRecording} />
        </div>
      ) : (
        <div className={styles.center}>
          {recorderStatus === 'processing' ? (
            <RecorderControl status={'processing'} onClick={() => {}} />
          ) : recorderStatus === 'error' ? (
            <RecorderControl
              status={'error'}
              onClick={() => {
                setIsErrorClicked(true);
                startRecording();
              }}
            />
          ) : (
            <div className={styles.center}>
              <RecorderControl
                status={'start'}
                onClick={() => {
                  setIsErrorClicked(true);
                  startRecording();
                }}
                tapToSpeak={tapToSpeak}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const RecorderControl = ({ status, onClick, tapToSpeak = false }) => {
  const t = useLocalization();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const theme = useColorPalates();
  let customStylesPulse = null;
  let customStylesProcess = null;
  let classPulse = '';
  let classProcess = '';

  if (status === 'error') {
    customStylesPulse = {
      background: 'red',
      border: '5px solid red',
    };
    classPulse = styles.pulseRing;
  } else if (status === 'recording') {
    customStylesPulse = {
      background: `${theme?.primary?.light}`,
      border: `5px solid ${theme?.primary?.light}`,
    };
    classPulse = styles.pulseRing;
  } else if (status === 'processing') {
    // processing
    customStylesProcess = {
      borderColor: `transparent transparent ${theme?.primary?.dark} ${theme?.primary?.dark}`,
    };
    classProcess = styles.loader;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={styles.btn}
        style={{
          cursor: 'pointer',
          backgroundColor: theme?.primary?.light,
          border: `1px solid ${theme?.primary?.light}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className={`${classPulse}`}
          style={{
            ...customStylesPulse,
          }}
        ></div>
        <MicIcon
          sx={{
            height: '70%',
            width: '70%',
            color: 'white',
            display: 'block',
          }}
        />
        <div
          className={`${classProcess}`}
          style={{
            ...customStylesProcess,
          }}
        ></div>
      </button>
      {tapToSpeak && (
        <p
          style={{ color: 'black', fontSize: '13px', marginTop: '4px' }}
          dangerouslySetInnerHTML={{ __html: t('label.tap_to_speak') }}
        ></p>
      )}
    </>
  );
};

export default RenderVoiceRecorder;
