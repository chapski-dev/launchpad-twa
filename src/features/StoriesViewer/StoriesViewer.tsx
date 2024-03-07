import { FC } from 'react'
import Stories from 'react-insta-stories'
import { theme } from 'assets/style/theme'
import { BackButton } from 'features/BackButton'

type StoriesViewerProps = {
  stories: {
    url: string
    duration: number
  }[]
  onClose: () => void
}

export const StoriesViewer: FC<StoriesViewerProps> = (props) => {
  const { stories, onClose } = props

  return (
    <>
      <BackButton onClick={onClose} />
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
