import { styled } from 'styled-components'

export const Wrapper = styled.div`
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
  border: 1px solid ${({ theme }) => theme.color.hint};
  width: max-content;
`
