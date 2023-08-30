import { useEffect } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'

export const useCustomBackButton = () => {
  const tgOptions = useTelegram()

  useEffect(() => {
    if (tgOptions?.tg) {
      const backButton = tgOptions.tg.BackButton
      backButton.show()

      return () => {
        backButton.hide()
      }
    }
  }, [tgOptions?.tg])
}
