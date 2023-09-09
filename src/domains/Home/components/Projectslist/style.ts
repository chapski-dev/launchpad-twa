import { styled } from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
`

export const Loader = styled(UILoader)`
  padding: 24px 0;
`

export const NotFoundBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`

export const Label = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.hint};
  font-weight: 400;
`
