import { styled } from 'styled-components'

export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 12px;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DateLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.color.hint};
`

export const Label = styled.span<{ isBold?: boolean }>`
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ isBold }) => (isBold ? 600 : 400)};
  color: ${({ theme, isBold }) =>
    isBold ? theme.color.text : theme.color.hint};
  line-height: 120%;
  letter-spacing: -0.32px;
`

export const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const RefundChip = styled.div`
  background: linear-gradient(86deg, #dd2bcd 0%, #1b7cfb 100%);
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.24px;
  color: #fff;
`
