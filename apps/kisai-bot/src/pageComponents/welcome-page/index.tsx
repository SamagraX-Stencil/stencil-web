import { Container, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useConfig } from '../../hooks/useConfig';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useLocalization } from '../../hooks';

const WelcomePage = (props: any) => {
  const t = useLocalization();
  const config = useConfig('component', 'welcomePage') || props?.config?.component?.welcomePage;

  const theme = useColorPalates();
  return (
    <Container
      className="p-2"
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: "space-between",
        height: '100dvh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        className="p-2"
      >
        <div
          style={{
            height: config?.topLeftContainerHeight,
            width: config?.topLeftContainerWidth,
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {config?.showTopLeftLogo1 && <img src={config?.topLeftLogo1} height="100%" width="30%" />}
          {config?.showTopLeftLogo2 && <img src={config?.topLeftLogo2} height="100%" width="30%" />}
          {config?.showTopLeftLogo3 && <img src={config?.topLeftLogo3} height="100%" width="30%" />}
        </div>
      </div>
      <div className="text-center">
        <div style={{ marginTop: '20%' }}>
          {config?.showCenterImage && (
            <img
              src={config?.centerImage}
              width={config?.centerImageWidth}
              height={config?.centerImageHeight}
            />
          )}
        </div>
        <div
          style={{
            marginTop: '20%',
          }}
        >
          <p
            style={{
              fontSize: '32px',
              color: theme?.primary?.main,
              lineHeight: '42px',
              fontWeight: '600',
            }}
          >
            {t('label.subtitle')}
          </p>
        </div>
        {config?.showCenterBottomImage && (
          <div style={{ marginTop: '8px' }}>
            <img
              src={config?.centerBottomImage}
              height={config?.centerBottomImageHeight}
              width={config?.centerBottomImageWidth}
            />
          </div>
        )}
        <div
          style={{
            marginTop: '8px',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: 'var(--font)',
              fontWeight: '600',
            }}
          >
            {t('label.connect_with_us')}
          </p>
        </div>
      </div>
      {/* {<div className="text-center mt-4">
        <IconButton
          aria-label="fingerprint"
          style={{ background: theme?.primary?.main, height: '76px', width: '76px' }}
          onClick={props?.handleNext}
        >
          <ArrowForwardIcon style={{ color: "white", height: '36px', width: '36px' }} />
        </IconButton>
      </div>} */}
    </Container>
  );
};

export default WelcomePage;
