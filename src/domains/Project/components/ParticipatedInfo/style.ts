import { styled } from 'styled-components'
import { SvgTrxArrow } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding-top: 24px;
`

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`

export const ParticipatedBlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 12px;
  background: linear-gradient(86deg, #dd2bcd 0%, #1b7cfb 100%);
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: #fff;
`

export const BalanceLabel = styled.span`
  font-weight: 700;
  line-height: 80%;
  letter-spacing: -0.64px;
  font-size: 32px;
  color: #fff;
`

export const StatusBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`

export const BalanceWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Line = styled.div`
  opacity: 0.12;
  background-color: #fff;
  width: 100%;
  height: 1px;
`

export const ContentWrapper = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 4px;
`

export const Description = styled.p<{ isLock?: boolean }>`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme, isLock }) => (isLock ? '#fff' : theme.color.hint)};
`

export const SaleProgressBlock = styled.div`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
`

export const SaleProgressTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`

export const SaleProgressTitle = styled.h5`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.text};
`

export const SaleProgressChip = styled.div`
  background: linear-gradient(86deg, #dd2bcd 0%, #1b7cfb 100%);
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.32px;
  color: #fff;
`

export const TrxArrowIcon = styled(SvgTrxArrow)`
  path {
    stroke: ${({ theme }) => theme.color.link};
  }
`

export const TrxsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const PointCircle = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.link};
`

export const TrxLine = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.12;
  background: #999;
`

export const Link = styled.a`
  text-decoration: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: ${({ theme }) => theme.color.link};
`
