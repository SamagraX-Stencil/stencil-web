import { Box } from '@mui/material'
import {
  CheckBoxOption,
  InputField,
  InputNumberField,
  PageTitle,
} from './customeField'
import { gap, marginBotton } from './constant'
import { useConfigContext } from '../../context/configContext'
import { useConfig } from '../../hook/useConfig'
import UploadFile from './indexDb'

const OtpInputPage = () => {
  const config = useConfig('component', 'otpPage')
  const { handleChange } = useConfigContext()

  const updateOtpObjValue = (
    newValue: string | boolean | number,
    which: string
  ) => {
    handleChange(newValue, 'otpPage', which)
  }
  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Otp Page Variable" />
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
          label={'Title'}
          defaultValue={config.title}
          onChange={(newValue) => updateOtpObjValue(newValue, 'title')}
        />
        <InputNumberField
          defaultValue={4}
          label="Otp Length"
          onChange={(newValue) => updateOtpObjValue(newValue, 'otpLength')}
        />
        <InputNumberField
          defaultValue={30}
          label="ResendvOtpvTimer"
          onChange={(newValue) => updateOtpObjValue(newValue, 'resendOtpTimer')}
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) => updateOtpObjValue(newValue, 'allowOverride')}
        />
        <CheckBoxOption
          selectedValue={config.showLogo}
          title="Show Logo Option"
          onChange={(newValue) => updateOtpObjValue(newValue, 'showLogo')}
        />
        <CheckBoxOption
          selectedValue={config.showSplitedView}
          title="Show Splited View Option"
          onChange={(newValue) =>
            updateOtpObjValue(newValue, 'showSplitedView')
          }
        />
        <UploadFile
          selectedValue={config.logo}
          title="Logo"
          onChange={(newValue) => updateOtpObjValue(newValue, 'logo')}
        />
      </Box>
    </Box>
  )
}

export default OtpInputPage
