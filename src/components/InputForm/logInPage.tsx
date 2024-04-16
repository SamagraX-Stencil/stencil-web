import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { useConfig } from '../../hook/useConfig'
import { useConfigContext } from '../../context/configContext'
import { gap, marginBotton } from './constant'

const LogInPage = () => {
  const config = useConfig('component', 'loginMobileAadharPage')
  const { handleChange } = useConfigContext()
  const updateLoginPage = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'loginMobileAadharPage', which)
  }

  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Login Page Variable" />
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
          onChange={(newValue) => updateLoginPage(newValue, 'title')}
        />
        <CheckBoxOption
          selectedValue={config.showSignUp}
          title="Show SignUp Option"
          onChange={(newValue) => updateLoginPage(newValue, 'showSignUp')}
        />
        <CheckBoxOption
          selectedValue={config.allowOverride}
          title="Allow Override Option"
          onChange={(newValue) => updateLoginPage(newValue, 'allowOverride')}
        />
        <CheckBoxOption
          selectedValue={config.loginWithAadhaar}
          title="Login With Aadhaar Option"
          onChange={(newValue) => updateLoginPage(newValue, 'loginWithAadhaar')}
        />
        <CheckBoxOption
          selectedValue={config.showAlternateSignIn}
          title="Show Alternate SignIn Option"
          onChange={(newValue) =>
            updateLoginPage(newValue, 'showAlternateSignIn')
          }
        />
        <CheckBoxOption
          selectedValue={config.showLogo}
          title="Show Logo Option"
          onChange={(newValue) => updateLoginPage(newValue, 'showLogo')}
        />
        <CheckBoxOption
          selectedValue={config.showSplitedView}
          title="Show Splited View Option"
          onChange={(newValue) => updateLoginPage(newValue, 'showSplitedView')}
        />
      </Box>
    </Box>
  )
}

export default LogInPage
