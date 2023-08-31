import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { FCWithChildren } from 'types/app'

export const TonConnectProvider: FCWithChildren = (props) => {
  const { children } = props

  return (
    <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
      <>{children}</>
    </TonConnectUIProvider>
  )
}

const MANIFEST_URL =
  'https://launchpad-front-end.vercel.app/tonconnect-manifest.json'
