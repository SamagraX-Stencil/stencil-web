// import styles from './styles.module.css';

// import { Mic } from '@mui/icons-material';
// import { useColorPalates } from '@samagra-x/stencil-hooks';
// const RecorderControl: React.FC<{
//   status: string;
//   onClick?: () => void;
//   includeDiv?: boolean;
//   tapToSpeak?: boolean;
// }> = ({ status, onClick, includeDiv = true, tapToSpeak = false }) => {
//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     }
//   };
//   const theme = useColorPalates();
//   let customStylesPulse;
//   let customStylesProcess;
//   let classPulse = '';
//   let classProcess = '';

//   if (status === 'error') {
//     customStylesPulse = {
//       background: 'red',
//       border: '5px solid red',
//     };
//     classPulse = styles.pulseRing;
//   } else if (status === 'recording') {
//     customStylesPulse = {
//       background: `${theme?.primary?.main}`,
//       border: `5px solid ${theme?.primary?.main}`,
//     };
//     classPulse = styles.pulseRing;
//   } else if (status === 'processing') {
//     // processing
//     customStylesProcess = {
//       borderColor: `transparent transparent ${theme?.primary?.dark} ${theme?.primary?.dark}`,
//     };
//     classProcess = styles.loader;
//   }

//   return includeDiv ? (
//     <div className={styles.container}>
//       <button
//         onClick={handleClick}
//         className={styles.btn}
//         style={{
//           cursor: 'pointer',
//           backgroundColor: theme?.primary?.main,
//           border: `1px solid ${theme?.primary?.main}`,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <div
//           className={`${classPulse}`}
//           style={{
//             ...customStylesPulse,
//           }}
//         ></div>
//         <Mic
//           sx={{
//             color: 'white',
//             display: 'block',
//           }}
//         />
//         <div
//           className={`${classProcess}`}
//           style={{
//             ...customStylesProcess,
//           }}
//         ></div>
//       </button>
//       {tapToSpeak && (
//         <p style={{ color: 'black', fontSize: '12px', marginTop: '4px' }}>{'label.tap_to_speak'}</p>
//       )}
//     </div>
//   ) : (
//     <button
//       onClick={handleClick}
//       className={styles.btn}
//       style={{
//         cursor: 'pointer',
//         background: theme?.primary?.main,
//         border: `1px solid ${theme?.primary?.main}`,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <div
//         className={`${classPulse}`}
//         style={{
//           ...customStylesPulse,
//         }}
//       ></div>
//       <Mic
//         sx={{
//           color: 'white',
//           display: 'block',
//         }}
//       />
//       <div
//         className={`${classProcess}`}
//         style={{
//           ...customStylesProcess,
//         }}
//       ></div>
//     </button>
//   );
// };

// export default RecorderControl;

 import React, { CSSProperties } from 'react';
import { Mic } from '@mui/icons-material';

interface RecorderControlProps {
  status: string;
  onClick?: () => void;
  includeDiv?: boolean;
  tapToSpeak?: boolean;
  primaryColor: string;
  primaryDarkColor: string;
}

const RecorderControl: React.FC<RecorderControlProps> = ({
  status,
  onClick,
  includeDiv = true,
  tapToSpeak = false,
  primaryColor,
  primaryDarkColor,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const centerStyles:CSSProperties = {
    display: 'block',
    height: '100%',
    width: '100%',
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',
  };

  const containerStyles: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    margin: 'auto',
    width: '4rem',
    height: '4rem',
  };

  const pulseRingStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    animation: 'pulsate 1.5s infinite',
    background: status === 'error' ? 'red' : primaryColor,
    border: `5px solid ${status === 'error' ? 'red' : primaryColor}`,
  };

  const btn:CSSProperties = {
    padding: 0,
    borderRadius: '100%',
    width: '40px',
    height: '40px',
    fontSize: '3em',
    color: '#fff',
    margin: 0,
    position: 'relative',
    zIndex: 999,
    display: 'inline-block',
    lineHeight: '40px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',
    backgroundImage: 'none',
  };

  const loader: CSSProperties = {
      width: '45px',
      height: '45px',
      borderRadius: '100%',
      display: 'inline-block',
      position: 'absolute',
      border: '3px solid',
      borderColor: `transparent transparent ${primaryDarkColor} ${primaryDarkColor}`,
      boxSizing: 'border-box',
      animation: 'rotation 1s linear infinite',
    }

    const styles = {
    keyframes: `
      @keyframes pulsate {
        0% {
          transform: scale(1, 1);
          opacity: 1;
        }
        100% {
          transform: scale(1.3, 1.3);
          opacity: 0;
        }
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  };

  const keyframesStyle = (
    <style dangerouslySetInnerHTML={{ __html: styles.keyframes }} />
  );

  return (
    <>
      {keyframesStyle}
      {includeDiv ? (
        <div style={containerStyles}>
          <button
            onClick={handleClick}
            style={{
              ...btn,
              cursor: 'pointer',
              backgroundColor: primaryColor,
              border: `1px solid ${primaryColor}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={pulseRingStyle}></div>
            <Mic
              sx={{
                color: 'green',
                display: 'block',
              }}
            />
            {status === 'processing' && <div style={loader}></div>}
          </button>
          {tapToSpeak && (
            <p style={{ color: 'black', fontSize: '12px', marginTop: '4px' }}>
              {'label.tap_to_speak'}
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={handleClick}
          style={{
            ...btn,
            cursor: 'pointer',
            backgroundColor: primaryColor,
            border: `1px solid ${primaryColor}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={pulseRingStyle}></div>
          <Mic
            sx={{
              color: 'white',
              display: 'block',
            }}
          />
          {status === 'processing' && <div style={loader}></div>}
        </button>
      )}
    </>
  );
};

export default RecorderControl;

