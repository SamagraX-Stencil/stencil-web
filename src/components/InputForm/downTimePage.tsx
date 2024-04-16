import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const DownTimePage = () => {
  const config = useConfig('component', 'downtime')
  const { handleChange } = useConfigContext()

  const updateDownTimeObjValue = (
    newValue: string | boolean,
    which: string
  ) => {
    handleChange(newValue, 'downtime', which)
  }

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="DownTime Page Variable" />
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
          onChange={(newValue) => updateDownTimeObjValue(newValue, 'title')}
        />
        <InputField
          label={'Supporting Text'}
          defaultValue={config.supportingText}
          onChange={(newValue) =>
            updateDownTimeObjValue(newValue, 'supportingText')
          }
        />
        <InputField
          label={'Contact Link'}
          defaultValue={config.contactLink}
          onChange={(newValue) =>
            updateDownTimeObjValue(newValue, 'contactLink')
          }
        />
        <InputField
          label={'Refresh Text'}
          defaultValue={config.refreshText}
          onChange={(newValue) =>
            updateDownTimeObjValue(newValue, 'refreshText')
          }
        />
        <InputField
          label={'Previous Page Text'}
          defaultValue={config.previousPageText}
          onChange={(newValue) =>
            updateDownTimeObjValue(newValue, 'previousPageText')
          }
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) =>
            updateDownTimeObjValue(newValue, 'allowOverride')
          }
        />
      </Box>
    </Box>
  )
}

export default DownTimePage
