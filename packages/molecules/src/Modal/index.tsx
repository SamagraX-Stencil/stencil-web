import React, { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

type StencilModalProps = {
  showModal: boolean;
  children: ReactNode;
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
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        {children}
      </Box>
    </Modal>
  );
};

export default StencilModal;
