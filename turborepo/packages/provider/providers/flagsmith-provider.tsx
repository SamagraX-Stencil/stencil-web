'use client'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { FlagsmithProvider as FSProvider } from 'flagsmith/react'
import flagsmith from 'flagsmith/isomorphic'
import { FullPageLoader } from './fullpage-loader'

export const FlagsmithProvider: FC<{ children: ReactElement }> = ({
  children,
}): ReactElement => {
  const [flagsmithState, setflagsmithState] = useState<any>(null)
  console.log({ flagsmithState })
  useEffect(() => {
    console.log({ flagsmithState })
    const getFlagSmithState = async () => {
      await flagsmith.init({
        environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID || '',
      })
      if (flagsmith.getState()) {
        setflagsmithState(flagsmith.getState())
      }
    }
    getFlagSmithState()
  }, [])

  if (!flagsmithState)
    return <FullPageLoader loading label="Fetching Flagsmith State" />
  return (
    <FSProvider flagsmith={flagsmith} serverState={flagsmithState}>
      {children}
    </FSProvider>
  )
}
