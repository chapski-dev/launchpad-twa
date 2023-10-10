import { FC } from 'react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import * as S from 'domains/Complete/style'
import { MainButton } from 'features/MainButton'
import { FadeInWrapper } from 'ui/FadeInWrapper/FadeInWrapper'

const Complete: FC = () => {
  const router = useRouter()

  const { symbol, amount } = router.query

  return (
    <FadeInWrapper>
      <S.Wrapper>
        <S.ContentWrapper>
          <S.CompleteIconWrapper>
            {/* <S.TickIcon /> */}
            {/* <S.CompleteIcon /> */}
            <S.CompleteWrapper>
              <S.CompletePingIcon />
              <S.CompleteIcon />
            </S.CompleteWrapper>
          </S.CompleteIconWrapper>
          <S.InfoWrapper>
            <S.Title>
              You have purchased {amount} {symbol} jettons!
            </S.Title>
            <S.Label>You have successfully participated</S.Label>
          </S.InfoWrapper>
        </S.ContentWrapper>
        <MainButton
          onClick={() => router.push(AppRoutes.Home)}
          text={'Back to Projects list'}
        />
      </S.Wrapper>
    </FadeInWrapper>
  )
}

export default Complete
