import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
`
