import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const FlexWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  height: 46px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 18px;
  font-weight: 500;
`

export const PromoImage = styled.img`
  cursor: pointer;
  width: 100%;
  margin-bottom: 12px;
`
