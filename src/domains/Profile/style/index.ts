import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const CompletingInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 4px 12px 4px;
`

export const InfoTitle = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.color.text};
`

export const DescriptionInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.hint};
`

export const TaskWrapper = styled.div`
  width: 100%;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  padding: 4px;
  margin-top: 8px;
`
