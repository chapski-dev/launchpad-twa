import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 90%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  white-space: nowrap;
  padding: 14px 24px;

  color: ${({ theme }) => theme.color.text};
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`
