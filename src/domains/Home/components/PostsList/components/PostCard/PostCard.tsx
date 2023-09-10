import { FC } from 'react'
import { useRouter } from 'next/router'

import { AppRoutes, launchpadWebAppUrl } from 'constants/app'
import * as S from './style'

type PostCardProps = {
  title: string
  image: string
  fileName: string
}

export const PostCard: FC<PostCardProps> = (props) => {
  const { title, image, fileName } = props

  const router = useRouter()

  const handlePostCardClick = () => {
    router.push({
      pathname: AppRoutes.Post,
      query: {
        fileName,
      },
    })
  }

  return (
    <S.Wrapper onClick={handlePostCardClick}>
      <S.Image
        alt="post_image"
        height={170}
        src={launchpadWebAppUrl + image}
        style={{ width: '100%', height: 'auto' }}
        width={370}
      />
      <S.InfoBlock>
        <S.Title>{title}</S.Title>
      </S.InfoBlock>
    </S.Wrapper>
  )
}
