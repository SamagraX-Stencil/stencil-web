import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useEffect } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const InstallModal: React.FC = () => {
  const theme = useColorPalates();
  const [open, setOpen] = React.useState(false);

  let deferredPrompt: any;

  useEffect(() => {
    if (localStorage.getItem('installPwa') !== 'true') {
      // Check if the browser has the install event
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        setOpen(true);
      });
    }
  }, []);

  const closeAndSetLocalStorage = () => {
    setOpen(false);
    localStorage.setItem('installPwa', 'true');
  };

  const handleOpen = async () => {
    closeAndSetLocalStorage();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt');
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('installPwa', 'true');
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            <IconButton
              data-testid="install-app-close-button"
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              data-testid="install-app-text"
            >
              Install App
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Click the button to install the app.
            </Typography>
            <Button
              data-testid="install-app-button"
              onClick={handleOpen}
              style={{
                marginTop: '20px',
                backgroundColor: theme?.primary?.main,
                color: 'white',
              }}
            >
              Install
            </Button>
          </Box>
        </>
      </Modal>
    </>
  );
};
