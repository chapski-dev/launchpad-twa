import { FC, useEffect } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { PagesConfig } from 'pages/PagesConfig'

export const App: FC = () => {
  const { tg } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [tg])

  return <PagesConfig />
}
