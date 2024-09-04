'use client'
import { useColorPalates } from '../../provider/theme-provider/hooks'
import { useConfig } from '../../provider/config-provider/hook'
import styles from './index.module.css'

// import Image from 'next/image';

const LaunchPage = () => {
  const config = useConfig('component', 'launchPage')

  const theme = useColorPalates()
  return (
    <div
      className={`${styles.container}`}
      style={{ background: theme?.primary?.main }}
    >
      <img
        className={styles.loginImage}
        src={config?.logo}
        alt="KrushakOdisha"
        width={220}
        height={233}
      />
      <span>{config?.label}</span>
    </div>
  )
}

export default LaunchPage
