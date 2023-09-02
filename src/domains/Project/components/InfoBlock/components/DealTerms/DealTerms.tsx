import { FC } from 'react'
import { TnC } from '@ton-and-company/sdk'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'
import { formatNumberWithSeparators } from 'utils/formatNumberWithSeparators'
import * as S from './style'

export const DealTerms: FC = () => {
  const {
    data: projectSideInfo,
    isLoading: isProjectSideLoading,
    isSuccess: isProjectSideLoaded,
  } = useQuery(['projectSideInfo'], () => TnC.projectInfo(1))

  if (isProjectSideLoading) {
    return <Loader />
  }

  if (isProjectSideLoaded) {
    return (
      <S.Wrapper>
        <S.InfoWrapper>
          <S.Title>
            {formatNumberWithSeparators(projectSideInfo.claimedTokens)}
          </S.Title>
          <S.Label className="text-gray-light">Tokens claimed</S.Label>
        </S.InfoWrapper>
        <Line />
        <S.InfoWrapper>
          <S.Title>{projectSideInfo.participants}</S.Title>
          <S.Label className="text-gray-light">Participants</S.Label>
        </S.InfoWrapper>
        <Line />
        <S.InfoWrapper>
          <S.Title>
            {`${projectSideInfo.fundingGoalTON[0]} - ${projectSideInfo.fundingGoalTON[1]}`}
          </S.Title>
          <S.Label className="text-gray-light">Funding goal</S.Label>
        </S.InfoWrapper>
        <Line />
        <S.InfoWrapper>
          <S.Title>{dayjs(projectSideInfo.deadline).toString()}</S.Title>
          <S.Label className="text-gray-light">Deadline</S.Label>
        </S.InfoWrapper>
        <Line />
        <S.InfoWrapper>
          <S.Title>${projectSideInfo.price}</S.Title>
          <S.Label className="text-gray-light">Price per token</S.Label>
        </S.InfoWrapper>
      </S.Wrapper>
    )
  }

  return null
}
