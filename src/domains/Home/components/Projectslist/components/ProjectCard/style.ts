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
  min-width: 80px;
  width: 80px;
  heigth: 80px;
  max-height: 80px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
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

  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  -ms-line-clamp: 2;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  display: -webkit-box;
  display: box;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  box-orient: vertical;
`

export const Label = styled.span<{ $isBold?: boolean }>`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.text};
  font-weight: ${({ $isBold }) => ($isBold ? 500 : 400)};
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Dot = styled.div`
  border-radius: 50%;
  width: 2px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.hint};
`
