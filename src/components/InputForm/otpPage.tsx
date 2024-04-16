import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfigContext } from '../../context/configContext'
import { useConfig } from '../../hook/useConfig'

const OtpPageInput = () => {
  const config = useConfig('component', 'otpPage')
  const { handleChange } = useConfigContext()

  const updateOtpObjValue = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'otpPage', which)
  }
  //   "otpLength": 4,
  //   "logo": "https://seeklogo.com/images/C/corporate-company-logo-749CEE6ADC-seeklogo.com.png",
  //   "resendOtpTimer": 30
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
      </Box>
    </Box>
  )
}

export default OtpPageInput
