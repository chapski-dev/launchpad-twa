import { createContext, useEffect, useMemo, useState, useContext } from 'react'
import Script from 'next/script'
import { FCWithChildren } from 'types/app'
import { TelegramUser, WebApp } from './types'

export type TelegramContextType = {
  webApp?: WebApp
  user?: TelegramUser
}

export const TelegramContext = createContext<TelegramContextType>({})

export const TelegramProvider: FCWithChildren = (props) => {
  const { children } = props

  const [webApp, setWebApp] = useState<WebApp | null>(null)

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp

    if (app) {
      app.ready()

      setWebApp(app)
    }
  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

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

export const useTelegramContext = () => {
  const telegramContext = useContext(TelegramContext)

  if (!telegramContext) {
    throw new Error(
      'telegramContext has to be used within <TelegramProvider />'
    )
  }

  return telegramContext
}
