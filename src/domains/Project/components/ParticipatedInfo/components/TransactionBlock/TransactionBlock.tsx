import { FC } from 'react'
import { SvgSuccessTrx, SvgTrxLink } from 'ui/icons'
import * as S from './style'

type TransactionBlockProps = {
  symbol: string
  date: string
  amount: string
  rate: string
  isRefund?: boolean
}

export const TransactionBlock: FC<TransactionBlockProps> = (props) => {
  const { symbol, date, amount, rate, isRefund } = props

  return (
    <S.Wrapper>
      <S.LeftSideWrapper>
        <SvgSuccessTrx />
        <S.InfoWrapper>
          <S.LabelWrapper>
            <S.Label isBold>
              {amount} {symbol}
            </S.Label>
            {isRefund ? (
              <S.RefundChip>Refund</S.RefundChip>
            ) : (
              <S.Label>
                {rate} TON
                {/* /{symbol} */}
              </S.Label>
            )}
          </S.LabelWrapper>
          <S.DateLabel>{date}</S.DateLabel>
        </S.InfoWrapper>
      </S.LeftSideWrapper>
      <SvgTrxLink />
    </S.Wrapper>
  )
}
