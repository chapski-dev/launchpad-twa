import NextImage from 'next/image'
import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }
`

export const Image = styled(NextImage)`
  border-radius: 10px 10px 0 0;
`

export const InfoBlock = styled.div`
  padding: 16px;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const Title = styled.h4`
  font-weight: 700;
  font-size: 18px;
  margin: 0;
  padding: 0;

  color: ${({ theme }) => theme.color.text};
`
