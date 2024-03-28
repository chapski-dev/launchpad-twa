import { FC } from 'react'
import { SvgSuccessBig } from 'ui/icons'
import * as S from './style'

type SuccessBuyProps = {
  amount: string
  symbol: string
}

export const SuccessBuy: FC<SuccessBuyProps> = (props) => {
  const { amount, symbol } = props

  return (
    <S.Wrapper>
      <SvgSuccessBig />
      <S.SuccessTitle>
        Purchased {amount} {symbol} Successfully!
      </S.SuccessTitle>
    </S.Wrapper>
  )
}
