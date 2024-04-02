import { FC } from 'react'
// import { Chains } from 'constants/blockchain'
import { useTonAddress } from '@tonconnect/ui-react'
import { Chip } from './components/Chip/Chip'
import { ParticipateBlock } from './components/ParticipateBlock/ParticipateBlock'
import * as S from './style'

type ProjectInfoHeaderProps = {
  image: string
  title: string
  description: string
  // network: keyof typeof Chains
  isParticipated: boolean
  projectId: string
  isTokenSaleActive: boolean
}

export const ProjectInfoHeader: FC<ProjectInfoHeaderProps> = (props) => {
  const { image, title, description, isParticipated, projectId, isTokenSaleActive } = props

  //TODO: temporary added, will be removeded later
  const tonUserWalletAddress = useTonAddress()

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

      {Boolean(tonUserWalletAddress) && isTokenSaleActive && !isParticipated && (
        <ParticipateBlock
          address={tonUserWalletAddress}
          isParticipated={isParticipated}
          projectId={projectId}
        />
      )}
    </S.Wrapper>
  )
}
