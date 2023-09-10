import NextImage from 'next/image'
import { styled } from 'styled-components'

export const Image = styled(NextImage)``

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  padding: 12px;
`
