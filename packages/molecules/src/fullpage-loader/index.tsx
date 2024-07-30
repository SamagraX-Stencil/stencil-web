import { FC } from 'react';
import { Backdrop, Stack } from '@mui/material';
import styles from './index.module.css';
export const FullPageLoader: FC<{
  loading: boolean;
  color?: string;
  background?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
}> = ({ loading, color = '#25b09b', background = 'rgba(0, 0, 0, 0.5)', label, labelStyle }) => (
  <Backdrop sx={{ color: '#fff', zIndex: 99999, background }} open={loading}>
    <Stack gap={2} alignItems="center">
      <div id="loader" className={`${styles.loader}`} style={{ color }}></div>
      {label && (
        <span style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold', ...labelStyle }}>
          {label}
        </span>
      )}
    </Stack>
  </Backdrop>
);
