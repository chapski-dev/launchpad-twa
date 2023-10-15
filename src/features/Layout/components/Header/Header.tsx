import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import { ConnectWalletButton } from 'features/ConnectWalletButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import * as S from './style'

type HeaderProps = {
  onSearchButtonClick: () => void
}

export const Header: FC<HeaderProps> = (props) => {
  const { onSearchButtonClick } = props

  const router = useRouter()

  const userWalletAddress = useTonAddress()

  const { balance } = useTelegram()

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
          {balance?.toFixed(2) || '--'}
          <SvgToncoinIcon />
        </S.BalanceBlock>
      )}
    </S.Wrapper>
  )
}
