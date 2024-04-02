import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { metaMask } from 'wagmi/connectors'


import { WagmiProvider, cookieStorage, createStorage } from 'wagmi'

import { mainnet, baseSepolia } from 'wagmi/chains'

import { FCWithChildren } from 'types/app'
import { includeWallets } from './wallets'

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!walletConnectProjectId) {
  throw new Error('Wallet connect project id us not defined')
}

const walletConnectMetadata = {
  name: 'XTON',
  description:
    'XTON is the first launchpad that brings together $43B liquidity of EVM chains, 800M users of Telegram and the fastest blockchain in the world - TON.',
  url: 'https://tokenova.fi/', // origin must match your domain & subdomain
  icons: ['https://tokenova.fi/logo.png'],
}

const walletConnectConfig = defaultWagmiConfig({
  chains: [mainnet, baseSepolia],
  projectId: walletConnectProjectId,
  metadata: walletConnectMetadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true,
  enableInjected: true,
  connectors: [
    metaMask({
      useDeeplink: false,
    
    })
  ]
}) 


createWeb3Modal({
  wagmiConfig: walletConnectConfig,
  projectId: walletConnectProjectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

export const WalletsConnectProvider: FCWithChildren = (props) => {
  const { children } = props

  // const initialState = cookieToInitialState(
  //   walletConnectConfig,
  //   headers().get('cookie')
  // )

  return (
    <WagmiProvider config={walletConnectConfig}>
      <TonConnectUIProvider
        manifestUrl={MANIFEST_URL}
        uiPreferences={{
          theme: 'SYSTEM',
        }}
        walletsListConfiguration={{
          includeWallets: includeWallets,
        }}
      >
        <>{children}</>
      </TonConnectUIProvider>
    </WagmiProvider>
  )
}

const MANIFEST_URL = 'https://tokenova.fi/tonconnect-manifest.json'
