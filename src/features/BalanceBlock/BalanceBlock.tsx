import { FC } from 'react'
import * as S from './style'

type BalanceBlockProps = {
  balance?: number
}

export const BalanceBlock: FC<BalanceBlockProps> = (props) => {
  const { balance } = props

  return (
    <S.Wrapper>
      <S.ToncoinIcon />
      {balance || '--'}
    </S.Wrapper>
  )
}
