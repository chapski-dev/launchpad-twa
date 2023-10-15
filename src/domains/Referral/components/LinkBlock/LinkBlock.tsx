import { FC } from 'react'
import * as S from './style'

const labelLink = 't.me/tokenova...'

type LinkBlockProps = {
  referralCode?: string
  onClick: () => void
}

export const LinkBlock: FC<LinkBlockProps> = (props) => {
  const { referralCode, onClick } = props

  return (
    <S.Wrapper onClick={onClick}>
      {referralCode ? labelLink + referralCode : '...'}
    </S.Wrapper>
  )
}
