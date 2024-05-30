import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'

const SidebarInput = () => {
  const config = useConfig('component', 'sidebar')
  const { handleChange } = useConfigContext()

  const updateSidebarObjValue = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'sidebar', which)
  }

  //   "languages": [
  //     {
  //       "code": "en",
  //       "label": "ENG"
  //     },
  //     {
  //       "code": "or",
  //       "label": "ଓଡ଼ିଆ"
  //     }
  //   ],
  //   "links": [
  //     {
  //       "label": "FAQ Page",
  //       "icon": "HelpIcon",
  //       "route": ""
  //     },
  //     {
  //       "label": "Chat Page",
  //       "icon": "HistoryIcon",
  //       "route": ""
  //     },
  //     {
  //       "label": "Feedback",
  //       "icon": "FeedbackIcon",
  //       "route": ""
  //     }
  //   ],

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Sidebar Variable" />
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
          label={'Profile Text'}
          defaultValue={config.profileText}
          onChange={(newValue) =>
            updateSidebarObjValue(newValue, 'profileText')
          }
        />
        <InputField
          label={'logout Button Label'}
          defaultValue={config.logoutButtonLabel}
          onChange={(newValue) =>
            updateSidebarObjValue(newValue, 'logoutButtonLabel')
          }
        />
        <CheckBoxOption
          selectedValue={config.showLangSwitcher}
          title="Show Language Switcher Option"
          onChange={(newValue) =>
            updateSidebarObjValue(newValue, 'showLangSwitcher')
          }
        />
        <CheckBoxOption
          selectedValue={config.showProfileIcon}
          title="Show Profile Icon Option"
          onChange={(newValue) =>
            updateSidebarObjValue(newValue, 'showProfileIcon')
          }
        />
        <CheckBoxOption
          selectedValue={config.showLogoutButton}
          title="Show Logout Button Option"
          onChange={(newValue) =>
            updateSidebarObjValue(newValue, 'showLogoutButton')
          }
        />
      </Box>
    </Box>
  )
}

export default SidebarInput
