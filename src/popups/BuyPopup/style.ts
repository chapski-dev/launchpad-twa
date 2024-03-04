import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`

export const Title = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
`
export const AllocationChainBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AmountBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Balance = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.hint};
`

export const Count = styled.span`
  color: ${({ theme }) => theme.color.text};
`

export const MaxLink = styled.span`
  color: ${({ theme }) => theme.color.btn};
  text-decoration: underline;
`

export const RecountBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 106px;
  width: 100%;
  color: ${({ theme }) => theme.color.text};
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
  font-size: 20px;
`

export const TonCountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
`

export const TonCount = styled.div`
  font-size: 20px;
`
export const Chain = styled.div`
  font-size: 20px;
`

export const XTonCountBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  background: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 0 0 10px 10px;
`
export const XTonCount = styled.div`
  font-size: 20px;
`

export const Triangle = styled.div`
  position: absolute;
  top: 0;
  right: 47%;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 12px solid ${({ theme }) => theme.color.bg};
  transform: rotate(180deg);
`

export const WellBlock = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.hint};
`

export const WellItem = styled.span`
  font-size: 14px;
`

export const MinMaxBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: -8px;
  color: ${({ theme }) => theme.color.hint};
  gap: 4px;
`

export const MinMaxItem = styled.span`
  font-size: 14px;
`
export const TotalCost = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.hint};
  padding-bottom: 10px;
`
