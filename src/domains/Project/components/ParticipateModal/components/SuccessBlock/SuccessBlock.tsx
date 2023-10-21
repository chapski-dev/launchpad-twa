import { FC } from 'react'
import * as S from './style'

type SuccessBlockProps = {
  amount: number
  symbol: string
}

export const SuccessBlock: FC<SuccessBlockProps> = (props) => {
  const { amount, symbol } = props

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.CompleteIconWrapper>
          {/* <S.TickIcon /> */}
          {/* <S.CompleteIcon /> */}
          <S.CompleteWrapper>
            <S.CompletePingIcon />
            <S.CompleteIcon />
          </S.CompleteWrapper>
        </S.CompleteIconWrapper>
        <S.InfoWrapper>
          <S.Title>
            You have purchased {amount} {symbol} jettons!
          </S.Title>
          <S.Label>You have successfully participated</S.Label>
        </S.InfoWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
