import { styled } from 'styled-components'

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  padding: 12px;
`

export const Image = styled.img`
  width: 100%;
`
