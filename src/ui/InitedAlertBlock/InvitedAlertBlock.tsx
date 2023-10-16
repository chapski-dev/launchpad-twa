import { FC } from 'react'
import * as S from './style'

type InvitedAlertBlockProps = {
  className?: string
}

export const InvitedAlertBlock: FC<InvitedAlertBlockProps> = (props) => {
  const { className } = props

  return (
    <S.Wrapper className={className}>
      🙋🏽
      <S.AlertLabel>
        You've been invited by{' '}
        <S.Link href={'https://t.me/markokhman'}>@markokhman</S.Link>
      </S.AlertLabel>
    </S.Wrapper>
  )
}
