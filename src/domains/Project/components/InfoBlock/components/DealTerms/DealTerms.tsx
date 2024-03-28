import { FC } from 'react'
import dayjs from 'dayjs'
import { fromNano } from 'ton-core'
import { ProjectSaleState } from 'api/types'
import { Line } from 'ui/Line/Line'
import * as S from './style'

type DealTermsProps = {
  saleStateData: ProjectSaleState
}

export const DealTerms: FC<DealTermsProps> = (props) => {
  const { saleStateData } = props

  return (
    <S.Wrapper>
      <S.InfoWrapper>
        <S.Title>{dayjs(saleStateData.startTime * 1000).toString()}</S.Title>
        <S.Label className="text-gray-light">Sale Start date</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>{dayjs(saleStateData.endTime * 1000).toString()}</S.Title>
        <S.Label className="text-gray-light">Sale End date</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>
          {Number(fromNano(saleStateData.minBuy)).toFixed(2)} TON
        </S.Title>
        <S.Label className="text-gray-light">Min buy amount (in TON)</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>
          {Number(fromNano(saleStateData.maxBuy)).toFixed(2)} TON
        </S.Title>
        <S.Label className="text-gray-light">Max buy amount (in TON)</S.Label>
      </S.InfoWrapper>
      <Line />
      <S.InfoWrapper>
        <S.Title>
          {Number(fromNano(saleStateData.price)).toFixed(2)} TON
        </S.Title>
        <S.Label className="text-gray-light">Price per token (in TON)</S.Label>
      </S.InfoWrapper>
    </S.Wrapper>
  )
}
