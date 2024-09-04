import logo from './assets/main.png'
import cm from './assets/cm.png'
import bottom from './assets/bottom.png'
import { Container, IconButton } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useColorPalates } from '../../../provider/theme-provider/hooks'
import { useConfig } from '../../../provider/config-provider/hook'
import { LanguagePicker } from '@samagra-x/stencil-molecules'

const AkaiLaunch = () => {
  const config = useConfig('component', 'welcomePage')
  const theme = useColorPalates()
  console.log('akailaunch page', config, theme)
  return (
    <Container
      className="p-2"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
        className="p-2"
      >
        {config?.showTopLeftLogo && (
          <img
            src={config?.topLeftLogo || logo.src}
            style={{ height: config?.topLeftLogoHeight || '40px' }}
          />
        )}
        <LanguagePicker />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="mt-4">
          {config?.showCenterImage && (
            <img
              src={cm.src}
              style={{
                width: config?.centerImageWidth || '148px',
                height: config?.centerImageHeight || '210px',
              }}
            />
          )}
        </div>
        <div>
          <text
            style={{
              fontSize: '22px',
              color: theme.primary.dark,
              lineHeight: '42px',
              fontWeight: '600',
            }}
          >
            {config?.centerText}
          </text>
        </div>
        {config?.showCenterBottomImage && (
          <img
            src={config?.centerBottomImage || bottom.src}
            style={{
              maxWidth: '80vw',
              height: config?.centerBottomImageHeight,
              width: config?.centerBottomImageWidth,
            }}
          />
        )}
      </div>
      {config?.showProceedBtn && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton
            aria-label="fingerprint"
            style={{
              background: config?.proceedBtnColor || theme.primary.dark,
            }}
          >
            <ArrowForward
              style={{ color: 'white', height: '24px', width: '24px' }}
            />
          </IconButton>
        </div>
      )}
    </Container>
  )
}

export default AkaiLaunch
