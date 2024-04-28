import { useLocalization } from '../../hooks'
import styles from './index.module.css'
import { FC } from 'react'

const LaunchPage: FC<{ theme: any; config: any; compConfig: any }> = ({
  theme,
  config,
  compConfig,
}) => {
  const t = useLocalization()
  return (
    <div
      className={`${styles.container}`}
      style={{ background: theme?.palette?.primary?.main }}
    >
      <img
        className={styles.loginImage}
        src={config?.logo}
        alt="launchPageLogo"
        width={220}
        height={233}
      />
      <span style={{ color: theme?.palette?.primary?.contrastText }}>
        {t('label.title')}
      </span>
    </div>
  )
}

export default LaunchPage
