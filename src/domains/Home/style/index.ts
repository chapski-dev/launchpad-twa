import { TonConnectButton } from '@tonconnect/ui-react'
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
  align-items: center;
  gap: 8px;
`

export const Input = styled(UIInput)`
  width: fit-content;
  height: fit-content;
`

export const ConnectButton = styled(TonConnectButton)`
  button {
    border-radius: 10px;
    height: fit-content;
  }

  div {
    word-space: nowrap;
  }
`
