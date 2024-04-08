import { useColorPalates } from '../../molecules/theme-provider/hooks';
import styles from './index.module.css';
import config from './config.json';
// import Image from 'next/image';

 const LaunchPage=()=> {
  const theme = useColorPalates();
  return (
    <div className={`${styles.container}`} style={{background: theme?.primary?.main}}>
      <img
        className={styles.loginImage}
        src={config?.component?.logo}
        alt="KrushakOdisha"
        width={220}
        height={233}
      />
      <span>{config?.component?.label}</span>
    </div>
  );
}


export default LaunchPage