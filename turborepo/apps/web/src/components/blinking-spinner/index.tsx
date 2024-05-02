import React, { useMemo } from 'react';
import styles from './index.module.css';
import { useColorPalates } from '../../providers/theme-provider/hooks';

const BlinkingSpinner = () => {
  const theme = useColorPalates();
  const secondaryColor = useMemo(() => {
    return theme?.primary?.light;
  }, [theme?.primary?.light]);
  
  return (
    <p
      className={styles.spinner}
      style={{ backgroundColor: secondaryColor }}></p>
  );
};

export default BlinkingSpinner;
