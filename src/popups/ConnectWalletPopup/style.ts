import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  width: 100%;
`

export const ItemWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'auto')};
  padding-right: 12px;
`

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  gap: 12px;
  padding-left: 12px;
  font-size: 16px;
  font-weight: 600;
`

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
`

export const DisconnectButton = styled.button`
  border: none;
  outline: none;
  background: none;
  border: 1px solid ${({ theme }) => theme.color.redAlert};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.redAlert};
  padding: 6px 24px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.redAlert};
    color: #fff;
  }
`
