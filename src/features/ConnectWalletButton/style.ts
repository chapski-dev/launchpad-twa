import { styled } from 'styled-components'

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 16px 16px;
  width: 50%;
  height: 46px;
  color: ${({ theme }) => theme.color.btnText};
  background-color: ${({ theme }) => theme.color.btn};
  cursor: pointer;
  transition: opacity 0.3s;
  font-weight: 700;
  font-size: 12px;

  &:hover {
    opacity: 0.8;
  }
`

export const AddressContainer = styled.div`
  position: relative;
  width: 50%;
  height: 44px;
`

export const AddressBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 23px;
  height: 46px;
  border-radius: 10px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
`

export const DropdownButtons = styled.div<{ isDisplayed: boolean | null }>`
  display: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  opacity: ${({ isDisplayed }) => (isDisplayed ? 1 : 0)};
  transform: translateY(${({ isDisplayed }) => (isDisplayed ? '0' : '-10px')});
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: ${({ isDisplayed }) => (isDisplayed ? '1' : '-1')};
`

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 16px 16px;
  width: 100%;
  max-height: 44px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`
