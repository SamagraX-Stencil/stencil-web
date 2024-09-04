import React from 'react';

const styles = {
  spinner: {
    display: 'inline-block',
    height: '15px',
    width: '1px',
    animation: 'blink 0.5s infinite',
    backgroundColor: '#000',
  },
};
const BlinkingSpinner = () => {
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
      <p style={styles.spinner}></p>;
    </>
  );
};

export default BlinkingSpinner;
