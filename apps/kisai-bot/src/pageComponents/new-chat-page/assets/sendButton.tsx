import React from 'react';
import SendIcon from '@mui/icons-material/Send';

const SendButton = (props: any) => {
  return (
    <div
      style={{
        background: props?.color,
        borderRadius: '50%',
        height: props?.height,
        width: props?.width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SendIcon
        sx={{
          color: 'white',
        }}
      />
    </div>
  );
};

export default SendButton;
