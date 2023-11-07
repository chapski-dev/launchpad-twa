import { FC, useMemo } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'

import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { SvgToncoinIcon } from 'ui/icons'
import * as S from './style'

type HeaderProps = {
  onSearchButtonClick: () => void
}

export const Header: FC<HeaderProps> = (props) => {
  const { onSearchButtonClick } = props

  const router = useRouter()

  const userWalletAddress = useTonAddress()

  const { balance } = useProfileContext()

  const currentBalance = useMemo(() => {
    if (typeof balance === 'undefined') {
      return '--'
    }

    return Math.floor(balance) === 0 ? '10.00' : balance.toFixed(2)
  }, [balance])

  return (
    <S.Wrapper>
      {router.pathname === AppRoutes.Home && (
        <S.SearchButton onClick={onSearchButtonClick}>
          <S.SearchIcon />
        </S.SearchButton>
      )}

      <S.ConnectWalletButton isConnected={Boolean(userWalletAddress)} />
      {userWalletAddress && (
        <S.BalanceBlock>
          {currentBalance}
          <SvgToncoinIcon />
        </S.BalanceBlock>
      )}
    </S.Wrapper>
  )
}
