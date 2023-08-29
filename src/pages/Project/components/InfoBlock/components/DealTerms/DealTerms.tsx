import { FC } from 'react'
// import { TnC } from '@ton-and-company/sdk'
// import { useQuery } from 'react-query'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
// import { Loader } from 'ui/Loader/Loader'
import { formatNumberWithSeparators } from 'utils/formatNumberWithSeparators'
import * as S from './style'

export const DealTerms: FC = () => {
  // const {
  //   data: projectSideInfo,
  //   isLoading: isProjectSideLoading,
  //   isSuccess: isProjectSideLoaded,
  // } = useQuery(['projectSideInfo'], () => TnC.projectInfo(1))

  // if (isProjectSideLoading) {
  //   return <Loader />
  // }

  // if (isProjectSideLoaded) {
  return (
    <Container>
      <S.Wrapper>
        <S.InfoWrapper>
          <S.Title>{formatNumberWithSeparators(1000000)}</S.Title>
          <S.Label className="text-gray-light">Tokens claimed</S.Label>
        </S.InfoWrapper>
        <Line />
        <S.InfoWrapper>
          <S.Title>{10789}</S.Title>
          <S.Label className="text-gray-light">Participants</S.Label>
        </S.InfoWrapper>
      </S.Wrapper>
    </Container>
  )
  // }

  // return null
}
