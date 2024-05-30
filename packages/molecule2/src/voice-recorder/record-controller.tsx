import styles from './styles.module.css';

import { Mic } from '@mui/icons-material';
import { useColorPalates } from 'stencil-hooks';
const RecorderControl: React.FC<{
  status: string;
  onClick?: () => void;
  includeDiv?: boolean;
  tapToSpeak?: boolean;
}> = ({ status, onClick, includeDiv = true, tapToSpeak = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const theme = useColorPalates();
  let customStylesPulse;
  let customStylesProcess;
  let classPulse = '';
  let classProcess = '';

  if (status === 'error') {
    customStylesPulse = {
      background: 'red',
      border: '5px solid red',
    };
    classPulse = styles.pulseRing;
  } else if (status === 'recording') {
    customStylesPulse = {
      background: `${theme?.primary?.main}`,
      border: `5px solid ${theme?.primary?.main}`,
    };
    classPulse = styles.pulseRing;
  } else if (status === 'processing') {
    // processing
    customStylesProcess = {
      borderColor: `transparent transparent ${theme?.primary?.dark} ${theme?.primary?.dark}`,
    };
    classProcess = styles.loader;
  }

  return includeDiv ? (
    <div className={styles.container}>
      <button
        onClick={handleClick}
        className={styles.btn}
        style={{
          cursor: 'pointer',
          backgroundColor: theme?.primary?.main,
          border: `1px solid ${theme?.primary?.main}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className={`${classPulse}`}
          style={{
            ...customStylesPulse,
          }}
        ></div>
        <Mic
          sx={{
            color: 'white',
            display: 'block',
          }}
        />
        <div
          className={`${classProcess}`}
          style={{
            ...customStylesProcess,
          }}
        ></div>
      </button>
      {tapToSpeak && (
        <p style={{ color: 'black', fontSize: '12px', marginTop: '4px' }}>{'label.tap_to_speak'}</p>
      )}
    </div>
  ) : (
    <button
      onClick={handleClick}
      className={styles.btn}
      style={{
        cursor: 'pointer',
        background: theme?.primary?.main,
        border: `1px solid ${theme?.primary?.main}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className={`${classPulse}`}
        style={{
          ...customStylesPulse,
        }}
      ></div>
      <Mic
        sx={{
          color: 'white',
          display: 'block',
        }}
      />
      <div
        className={`${classProcess}`}
        style={{
          ...customStylesProcess,
        }}
      ></div>
    </button>
  );
};

export default RecorderControl;
