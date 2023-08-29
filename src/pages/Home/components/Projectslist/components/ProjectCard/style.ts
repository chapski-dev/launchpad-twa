import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
  }
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
  align-items: flex-start;
`

export const Title = styled.h5`
  margin: 0;
  padding: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
`

export const Description = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.color.hint};
`
