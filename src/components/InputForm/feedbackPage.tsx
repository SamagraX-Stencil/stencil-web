import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { Box } from '@mui/material'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const FeedBackPage = () => {
  const config = useConfig('component', 'feedbackPage')
  const { handleChange } = useConfigContext()

  const updateFeedbackObjValue = (
    newValue: string | boolean,
    which: string
  ) => {
    handleChange(newValue, 'feedbackPage', which)
  }

  //  "": {
  //     "ratingMaxStars": 5,
  //   },

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Feedback Page Variable" />
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
          defaultValue={config.Title}
          onChange={(newValue) => updateFeedbackObjValue(newValue, 'Title')}
        />
        <InputField
          label={'Rating Box Title'}
          defaultValue={config.ratingBoxTitle}
          onChange={(newValue) =>
            updateFeedbackObjValue(newValue, 'ratingBoxTitle')
          }
        />
        <InputField
          label={'Rating Star Description'}
          defaultValue={config.ratingStarDescription}
          onChange={(newValue) =>
            updateFeedbackObjValue(newValue, 'ratingStarDescription')
          }
        />
        <InputField
          label={'Rating Button Text'}
          defaultValue={config.ratingButtonText}
          onChange={(newValue) =>
            updateFeedbackObjValue(newValue, 'ratingButtonText')
          }
        />
        <InputField
          label={'Review Box Title'}
          defaultValue={config.reviewBoxTitle}
          onChange={(newValue) =>
            updateFeedbackObjValue(newValue, 'reviewBoxTitle')
          }
        />
        <InputField
          label={'Review Place Holder'}
          defaultValue={config.reviewPlaceholder}
          onChange={(newValue) =>
            updateFeedbackObjValue(newValue, 'reviewPlaceholder')
          }
        />
        <InputField
          label={'Review Button Text'}
          defaultValue={config.reviewButtonText}
          onChange={(newValue) =>
            updateFeedbackObjValue(newValue, 'reviewButtonText')
          }
        />
        <CheckBoxOption
          selectedValue={config.reviewBox}
          title="Review Box Option"
          onChange={(newValue) => updateFeedbackObjValue(newValue, 'reviewBox')}
        />
        <CheckBoxOption
          selectedValue={config.ratingBox}
          title="Rating Box Option"
          onChange={(newValue) => updateFeedbackObjValue(newValue, 'ratingBox')}
        />
      </Box>
    </Box>
  )
}

export default FeedBackPage
