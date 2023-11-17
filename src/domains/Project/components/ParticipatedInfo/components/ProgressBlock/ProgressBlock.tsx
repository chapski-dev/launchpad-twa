import { FC, useMemo } from 'react'
import * as S from './style'

type ProgressBlockProps = {
  amount: string
  minAmount: string
  maxAmount: string
  isFailed?: boolean
}

export const ProgressBlock: FC<ProgressBlockProps> = (props) => {
  const { amount, minAmount, maxAmount, isFailed } = props

  const progressPercent = useMemo(() => {
    return Math.floor((+amount / +maxAmount) * 100)
  }, [amount, maxAmount])

  const minAmountPercent = useMemo(() => {
    return Math.floor((+minAmount / +maxAmount) * 100)
  }, [maxAmount, minAmount])

  return (
    <S.Wrapper>
      <S.Label className="text-sm text-gray-light">
        {amount} ({progressPercent}%)
      </S.Label>
      <S.ProgressBar>
        <S.ProgressLine isFailed={isFailed} width={progressPercent} />
        {minAmount !== maxAmount && (
          <S.MinAmountBlock
            isFailed={isFailed}
            minAmountPercent={minAmountPercent}
          >
            MIN
            <S.MinAmountLine />
          </S.MinAmountBlock>
        )}
      </S.ProgressBar>
    </S.Wrapper>
  )
}
