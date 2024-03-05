import { FC } from 'react'
import Stories from 'react-insta-stories'

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
    <Stories
      defaultInterval={3000}
      height={'100vh'}
      onAllStoriesEnd={onClose}
      preloadCount={2}
      stories={stories}
      storyContainerStyles={{
        backgroundColor: '#fff',
      }}
      storyInnerContainerStyles={{
        backgroundColor: '#fff',
      }}
      storyStyles={{
        backgroundColor: '#fff',
      }}
      width={'100vw'}
    />
  )
}
