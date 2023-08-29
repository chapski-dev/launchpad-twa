import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  padding: 12px 0;
`

export const Image = styled.img`
  width: 80px;
  heigth: 80px;
  border-radius: 50%;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 26px;
  color: ${({ theme }) => theme.color.text};
  font-weight: 700;
  line-height: 34px;
`

export const Description = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`
