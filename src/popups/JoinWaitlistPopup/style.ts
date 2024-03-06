import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  gap: 16px;
`

export const Chain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
`

export const WalletBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
`

export const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NameBlock = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  padding: 12px;
`

export const WalletAddressBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  padding: 6px 8px;
  margin-right: 8px;
  border-radius: 4px;
  gap: 4px;
  font-size: 14px;

  svg {
    width: 16px;
  }
`

export const Description = styled.span`
  display: flex;
  align-items: start;
  font-size: 14px;
  padding: 12px;
  color: ${({ theme }) => theme.color.text};
`
