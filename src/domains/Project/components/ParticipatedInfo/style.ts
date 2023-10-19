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
  color: #fff;
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
  padding: 8px 12px;
  gap: 4px;
`

export const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.color.hint};
`

export const SaleProgressBlock = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SaleProgressTitle = styled.h5`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.color.text};
`

export const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ProgressBar = styled.div`
  height: 7px;
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const ProgressLine = styled.div<{ color?: string; width: number }>`
  height: 100%;
  border-radius: 12px;
  background-color: ${({ color }) => color || '#40E063'};
  width: ${({ width }) => `${width}%`};
`

export const TrxBlock = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const TrxInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const DateLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.color.link};
`

export const TrxLabel = styled.span<{ isBold?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ isBold }) => (isBold ? 700 : 600)};
  line-height: 120%;
  letter-spacing: -0.32px;
`

export const TrxArrowIcon = styled(SvgTrxArrow)`
  path {
    stroke: ${({ theme }) => theme.color.link};
  }
`

export const TrxsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const PointCircle = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.link};
`

export const TrxLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Link = styled.a`
  text-decoration: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: ${({ theme }) => theme.color.link};
`
