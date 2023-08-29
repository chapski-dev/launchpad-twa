import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

  const handleProjectCardClick = () => {
    navigate(`${AppRoutes.Project}/${id}`)
  }

  return (
    <S.Wrapper onClick={handleProjectCardClick}>
      <S.Image alt="project_image" src={image} />
      <S.InfoWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.InfoWrapper>
    </S.Wrapper>
  )
}
