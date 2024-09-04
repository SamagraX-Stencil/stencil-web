import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, Backdrop, Fade, CircularProgress } from '@mui/material';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useLocalization } from '../../hooks';
import locationImg from './assets/Precise.png';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

const LocationPermissionModal = (props: any) => {
  const t = useLocalization();
  const [open, setOpen] = useState(true);
  // const [location, setLocation] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const requestLocationPermission = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        props?.setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setErrorMessage('');
        handleClose();
      },
      (error) => {
        setLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage(t('error.location_disabled'));
        } else {
          setErrorMessage(t('error.location_error'));
          console.error('Error occurred while getting location:', error);
        }
        props?.setLocation(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="d-flex align-items-center justify-content-center">
              {/* <LocationOnOutlinedIcon sx={{width: '35px', height: '35px'}}/> */}
              <Image src={locationImg} alt="" />
            </div>
            <Typography
              data-testid="location-permission-modal-title"
              variant="h6"
              component="h2"
              className="text-center mt-2 font-weight-bold"
            >
              {t('message.allow_location')}
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                gap: '10px',
              }}
            >
              <Button
                data-testid="location-permission-modal-allow-button"
                variant="contained"
                color="primary"
                onClick={requestLocationPermission}
                disabled={loading} // Disable button while loading
                sx={{ padding: '12px' }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('label.allow_location_access')
                )}
              </Button>
              <Button
                data-testid="location-permission-modal-dont-allow-button"
                variant="contained"
                color="primary"
                onClick={handleClose}
                disabled={loading} // Disable button while loading
                sx={{ padding: '12px' }}
              >
                {t('label.dont_allow_location_access')}
              </Button>
            </div>
            {/* {location && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Latitude: {location.latitude}
                </Typography>
                <Typography variant="body1">
                  Longitude: {location.longitude}
                </Typography>
                <Typography variant="body1">
                  Accuracy: {location.accuracy} meters
                </Typography>
              </Box>
            )} */}
            {errorMessage && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LocationPermissionModal;
