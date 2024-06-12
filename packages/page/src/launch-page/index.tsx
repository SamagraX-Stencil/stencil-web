import { useUiConfig, useColorPalates } from '@samagra-x/hooks';

import styles from './index.module.css';

// import Image from 'next/image';

const LaunchPage = () => {
  const config = useUiConfig('component', 'launchPage');

  const theme = useColorPalates();
  return (
    <div className={`${styles.container}`} style={{ background: theme?.primary?.main }}>
      <img
        className={styles.loginImage}
        src={config?.logo}
        alt="KrushakOdisha"
        width={220}
        height={233}
      />
      <span>{config?.label}</span>
    </div>
  );
};

export default LaunchPage;
