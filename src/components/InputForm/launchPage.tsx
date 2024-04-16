import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const LaunchPage = () => {
  const config = useConfig('component', 'launchPage')
  const { handleChange } = useConfigContext()

  const updateLaunchPageObjValue = (
    newValue: string | boolean,
    which: string
  ) => {
    handleChange(newValue, 'launchPage', which)
  }

  // "logo": "src/pages/launch-page/krushak_odisha.png",
  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Launch Page Variable" />
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
          label={'Label'}
          defaultValue={config.label}
          onChange={(newValue) => updateLaunchPageObjValue(newValue, 'label')}
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) =>
            updateLaunchPageObjValue(newValue, 'allowOverride')
          }
        />
      </Box>
    </Box>
  )
}

export default LaunchPage
