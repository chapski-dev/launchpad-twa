import { styled } from 'styled-components'
import { SvgCloseIcon } from 'ui/icons'
import { Input as UIInput } from 'ui/Input/Input'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Input = styled(UIInput)`
  border-radius: 0;
  transition: 0.25s ease;
`

export const CloseIcon = styled(SvgCloseIcon)`
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.color.hint};
  }
`
