import { FC, useEffect } from 'react'
import Stories from 'react-insta-stories'
import { theme } from 'assets/style/theme'

type StoriesViewerProps = {
  stories: {
    url: string
    duration: number
  }[]
  onClose: () => void
}

export const StoriesViewer: FC<StoriesViewerProps> = (props) => {
  const { stories, onClose } = props

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tg = (window as any)?.Telegram.WebApp

      tg.BackButton.show()

      tg.onEvent('backButtonClicked', () => {
        onClose?.()
      })

      return () => {
        tg.offEvent('backButtonClicked', () => {
          onClose?.()
        })

        tg.BackButton.hide()
      }
    }
  }, [onClose])

  return (
    <>
      <Stories
        defaultInterval={3000}
        height={'100vh'}
        onAllStoriesEnd={onClose}
        preloadCount={2}
        stories={stories}
        storyContainerStyles={{
          backgroundColor: theme.color.bg,
        }}
        storyInnerContainerStyles={{
          backgroundColor: theme.color.bg,
        }}
        storyStyles={{
          backgroundColor: theme.color.bg,
        }}
        width={'100vw'}
      />
    </>
  )
}
