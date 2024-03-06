import { FC, useCallback, useState } from 'react'
import NextImage from 'next/image'
import { useTelegramContext } from 'app/providers/TelegramProvider'
import { StoriesViewer } from 'features/StoriesViewer/StoriesViewer'
import { STORIES_MOCK } from './mock'
import * as S from './style'

type StoriesBlockProps = {}

const storiesBlocksMock = [
  {
    label: 'About XTON',
    name: 'XTON',
    id: 1,
  },
  {
    label: 'About TON',
    name: 'TON',
    id: 2,
  },
  {
    label: 'How to create TON Space wallet',
    name: 'TG',
    id: 3,
    isDescription: true,
  },
]

export const StoriesBlock: FC<StoriesBlockProps> = () => {
  const [currentStoryBlockId, setCurrentStoryBlockId] = useState<number>(1)
  const [isStoriesOpen, setIsStoriesOpen] = useState<boolean>(false)

  const { webApp } = useTelegramContext()

  const handleStoryClick = useCallback(() => {
    setIsStoriesOpen(false)

    document.body.style.overflowY = 'auto'
    document.body.style.height = 'auto'

    if (webApp?.platform === 'ios') {
      document.body.style.position = 'relative'
    }
  }, [webApp?.platform])

  return (
    <>
      <S.MainWrapper>
        {isStoriesOpen && (
          <S.StroiesBlockWrapper>
            <StoriesViewer
              onClose={handleStoryClick}
              stories={STORIES_MOCK[currentStoryBlockId]}
            />
          </S.StroiesBlockWrapper>
        )}
        {storiesBlocksMock.map(({ label, name, id, isDescription }) => (
          <S.Wrapper
            key={id}
            onClick={() => {
              setCurrentStoryBlockId(id)
              setIsStoriesOpen(true)
            }}
          >
            <S.Wrap
              style={{
                backgroundImage: `url("/images/stories/assets/story_bg${id}.png")`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              <S.WrapInside
                style={{
                  backgroundImage: `url("/images/stories/assets/coin${id}.png")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0',
                  borderRadius: '25px',
                }}
              >
                <S.Top>
                  <S.StoriesIcon>
                    <NextImage
                      alt={`${name} Icon`}
                      height={12}
                      src={`/images/stories/assets/${name}.svg`}
                      width={12}
                    />
                  </S.StoriesIcon>
                </S.Top>
                <S.Bot>
                  {isDescription ? (
                    <S.TextSmall>{label}</S.TextSmall>
                  ) : (
                    <S.Text>{label}</S.Text>
                  )}
                </S.Bot>
              </S.WrapInside>
            </S.Wrap>
          </S.Wrapper>
        ))}
      </S.MainWrapper>
    </>
  )
}
