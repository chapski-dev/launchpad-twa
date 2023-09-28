import { FC } from 'react'
import * as S from './style'

type ChipProps = {
  text: string
}

export const Chip: FC<ChipProps> = (props) => {
  const { text } = props

  return <S.Wrapper>{text}</S.Wrapper>
}
