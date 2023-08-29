import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0;
`

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`

export const InfoBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InfoTitle = styled.h5`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
