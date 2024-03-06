import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 252px;
`

export const SuccessTitle = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color.text};
`
