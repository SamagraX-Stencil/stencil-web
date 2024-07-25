import React, { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type StencilModalProps = {
  showModal: boolean;
  children?: ReactNode;
  height?: number | string;
  width?: number | string;
  heading?: string;
  handleCancelButton: () => void;
  handleActionButton?: () => void;
};
const StencilModal: React.FC<StencilModalProps> = ({
  showModal,
  children,
  height,
  width,
  heading,
  handleCancelButton,
  handleActionButton,
}) => {
  return (
    <Modal
      open={showModal}
      onClose={handleCancelButton}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width || 400,
          height: height,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" sx={{ fontSize: '16px' }}>
          {heading}
        </Typography>

        {children}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 0 0' }}>
          <Button variant="outlined" onClick={handleActionButton} style={{ height: '32px' }}>
            OK
          </Button>
          <Button variant="outlined" onClick={handleCancelButton} style={{ height: '32px' }}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default StencilModal;
