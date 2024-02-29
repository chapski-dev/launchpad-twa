import { styled } from 'styled-components'
import { Input as UIInput } from 'ui/Input/Input'

export const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
`

export const UserInfoWrapper = styled.div`
  display: flex;
  gap: 7px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const UserName = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.color.text};
`

export const UserStatus = styled.div`
  color: yellow;
  font-size: 14px;
`
export const Input = styled(UIInput)<{ $isFocused?: boolean }>`
  height: 36px;
  width: 45%;
`
