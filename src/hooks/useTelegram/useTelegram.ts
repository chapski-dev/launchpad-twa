import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [tgOptions, setTgOptions] = useState<any>()

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp

    const onClose = () => {
      tg.close()
    }

    setTgOptions({
      tg,
      onClose,
      user: tg?.initDataUnsafe?.user,
      backButton: tg?.BackButton,
      mainButton: tg?.MainButton,
    })
  }, [])

  return tgOptions
}
