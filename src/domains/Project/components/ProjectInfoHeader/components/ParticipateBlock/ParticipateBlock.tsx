import { FC } from 'react'
import { useRouter } from 'next/router'
import { SvgSpinnerLoader, SvgWalletImg } from 'ui/icons'
import * as S from './style'

type ParticipateBlockProps = {
  address: string
  isParticipated: boolean
  projectId: string
}

export const ParticipateBlock: FC<ParticipateBlockProps> = (props) => {
  const { address, isParticipated, projectId } = props

  const router = useRouter()

  return (
    <S.Wrapper>
      <S.TitleBlock>
        {!isParticipated ? (
          <S.Title>
            <SvgSpinnerLoader />
            Ready to Participate
          </S.Title>
        ) : (
          <>
            <S.Title>Participated</S.Title>
            <S.WalletAddress>
              <SvgWalletImg />
              {address}
            </S.WalletAddress>
          </>
        )}
      </S.TitleBlock>
      <S.BottomBlock>
        <S.Description>
          {!isParticipated
            ? 'Participation is allowed for your wallet, participate before the allocations reach an end!'
            : 'You have successfully participated in this project!'}
        </S.Description>
        {isParticipated && (
          <S.ParticipateButton
            onClick={() =>
              router.push({
                pathname: '/sale-state',
                query: {
                  projectId,
                },
              })
            }
          >
            Show Allocation
          </S.ParticipateButton>
        )}
      </S.BottomBlock>
    </S.Wrapper>
  )
}
