import { FC, useMemo } from 'react'
import { ICOInfo } from '@ton-and-company/sdk/dist/core/sdk'
import dayjs from 'dayjs'
import { Line } from 'ui/Line/Line'
import { getTonPriceFromBigInt } from 'utils/getTonPriceFromBigInt'
import * as S from './style'

type DealTermsProps = {
  icoInfo: ICOInfo
}

export const DealTerms: FC<DealTermsProps> = (props) => {
  const { icoInfo } = props

  const { softCap, totalSupply, tonPerJetton } = icoInfo

  const transformedSoftCapAmount = useMemo(() => {
    return getTonPriceFromBigInt(softCap, tonPerJetton)
  }, [softCap, tonPerJetton])

  const transformedTotalSupplyAmount = useMemo(() => {
    return getTonPriceFromBigInt(totalSupply, tonPerJetton)
  }, [totalSupply, tonPerJetton])

  return (
    <S.Wrapper>
      <S.InfoWrapper>
        <S.Title>{icoInfo.users}</S.Title>
        <S.Label className="text-gray-light">Participants</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>
          {transformedSoftCapAmount === transformedTotalSupplyAmount
            ? `${transformedTotalSupplyAmount} TON`
            : `${transformedSoftCapAmount} TON - ${transformedTotalSupplyAmount} TON`}
        </S.Title>
        <S.Label className="text-gray-light">Funding goal</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>{dayjs(icoInfo.endTime * 1000).toString()}</S.Title>
        <S.Label className="text-gray-light">Deadline</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>{tonPerJetton} TON</S.Title>
        <S.Label className="text-gray-light">Price per token</S.Label>
      </S.InfoWrapper>
    </S.Wrapper>
  )
}
