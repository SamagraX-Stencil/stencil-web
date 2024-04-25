import { useUiConfig } from '../../hook/useConfig'; 
import { useColorPalates } from '../../molecules/theme-provider/hooks';
import styles from './index.module.css';

const LaunchPage = () => {
  const config = useUiConfig('component', 'launchPage');

  const theme = useColorPalates();
  return (
    <div
      className={`${styles.container}`}
      style={{ background: theme?.primary?.main }}
    >
      <img
        src={config.logo}
        alt="KrushakOdisha"
        width={220}
        height={233}
      />
      <span>{config?.label}</span>
    </div>
  );
};

export default LaunchPage;
