import { FC } from 'react'
// import { Chains } from 'constants/blockchain'
// import { WaitList } from 'domains/Project/components/ProjectInfoHeader/components/WaitList/WaitList'
import { Chip } from './components/Chip/Chip'
import * as S from './style'
import { ReadyToParticipate } from './components/ReadyToParticipate/ReadyToParticipate'

type ProjectInfoHeaderProps = {
  image: string
  title: string
  description: string
  // network: keyof typeof Chains
}

export const ProjectInfoHeader: FC<ProjectInfoHeaderProps> = (props) => {
  const { image, title, description } = props

  return (
    <S.Wrapper>
      <S.Image alt="project_image" src={image || '/images/mock.svg'} />
      <S.InfoWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagsWrapper>
          <Chip text="Generative AI" />
          <Chip text="NFT" />
          {/* <Chip text={Chains[network].toUpperCase()} /> */}
        </S.TagsWrapper>
      </S.InfoWrapper>
      {/* <WaitList address="FG4Y...FW42" /> */}
      <ReadyToParticipate address="" />
    </S.Wrapper>
  )
}
