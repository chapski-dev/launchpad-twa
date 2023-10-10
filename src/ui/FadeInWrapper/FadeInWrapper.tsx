import { FCWithChildren } from 'types/app'
import * as S from './style'

type FadeInWrapperProps = {
  className?: string
}

export const FadeInWrapper: FCWithChildren<FadeInWrapperProps> = (props) => {
  const { children, className } = props

  return <S.Wrapper className={className}>{children}</S.Wrapper>
}
