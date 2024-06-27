import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

export const useLocalizationForExampleApp = () => {
  const intl = useIntl()
  return useCallback(
    (label: string) => intl.formatMessage({ id: label }),
    [intl]
  )
}
