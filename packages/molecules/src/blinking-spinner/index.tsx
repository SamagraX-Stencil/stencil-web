import React from 'react';
import styles from './index.module.css';

const BlinkingSpinner = ({ color }: any) => {
  return <p className={styles.spinner} style={{ backgroundColor: color }}></p>;
};

export default BlinkingSpinner;
