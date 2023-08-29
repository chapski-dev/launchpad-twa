import { FC } from 'react'
import { SDKProvider } from '@twa.js/sdk-react'
import { DisplayGate } from 'features/DisplayGate/DisplayGate'
import { PagesConfig } from 'pages/PagesConfig'

export const App: FC = () => {
  return (
    <SDKProvider initOptions={{ debug: true }}>
      <DisplayGate>
        <PagesConfig />
      </DisplayGate>
    </SDKProvider>
  )
}
