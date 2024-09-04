import React, { FC } from 'react';
import MobileStepper from '@mui/material/MobileStepper';

const OnBoarding: FC<{
  containerStyle?: React.CSSProperties;
  children: React.ReactNode;
  variant: 'dots' | 'text' | 'progress';
  activeStep: number;
  steps: number;
}> = ({ containerStyle = {}, children, variant = 'dots', activeStep = 0, steps = 3 }) => {
  return (
    <div>
      <div
        style={{
          height: '100dvh',
          overflowY: 'auto',
          ...containerStyle,
        }}
      >
        {children}
      </div>

      <MobileStepper
        style={{
          position: 'fixed',
          bottom: '5px',
          left: 0,
          right: 0,
        }}
        variant={variant}
        steps={steps}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1, background: 'transparent' }}
        nextButton={<div style={{ width: '10px' }}></div>}
        backButton={<div style={{ width: '10px' }}></div>}
      />
    </div>
  );
};

export default OnBoarding;
