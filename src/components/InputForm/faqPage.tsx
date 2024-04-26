import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const FaqPage = () => {
  const config = useConfig('component', 'faqs')
  const { handleChange } = useConfigContext()

  const updateFaqObjValue = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'faqs', which)
  }

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="FAQs Page Variable" />
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
          onChange={(newValue) => updateFaqObjValue(newValue, 'title')}
        />
        <InputField
          label={'User Manual Text'}
          defaultValue={config.userManualText}
          onChange={(newValue) => updateFaqObjValue(newValue, 'userManualText')}
        />
        <InputField
          label={'Contact Description Text'}
          defaultValue={config.contactDescriptionText}
          onChange={(newValue) =>
            updateFaqObjValue(newValue, 'contactDescriptionText')
          }
        />
        <InputField
          label={'Contact Text'}
          defaultValue={config.contactText}
          onChange={(newValue) => updateFaqObjValue(newValue, 'contactText')}
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) => updateFaqObjValue(newValue, 'allowOverride')}
        />
      </Box>
    </Box>
  )
}

export default FaqPage
