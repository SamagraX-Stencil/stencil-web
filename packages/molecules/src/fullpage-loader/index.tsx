import React, { FC } from 'react';
import { Backdrop, Stack } from '@mui/material';

export const FullPageLoader: FC<{
  loading: boolean;
  color?: string;
  background?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
}> = ({ loading, color = '#25b09b', background = 'rgba(0, 0, 0, 0.5)', label, labelStyle }) => {
  const loaderStyle = {
    '--d': '22px',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    boxShadow: `
      calc(1*var(--d))      calc(0*var(--d))     0 0,
      calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
      calc(0*var(--d))      calc(1*var(--d))     0 2px,
      calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
      calc(-1*var(--d))     calc(0*var(--d))     0 4px,
      calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
      calc(0*var(--d))      calc(-1*var(--d))    0 6px
    `,
    animation: 'rotate 1s infinite steps(8)',
  };

  const keyframes = `
    @keyframes rotate {
      100% { transform: rotate(1turn); }
    }
  `;

  return (
    <Backdrop sx={{ color: '#fff', zIndex: 99999, background }} open={loading}>
      <style>{keyframes}</style>
      <Stack gap={2} alignItems="center">
        <div style={{ ...loaderStyle, color }} />
        {label && (
          <span style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold', ...labelStyle }}>
            {label}
          </span>
        )}
      </Stack>
    </Backdrop>
  );
};
