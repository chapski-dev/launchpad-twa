import { styled } from 'styled-components'
import { Input } from 'ui/Input/Input'

export const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ContentHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Label = styled.span<{ isBold?: boolean }>`
  font-size: 14px;
  font-style: normal;
  font-weight: ${({ isBold }) => (isBold ? 500 : 400)};
  line-height: 20px;
  color: ${({ theme, isBold }) =>
    isBold ? theme.color.text : theme.color.hint};
`

export const AmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  width: 102%;
  margin-left: -3px;
`

export const JettonInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 50%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const JettonInputContentWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
`

export const JettonInput = styled(Input)`
  height: 48px;
  max-height: 48px;
  padding: 12px 12px 12px 14px;
  width: 100%;
`

export const JettonImageWrapper = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
`

export const JettonSymbolLabel = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.color.text};
`

export const JettonImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

export const RateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
