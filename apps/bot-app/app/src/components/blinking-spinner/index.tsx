import React, { useMemo } from 'react'
import styles from './index.module.css'
import { useBotAppColorPalates } from '@samagra-x/hooks'

const BlinkingSpinner = () => {
  const theme = useBotAppColorPalates()
  const secondaryColor = useMemo(() => {
    return theme?.primary?.light
  }, [theme?.primary?.light])

  return (
    <p
      className={styles.spinner}
      style={{ backgroundColor: secondaryColor }}
    ></p>
  )
}

export default BlinkingSpinner
