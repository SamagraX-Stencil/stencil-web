import { Box } from '@mui/material'
import { CheckBoxOption, InputField, PageTitle } from './customeField'
import { gap, marginBotton } from './constant'
import { useConfigContext } from '../../context/configContext'
import { useConfig } from '../../hook/useConfig'

const NavbarInput = () => {
  const config = useConfig('component', 'navbar')
  const { handleChange } = useConfigContext()

  const updateNavbarObjValue = (newValue: string | boolean, which: string) => {
    handleChange(newValue, 'navbar', which)
  }
  //   "leftHomeIcon": {
  //     "id": "logo4",
  //     "src": "https://www.amakrushi.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphone.50753eec.png&w=64&q=75 "
  //   },
  //   "logos": {
  //     "showCenterLogos": true,
  //     "centerLogoIcons": [
  //       {
  //         "id": "logo1",
  //         "src": " https://www.amakrushi.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphone.50753eec.png&w=64&q=75"
  //       }
  //     ],
  //     "showRightLogos": true,
  //     "rightLogoIcons": [
  //       {
  //         "id": "logo2",
  //         "src": "https://www.amakrushi.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphone.50753eec.png&w=64&q=75"
  //       },
  //       {
  //         "id": "logo3",
  //         "src": "https://www.amakrushi.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphone.50753eec.png&w=64&q=75"
  //       },
  //       {
  //         "id": "logo5",
  //         "src": "https://www.amakrushi.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphone.50753eec.png&w=64&q=75"
  //       }
  //     ]
  //   }
  // },
  return (
    <Box sx={{ marginBottom: marginBotton }}>
      <Box sx={{ marginBottom: marginBotton }}>
        <PageTitle title="Navbar Variable" />
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
          label={'Brand Name'}
          defaultValue={config.brandName}
          onChange={(newValue) => updateNavbarObjValue(newValue, 'brandName')}
        />
        <CheckBoxOption
          selectedValue={config.showHamburgerMenu}
          title="Show Hamburger Menu Option"
          onChange={(newValue) =>
            updateNavbarObjValue(newValue, 'showHamburgerMenu')
          }
        />
        <CheckBoxOption
          selectedValue={config.showHomeIcon}
          title="Show HomeIcon Option"
          onChange={(newValue) =>
            updateNavbarObjValue(newValue, 'showHomeIcon')
          }
        />
      </Box>
    </Box>
  )
}

export default NavbarInput
