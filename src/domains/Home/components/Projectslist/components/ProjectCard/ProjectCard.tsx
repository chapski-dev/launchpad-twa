import { FC } from 'react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import * as S from './style'

type ProjectCardProps = {
  image: string
  title: string
  description: string
  id: string
}

export const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { image, title, description, id } = props

  const router = useRouter()

  const handleProjectCardClick = () => {
    router.push({
      pathname: AppRoutes.Project,
      query: {
        id,
      },
    })
  }

  return (
    <S.Wrapper onClick={handleProjectCardClick}>
      <S.Image alt="project_image" src={image || '/images/mock.svg'} />
      <S.InfoWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.FlexWrapper>
          <S.Label>
            TSM <S.Label $isBold>100</S.Label>
          </S.Label>
          <S.Dot />
          <S.Label>
            Sale Progress <S.Label $isBold>100%</S.Label>
          </S.Label>
        </S.FlexWrapper>
      </S.InfoWrapper>
    </S.Wrapper>
  )
}
