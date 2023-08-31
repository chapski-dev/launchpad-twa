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
