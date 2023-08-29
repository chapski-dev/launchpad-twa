import { useEffect } from 'react'

const tg = (window as any).Telegram.WebApp

export const useCustomBackButton = () => {
  const backButton = tg.BackButton

  useEffect(() => {
    backButton.show()

    return () => {
      backButton.hide()
    }
  }, [backButton])
}
