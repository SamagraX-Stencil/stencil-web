import { useState } from 'react'
import styles from './styles.module.css'
import toast from 'react-hot-toast'
import config from './config.json'

interface VoiceRecorder {
  setInputMsg: (msg: string) => void
  tapToSpeak: boolean
  includeDiv?: boolean
}

const VoiceRecorder: React.FC<VoiceRecorder> = ({
  setInputMsg,
  tapToSpeak,
  includeDiv = false,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [userClickedError, setUserClickedError] = useState(false)
  const [apiCallStatus, setApiCallStatus] = useState('idle')

  const VOICE_MIN_DECIBELS: number = -35
  const delayBetweenDialogs: number = config.component.delayBetweenDialogs
  const DIALOG_MAX_LENGTH: number = 60 * 1000
  let IS_RECORDING: boolean = false

  const startRecording = async () => {
    IS_RECORDING = true
    record()
  }

  const stopRecording = () => {
    IS_RECORDING = false
    if (mediaRecorder !== null) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  function record() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      //start recording:
      const recorder = new MediaRecorder(stream)
      recorder.start()
      setMediaRecorder(recorder)

      //save audio chunks:
      const audioChunks: BlobPart[] = []
      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data)
      })

      //analysis:
      const audioContext = new AudioContext()
      const audioStreamSource = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.minDecibels = VOICE_MIN_DECIBELS
      audioStreamSource.connect(analyser)
      const bufferLength = analyser.frequencyBinCount
      const domainData = new Uint8Array(bufferLength)

      //loop:
      let time: Date = new Date()
      let startTime: number
      let lastDetectedTime: number = time.getTime()
      let anySoundDetected: boolean = false
      const detectSound = () => {
        //recording stopped by user:
        if (!IS_RECORDING) return

        time = new Date()
        const currentTime = time.getTime()

        //time out:
        if (currentTime > startTime + DIALOG_MAX_LENGTH) {
          recorder.stop()
          return
        }

        //a dialog detected:
        if (
          anySoundDetected === true &&
          currentTime > lastDetectedTime + delayBetweenDialogs
        ) {
          recorder.stop()
          return
        }

        //check for detection:
        analyser.getByteFrequencyData(domainData)
        for (let i = 0; i < bufferLength; i++)
          if (domainData[i] > 0) {
            anySoundDetected = true
            time = new Date()
            lastDetectedTime = time.getTime()
          }

        //continue the loop:
        window.requestAnimationFrame(detectSound)
      }
      window.requestAnimationFrame(detectSound)

      //stop event:
      recorder.addEventListener('stop', () => {
        //stop all the tracks:
        stream.getTracks().forEach((track) => track.stop())
        if (!anySoundDetected) return

        //send to server:
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' })
        makeComputeAPICall(audioBlob)
      })
    })
  }
  const makeComputeAPICall = async (blob: Blob) => {
    try {
      setApiCallStatus('processing')
      console.log('base', blob)
      toast.success(`${config.component.messageRecorderWait}`)
      // Define the API endpoint and make api call here 

      //set api result in setInputMsg 
      setInputMsg('')

    } catch (error) {
      console.error(error)
      setApiCallStatus('error')
      toast.error(`${config.component.recorderErrorMessage}`)
      // Set userClickedError to true when an error occurs
      setUserClickedError(false)
      setTimeout(() => {
        // Check if the user has not clicked the error icon again
        if (!userClickedError) {
          setApiCallStatus('idle')
        }
      }, 2500)
    
    }
  }

  return (
    <div>
      <div>
        {mediaRecorder && mediaRecorder.state === 'recording' ? (
          <div className={styles.center}>
            {includeDiv ? (
              <div className={styles.imgContainer}>
                <img
                  src={config.component.stopIcon}
                  alt='stopIcon'
                  onClick={() => {
                    stopRecording()
                  }}
                  style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                />
              </div>
            ) : (
              <img
                src={config.component.stopIcon}
                alt='stopIcon'
                onClick={() => {
                  stopRecording()
                }}
                style={{ cursor: 'pointer', height: '40px', width: '40px' }}
              />
            )}
          </div>
        ) : (
          <div className={styles.center}>
            {apiCallStatus === 'processing' ? (
              includeDiv ? (
                <div className={styles.imgContainer}>
                  <img
                    src={config.component.processingIcon}
                    alt='processingIcon'
                    style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                  />
                </div>
              ) : (
                <img
                  src={config.component.processingIcon}
                  alt='processingIcon'
                  style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                />
              )
            ) : apiCallStatus === 'error' ? (
              includeDiv ? (
                <div className={styles.imgContainer}>
                  <img
                    src={config.component.errorIcon}
                    alt='errorIcon'
                    onClick={() => {
                      setUserClickedError(true)
                      startRecording()
                    }}
                    style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                  />
                </div>
              ) : (
                <img
                  src={config.component.errorIcon}
                  alt='errorIcon'
                  onClick={() => {
                    setUserClickedError(true)
                    startRecording()
                  }}
                  style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                />
              )
            ) : (
              <>
                {includeDiv ? (
                  <div className={styles.imgContainer}>
                    <img
                      src={config.component.startIcon}
                      alt='startIcon'
                      onClick={() => {
                        setUserClickedError(true)
                        startRecording()
                      }}
                      style={{
                        cursor: 'pointer',
                        height: '40px',
                        width: '40px',
                      }}
                    />
                  </div>
                ) : (
                  <img
                    // src={context?.kaliaClicked ? disabledStart : start}
                    src={config.component.startIcon}
                    alt='startIcon'
                    onClick={() => {
                      // if (context?.kaliaClicked) return
                      setUserClickedError(true)
                      startRecording()
                    }}
                    // style={{
                    //   cursor: context?.kaliaClicked ? 'not-allowed' : 'pointer',
                    // }}
                    style={{
                      cursor: 'pointer',
                      height: '40px',
                      width: '40px',
                    }}
                  />
                )}
                {tapToSpeak ? (
                  <p
                    style={{
                      color: 'black',
                      fontSize: '12px',
                      marginTop: '4px',
                    }}
                  >
                    {'label.tap_to_speak'}
                  </p>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default VoiceRecorder
