import React, { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, TextField } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useConfig } from '../../hooks/useConfig';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import LocationPermissionModal from './LocationPermissionModal';
import { useLocalization } from '../../hooks';
import { usePlacesWidget } from 'react-google-autocomplete';

const LocationInput = (props: any) => {
  const t = useLocalization();
  const [inputValue, setInputValue] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const theme = useColorPalates();

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
      setInputValue(place);
    },
    inputAutocompleteValue: 'country',
    options: {
      componentRestrictions: { country: 'in' },
    },
  });

  const fetchLocation = async (lat: any, long: any) => {
    try {
      let res: any = await fetch(`https://geoip.samagra.io/georev?lat=${lat}&lon=${long}`);
      res = await res.json();
      console.log(res);
      props?.setOnboardingData((prev: any) => ({
        ...prev,
        location: {
          district: res?.district,
          block: res?.subDistrict,
          state: res?.state,
        },
      }));
      props?.handleNext();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location) {
      fetchLocation(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <Container>
      <LocationPermissionModal setLocation={setLocation} />
      <div className="d-flex pt-2 align-items-center justify-content-center mt-2">
        <IconButton
          data-testid="location-input-back-button"
          aria-label="fingerprint"
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '12px',
            border: '1px solid #E8ECF4',
          }}
          onClick={props?.handleBack}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <div className="text-center w-100 pr-4">
          <p
            data-testid="location-input-title"
            style={{
              fontWeight: '500',
              fontSize: '32px',
              color: theme?.primary?.main,
              margin: 0,
            }}
          >
            {t('label.current_location')}
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '70dvh',
          }}
        >
          <TextField
            data-testid="location-input"
            fullWidth
            variant="outlined"
            inputRef={materialRef}
          />
        </div>
        <div>
          <Box sx={{ mt: 1 }}>
            <Button
              data-testid="location-input-continue-button"
              type="submit"
              fullWidth
              variant="contained"
              disabled={!inputValue}
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
                  location: {
                    district: inputValue?.address_components?.[0]?.long_name,
                    block: inputValue?.address_components?.[1]?.long_name,
                    state: inputValue?.address_components?.[3]?.long_name,
                  },
                }));
                props?.handleNext();
              }}
              endIcon={<ArrowForwardIcon />}
            >
              {t('label.confirm')}
            </Button>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default LocationInput;
