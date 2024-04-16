import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const VoiceRecorderInput = () => {
  const config = useConfig('component', 'voiceRecorder')
  const { handleChange } = useConfigContext()

  const updateVoiceRecorderObjValue = (
    newValue: string | boolean,
    which: string
  ) => {
    handleChange(newValue, 'voiceRecorder', which)
  }

  //   "voiceMinDecibels": -35,
  //   "delayBetweenDialogs": 2500,
  //   "dialogMaxLength": 60000,
  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Voice Recorder Variable" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: gap,
        }}
      >
        <InputField
          label={'Recorder Error Message'}
          defaultValue={config.recorderErrorMessage}
          onChange={(newValue) =>
            updateVoiceRecorderObjValue(newValue, 'recorderErrorMessage')
          }
        />
        <InputField
          label={'Wait Message'}
          defaultValue={config.waitMessage}
          onChange={(newValue) =>
            updateVoiceRecorderObjValue(newValue, 'waitMessage')
          }
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) =>
            updateVoiceRecorderObjValue(newValue, 'allowOverride')
          }
        />
        <CheckBoxOption
          selectedValue={config.isRecording}
          title="Is Recording Option"
          onChange={(newValue) =>
            updateVoiceRecorderObjValue(newValue, 'isRecording')
          }
        />
      </Box>
    </Box>
  )
}

export default VoiceRecorderInput
