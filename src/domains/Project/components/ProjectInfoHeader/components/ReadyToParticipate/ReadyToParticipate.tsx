import { FC } from 'react'
import { SvgSpinnerLoader } from 'ui/icons'
import * as S from './style'

type ReadyToParticipateProps = {
  address: string
}

export const ReadyToParticipate: FC<ReadyToParticipateProps> = ({
  address,
}) => {
  return (
    <S.Wrapper>
      <S.TitleBlock>
        <S.Title>
          <SvgSpinnerLoader />
          Ready to Participate
        </S.Title>
        {/* <S.WalletAddress>
          <SvgWalletImg />
          {address}
        </S.WalletAddress> */}
      </S.TitleBlock>
      <S.Description>
        Participation is allowed for your wallet, participate before the
        allocations reach an end!
      </S.Description>
    </S.Wrapper>
  )
}
