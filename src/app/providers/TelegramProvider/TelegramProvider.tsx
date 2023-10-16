import { createContext, useEffect, useMemo, useState } from 'react'

import { useTonAddress } from '@tonconnect/ui-react'
import Script from 'next/script'
import { useQuery } from 'react-query'
import { FCWithChildren } from 'types/app'
import { getBalance } from 'utils/getBalance'
import { TelegramUser, WebApp } from './types'

export type TelegramContextType = {
  webApp?: WebApp
  user?: TelegramUser
  balance?: number
  isFirstAppLoad?: boolean
}

export const TelegramContext = createContext<TelegramContextType>({})

export const TelegramProvider: FCWithChildren = (props) => {
  const { children } = props

  const [webApp, setWebApp] = useState<WebApp | null>(null)

  const [isFirstAppLoad, setIsFirstAppLoad] = useState<boolean>(true)

  const userWalletAddress = useTonAddress()

  const { data: balance } = useQuery(
    ['userBalance'],
    () => getBalance(userWalletAddress, 'testnet'),
    {
      enabled: !!userWalletAddress,
    }
  )

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp

    if (app) {
      app.ready()

      app.CloudStorage.getItem(
        'isAlreadyAuthorized',
        (error: any, data: any) => {
          // && invitedBy?.username
          if (!Boolean(data)) {
            console.log(data)
            const timer = setTimeout(() => {
              setIsFirstAppLoad(false)
            }, 30000)

            return () => {
              clearTimeout(timer)
            }
          }
        }
      )
      setWebApp(app)
    }
  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
          balance,
          isFirstAppLoad,
        }
      : {}
  }, [webApp, balance, isFirstAppLoad])

  return (
    <TelegramContext.Provider value={value}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      {children}
    </TelegramContext.Provider>
  )
}
