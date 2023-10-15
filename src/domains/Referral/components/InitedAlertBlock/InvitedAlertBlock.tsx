import { FC } from 'react'
import * as S from './style'

export const InvitedAlertBlock: FC = () => {
  return (
    <S.Wrapper>
      🙋🏽
      <S.AlertLabel>
        You've been invited by{' '}
        <S.Link href={'https://t.me/markokhman'}>@markokhman</S.Link>
      </S.AlertLabel>
    </S.Wrapper>
  )
}
