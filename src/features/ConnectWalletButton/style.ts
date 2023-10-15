import { styled } from 'styled-components'
import { SvgArrow, SvgTonConnectIcon } from 'ui/icons'

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 8px 16px;
  width: max-content;
  height: 32px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.color.btnText};
  background-color: ${({ theme }) => theme.color.btn};
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  &:hover {
    opacity: 0.8;
  }
`

export const AddressContainer = styled.div`
  width: max-content;
  height: 32px;
`

export const AddressBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 32px;
  padding: 8px 12px;
  border-radius: 40px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
`

export const ArrowIcon = styled(SvgArrow)<{ isActive: boolean | null }>`
  min-width: 12px;
  min-height: 12px;
  width: 12px;
  height: 12px;

  transform: ${({ isActive }) => isActive && 'rotate(180deg)'};

  path {
    fill: ${({ theme }) => theme.color.text};
  }
`

export const DropdownButtons = styled.div<{ $isDisplayed: boolean | null }>`
  display: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  opacity: ${({ $isDisplayed }) => ($isDisplayed ? 1 : 0)};
  transform: translateY(
    ${({ $isDisplayed }) => ($isDisplayed ? '0' : '-10px')}
  );
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: ${({ $isDisplayed }) => ($isDisplayed ? '1' : '-1')};
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
  font-size: 14px;

  &:hover {
    opacity: 0.5;
  }
`

export const ToncoinIcon = styled(SvgTonConnectIcon)`
  path {
    fill: ${({ theme }) => theme.color.btnText};
  }
`
