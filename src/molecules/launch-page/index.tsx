import { useColorPalates } from '../../molecules/theme-provider/hooks'
import styles from './index.module.css'
import { component } from './../../../app.config.json'
const { launchPage } = component

// import Image from 'next/image';

const LaunchPage = () => {
  const theme = useColorPalates()
  return (
    <div
      className={`${styles.container}`}
      style={{ background: theme?.primary?.main }}
    >
      <img
        className={styles.loginImage}
        src={launchPage?.logo}
        alt="KrushakOdisha"
        width={220}
        height={233}
      />
      <span>{launchPage?.label}</span>
    </div>
  )
}

export default LaunchPage
