import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const HistoryPage = () => {
  const config = useConfig('component', 'historyPage')
  const { handleChange } = useConfigContext()

  const updateHistoryObjValue = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'historyPage', which)
  }

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="History Page Variable" />
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
          onChange={(newValue) => updateHistoryObjValue(newValue, 'title')}
        />
        <InputField
          label={'No Items Text'}
          defaultValue={config.noItemsText}
          onChange={(newValue) =>
            updateHistoryObjValue(newValue, 'noItemsText')
          }
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) =>
            updateHistoryObjValue(newValue, 'allowOverride')
          }
        />
        <CheckBoxOption
          selectedValue={config.allowDelete}
          title="Allow Delete Option"
          onChange={(newValue) =>
            updateHistoryObjValue(newValue, 'allowDelete')
          }
        />
        <CheckBoxOption
          selectedValue={config.showTimestamp}
          title="Show Timestamp Option"
          onChange={(newValue) =>
            updateHistoryObjValue(newValue, 'showTimestamp')
          }
        />
      </Box>
    </Box>
  )
}

export default HistoryPage
