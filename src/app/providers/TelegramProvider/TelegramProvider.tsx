import { createContext, useEffect, useMemo, useState } from 'react'
import Script from 'next/script'
import { FCWithChildren } from 'types/app'
import { TelegramUser, WebApp } from './types'

export type TelegramContextType = {
  webApp?: WebApp
  user?: TelegramUser
  isFirstAppLoad?: boolean
}

export const TelegramContext = createContext<TelegramContextType>({})

export const TelegramProvider: FCWithChildren = (props) => {
  const { children } = props

  const [webApp, setWebApp] = useState<WebApp | null>(null)

  const [isFirstAppLoad, setIsFirstAppLoad] = useState<boolean>(false)

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp

    if (app) {
      app.ready()

      app.CloudStorage.getItem(
        'isAlreadyAuthorized',
        (error: any, data: any) => {
          if (!Boolean(data)) {
            console.log(data)
            const timer = setTimeout(() => {
              setIsFirstAppLoad(true)
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
          isFirstAppLoad,
        }
      : {}
  }, [webApp, isFirstAppLoad])

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
