import { FC } from 'react'
import * as S from './style'

export const Loader: FC = () => {
  return (
    <S.Wrap>
      <S.Box>
        {[...Array(20)].map((_, index) => (
          <S.SpanS key={index.toString()} i={index + 1}></S.SpanS>
        ))}
      </S.Box>
      <S.Content>Waiting for Approval Transaction...</S.Content>
    </S.Wrap>
  )
}
