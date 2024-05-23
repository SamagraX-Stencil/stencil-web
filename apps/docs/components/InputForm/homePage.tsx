import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const HomePage = () => {
  const config = useConfig('component', 'homePage')
  const { handleChange } = useConfigContext()

  const updateHomeObjValue = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'homePage', which)
  }

  //       "btns": [
  //         {
  //           "title": "Weather Advisory",
  //           "image": ""
  //         }
  //       ],
  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Home Page Variable" />
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
          onChange={(newValue) => updateHomeObjValue(newValue, 'title')}
        />
        <InputField
          label={'Placeholder'}
          defaultValue={config.placeholder}
          onChange={(newValue) => updateHomeObjValue(newValue, 'placeholder')}
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) => updateHomeObjValue(newValue, 'allowOverride')}
        />
        <CheckBoxOption
          selectedValue={config.showBtns}
          title="Show Button Option"
          onChange={(newValue) => updateHomeObjValue(newValue, 'showBtns')}
        />
        <CheckBoxOption
          selectedValue={config.showMic}
          title="Show Mic Option"
          onChange={(newValue) => updateHomeObjValue(newValue, 'showMic')}
        />
      </Box>
    </Box>
  )
}

export default HomePage
