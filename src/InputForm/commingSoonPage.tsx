import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfigContext } from '../../context/configContext'
import { useConfig } from '../../hook/useConfig'

const CommingSoonPage = () => {
  const config = useConfig('component', 'comingSoon')
  const { handleChange } = useConfigContext()

  const updateCommingSoonObjValue = (
    newValue: string | boolean,
    which: string
  ) => {
    handleChange(newValue, 'comingSoon', which)
  }

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Comming soon Page Variable" />
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
          onChange={(newValue) => updateCommingSoonObjValue(newValue, 'title')}
        />
        <InputField
          label={'description'}
          defaultValue={config.description}
          onChange={(newValue) =>
            updateCommingSoonObjValue(newValue, 'description')
          }
        />
        <InputField
          label={'backText'}
          defaultValue={config.backText}
          onChange={(newValue) =>
            updateCommingSoonObjValue(newValue, 'backText')
          }
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) =>
            updateCommingSoonObjValue(newValue, 'allowOverride')
          }
        />
      </Box>
    </Box>
  )
}

export default CommingSoonPage
