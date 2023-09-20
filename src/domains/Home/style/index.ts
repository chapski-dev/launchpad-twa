import { styled } from 'styled-components'
import { Input as UIInput } from 'ui/Input/Input'

export const Wrapper = styled.div`
  width: 100%;
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
`

export const FlexWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`

export const Input = styled(UIInput)<{ isFocused?: boolean }>`
  width: ${({ isFocused }) => (isFocused ? '100%' : '50%')};
  height: 46px;
`

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 18px;
  font-weight: 500;
`
