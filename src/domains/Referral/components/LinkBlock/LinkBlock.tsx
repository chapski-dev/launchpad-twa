import { FC } from 'react'
import * as S from './style'

// const mockLink = 't.me/tokenovabot/launchpad?startapp='

//t.me/tokenovabot/launchpad

const labelLink = 't.me/tokenova...'

type LinkBlockProps = {
  referralCode?: string
}

export const LinkBlock: FC<LinkBlockProps> = (props) => {
  const { referralCode } = props

  return (
    <S.Wrapper>{referralCode ? labelLink + referralCode : '...'}</S.Wrapper>
  )
}
