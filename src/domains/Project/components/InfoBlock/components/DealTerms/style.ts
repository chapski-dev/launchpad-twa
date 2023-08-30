import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const Title = styled.h4`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-weight: 500;
  font-size: 24px;
`

export const Label = styled.span`
  color: ${({ theme }) => theme.color.hint};
`
