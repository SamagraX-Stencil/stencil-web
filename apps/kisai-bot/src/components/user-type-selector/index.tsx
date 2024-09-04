import { useColorPalates } from '../../providers/theme-provider/hooks';
import LanguagePicker from '../language-picker';
import { useConfig } from '../../hooks/useConfig';
import { useLocalization } from '../../hooks';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
const UserTypeSelector = (props: any) => {
  const t = useLocalization();
  const theme = useColorPalates();
  const config = useConfig('component', 'userTypeSelectorPage');
  const [data, setData] = useState<any>(null);

  return (
    <div
      style={{
        color: '#333',
        // margin: 'auto',
        backgroundColor: '#fff',
        height: '100dvh',
        // position: 'relative',
        overflowY: 'auto',
        fontWeight: '500',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: 'calc(100% - 117px)',
          zIndex: 10,
        }}
      >
        <LanguagePicker />
      </div>
      <div
        style={{
          height: '400px',
          overflow: 'hidden',
          objectFit: 'cover',
        }}
        data-testid="user-select-bg-image"
      >
        <img src={config?.backgroundImage} alt="bgImage" width={'100%'} />
      </div>
      <div
        style={{
          // position: 'absolute',
          top: '45%', // Adjust this value to move the container up or down
          width: '100%',
          bottom: '0',
          backgroundColor: '#fff',
          borderTopLeftRadius: '30% 5%', // Adjust the curvature
          borderTopRightRadius: '30% 5%',
          overflow: 'hidden', // Ensures content aligns with the curved edges
        }}
      >
        <div style={{ padding: '0 10px 10px 10px' }}>
          <p
            data-testid="user-select-type-title"
            style={{
              marginTop: '10px',
              marginBottom: '0px',
              fontSize: '24px',
              color: '#51586B',
            }}
          >
            {t('label.who_are_you')}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '20px',
              // height: '180px'
            }}
          >
            {/* Two cards/buttons */}
            <div
              data-testid="user-select-type-button-1"
              onClick={() => {
                setData((prev: any) => ({
                  ...prev,
                  userType: 'user1',
                }));
              }}
              style={{
                backgroundColor: data?.userType === 'user1' ? theme?.primary?.main : '#F4F4F4',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                padding: '8px',
                width: '40%',
                height: '120px',
                color: data?.userType === 'user1' ? theme?.primary?.contrastText : 'black',
                // display: 'flex',
                // flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={config?.user1Image}
                alt="user1"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className="m-0 mt-2">{t('label.user1')}</p>
            </div>
            <p className="m-0">{t('label.or')}</p>
            <div
              data-testid="user-select-type-button-2"
              onClick={() => {
                setData((prev: any) => ({
                  ...prev,
                  userType: 'user2',
                }));
              }}
              style={{
                backgroundColor: data?.userType === 'user2' ? theme?.primary?.main : '#F4F4F4',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                padding: '8px',
                width: '40%',
                height: '120px',
                color: data?.userType === 'user2' ? theme?.primary?.contrastText : 'black',
                // display: 'flex',
                // flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={config?.user2Image}
                alt="user2"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className="m-0 mt-2">{t('label.user2')}</p>
            </div>
          </div>
        </div>
        <div style={{ padding: '0 10px 10px 10px' }}>
          <p
            data-testid="user-select-name-title"
            style={{
              marginTop: '16px',
              marginBottom: '0px',
              fontSize: '24px',
              color: '#51586B',
            }}
          >
            {t('label.enter_your_name')}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              // marginTop: '20px',
              // height: '180px'
            }}
          >
            <TextField
              data-testid="user-select-name-input"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setData((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              label={t('label.your_name')}
              name={'name'}
              autoComplete={'name'}
              autoFocus
            />
            <Button
              data-testid="user-select-continue-button"
              type="submit"
              fullWidth
              variant="contained"
              disabled={!data?.name || !data?.userType}
              sx={{
                textTransform: 'none',
                mt: 2,
                mb: 2,
                width: '80%',
                height: '60px',
                fontSize: '16px',
                p: 1,
                background: theme?.primary?.main,
                borderRadius: '10px',
              }}
              onClick={() => {
                props?.setOnboardingData((prev: any) => ({
                  ...prev,
                  ...data,
                }));
                props?.handleNext();
              }}
              endIcon={<ArrowForwardIcon />}
            >
              {t('label.continue')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;
