import { useLocalization } from '@repo/hooks'
import styles from './index.module.css'
import { FC } from 'react'

const LocalLaunchPage: FC<{ theme: any; config: any; compConfig: any }> = ({
  theme,
  config,
  compConfig,
}) => {
  const t = useLocalization()
  return (
    <div
      className={`${styles.container}`}
      style={{
        background: config?.launchPageColor || theme?.palette?.primary?.light,
      }}
    >
      {config?.logo && (
        <img
          className={styles.loginImage}
          src={config?.logo}
          alt="launchPageLogo"
          width={220}
          height={233}
        />
      )}
      <span style={{ color: theme?.palette?.primary?.main }}>
        {t('label.title')}
      </span>
    </div>
  )
}

export default LocalLaunchPage
