import { FC } from 'react'
import * as S from './style'

type ChartBlockProps = {
  chartItems: {
    color: string
    percent: number
  }[]
}

export const ChartBlock: FC<ChartBlockProps> = (props) => {
  const { chartItems } = props

  return (
    <S.Wrapper>
      {chartItems.map(({ color, percent }, idx) => (
        <S.ChartItem key={idx} color={color} width={percent} />
      ))}
    </S.Wrapper>
  )
}
