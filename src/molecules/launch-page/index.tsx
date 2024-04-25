import { useUiConfig } from '../../hook/useConfig'; // Updated import statement
import { useColorPalates } from '../../molecules/theme-provider/hooks';
import styles from './index.module.css';
import krushakOdishaImage from './krushak_odisha.png';

// Inside the component:
const LaunchPage = () => {
  const config = useUiConfig('component', 'launchPage');
      
      
  const theme = useColorPalates();
  return (
    <div
      className={`${styles.container}`}
      style={{ background: theme?.primary?.main }}
    >
      <img
        src={krushakOdishaImage}
        alt="KrushakOdisha"
        width={220}
        height={233}
      />
      <span>{config?.label}</span>
    </div>
  );
};

export default LaunchPage;
