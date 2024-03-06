import { FC } from 'react'
import { SvgSuccessBig } from 'ui/icons'
import * as S from './style'

type SuccessBuyProps = {
  count: string
}

export const SuccessBuy: FC<SuccessBuyProps> = ({ count }) => {
  return (
    <S.Wrapper>
      <SvgSuccessBig />
      <S.SuccessTitle>Purchased {count} XTON Successfully!</S.SuccessTitle>
    </S.Wrapper>
  )
}
