import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const AlertLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.hint};
`

export const Link = styled.a`
  color: ${({ theme }) => theme.color.link};
  text-decoration: none;
`
