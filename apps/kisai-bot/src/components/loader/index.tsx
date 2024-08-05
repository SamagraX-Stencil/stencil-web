// Loader.js
import React from 'react';
import styles from './index.module.css';

export const Loader = ({ color }: { color: string }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.bar1} style={{ backgroundColor: color }}></div>
      <div className={styles.bar2} style={{ backgroundColor: color }}>
        {' '}
      </div>
      <div className={styles.bar3} style={{ backgroundColor: color }}></div>
      <div className={styles.bar4} style={{ backgroundColor: color }}></div>
      <div className={styles.bar5} style={{ backgroundColor: color }}></div>
      <div className={styles.bar6} style={{ backgroundColor: color }}></div>
      <div className={styles.bar7} style={{ backgroundColor: color }}></div>
      <div className={styles.bar8} style={{ backgroundColor: color }}></div>
      <div className={styles.bar9} style={{ backgroundColor: color }}></div>
      <div className={styles.bar10} style={{ backgroundColor: color }}></div>
      <div className={styles.bar11} style={{ backgroundColor: color }}></div>
      <div className={styles.bar12} style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default Loader;
