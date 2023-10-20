import { FC } from 'react'
import { SvgUnlock, SvgLock, SvgTrxLink } from 'ui/icons'
import * as S from './style'

type LockTransactionBlockProps = {
  symbol: string
  date: string
  amount: string
  isLocked: boolean
}

export const LockTransactionBlock: FC<LockTransactionBlockProps> = (props) => {
  const { symbol, date, amount, isLocked } = props

  return (
    <S.Wrapper disabled={isLocked}>
      <S.LeftSideWrapper>
        {isLocked ? <SvgLock /> : <SvgUnlock />}
        <S.InfoWrapper>
          <S.LabelWrapper>
            <S.Label isBold>
              {amount} {symbol}
            </S.Label>
            {!isLocked && <S.Label>Unlocked</S.Label>}
          </S.LabelWrapper>
          <S.DateLabel>{date}</S.DateLabel>
        </S.InfoWrapper>
      </S.LeftSideWrapper>
      {!isLocked && <SvgTrxLink />}
    </S.Wrapper>
  )
}
