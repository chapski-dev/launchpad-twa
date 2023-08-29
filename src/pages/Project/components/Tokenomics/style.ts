import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 12px 0;
`

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`
