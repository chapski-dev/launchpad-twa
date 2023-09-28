import { FC } from 'react'
import { Container } from 'ui/Container/Container'
import { Chip } from './components/Chip/Chip'
import * as S from './style'

type ProjectInfoHeaderProps = {
  image: string
  title: string
  description: string
}

export const ProjectaInfoHeader: FC<ProjectInfoHeaderProps> = (props) => {
  const { image, title, description } = props

  return (
    <Container>
      <S.Wrapper>
        <S.Image alt="project_image" src={image || '/images/mock.svg'} />
        <S.InfoWrapper>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
          <Chip text="DEMO PROJECT" />
        </S.InfoWrapper>
      </S.Wrapper>
    </Container>
  )
}
