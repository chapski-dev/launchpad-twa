import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  height: 112px;
  border-radius: 10px;
`

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Title = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 600;
  padding: 12px;
  gap: 6px;
`

export const WalletAddress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  padding: 3px;
  font-weight: 600;
  margin-right: 8px;
  margin-top: 4px;
  border-radius: 4px;
  gap: 4px;
  font-size: 14px;

  svg {
    width: 25px;
  }
`

export const Description = styled.span`
  width: 100%;
  padding: 24px 12px 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
`

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const LoaderWaitList = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  border: 4px solid ${({ theme }) => theme.color.hint};
  border-top: 4px solid #0098ea;
  border-radius: 50%;
  animation: ${spinAnimation} 2s linear infinite;
`
