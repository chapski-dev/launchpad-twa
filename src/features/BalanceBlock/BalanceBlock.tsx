import { useTelegram } from 'hooks/useTelegram/useTelegram'
import * as S from './style'

export const BalanceBlock = () => {
  const { balance } = useTelegram()

  return (
    <S.Wrapper>
      <S.ToncoinIcon />
      {balance?.toFixed(2) || '--'}
    </S.Wrapper>
  )
}
