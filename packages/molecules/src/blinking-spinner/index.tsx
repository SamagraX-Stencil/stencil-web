import React, { CSSProperties } from 'react';

const styles = {
  spinner: {
    display: 'inline-block',
    height: '15px',
    width: '1px',
    animation: 'blink 0.5s infinite',
    backgroundColor: '#000',
  },
};
const BlinkingSpinner = ({ spinerStyle }: { spinerStyle: CSSProperties }) => {
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
      <p style={{ ...styles.spinner, ...spinerStyle }}></p>
    </>
  );
};

export default BlinkingSpinner;
