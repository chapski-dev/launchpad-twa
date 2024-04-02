import { styled } from 'styled-components'
import { Input as UIInput } from 'ui/Input/Input'

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
  cursor: pointer;
`

export const RecountBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.color.text};
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
  font-size: 20px;

  position: relative;
`

export const Input = styled(UIInput)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  &.ton-input {
    background-color: ${({ theme }) => theme.color.bg};
    input {
      background-color: ${({ theme }) => theme.color.bg};
    }
  }
  input {
    font-size: 20px;
  }
`
export const Chain = styled.div`
  font-size: 20px;
`

export const Triangle = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 12px solid ${({ theme }) => theme.color.bg};
  transform: rotate(180deg) translate(-50%, 0);
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
export const InputWrapper = styled.div`
  position: relative;
`