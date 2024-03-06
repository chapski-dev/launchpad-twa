import { FC } from 'react'
import { SvgWalletImg } from 'ui/icons'
import * as S from './style'

type WaitListProps = {
  address: string
}

export const WaitList: FC<WaitListProps> = ({ address }) => {
  return (
    <S.Wrapper>
      <S.TitleBlock>
        <S.Title>
          <S.LoaderWaitList />
          Waitlist
        </S.Title>
        <S.WalletAddress>
          <SvgWalletImg />
          {address}
        </S.WalletAddress>
      </S.TitleBlock>
      <S.Description>
        Your wallet is currently in waiting list for whitelising for tokenslae.
      </S.Description>
    </S.Wrapper>
  )
}
