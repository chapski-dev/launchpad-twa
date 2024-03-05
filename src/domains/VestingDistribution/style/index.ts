import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const BalanceBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 125px;
  padding: 12px;
  margin-top: 12px;
  border-radius: 10px;
  background-color: transparent;
  background-image: linear-gradient(to right, #f03f9f, #0092e0),
    linear-gradient(to right, #f03f9f, #0092e0);
  background-size: 100% 1.5px;
  background-position: 0 100%, 0 0;
  background-repeat: no-repeat;
  background-clip: border-box;

  &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    bottom: 0;
    width: 24px;
    border: 1.5px solid #f03f9f;
    border-right: none;
    border-radius: 10px 0 0 10px;
  }

  &:after {
    border: 1.5px solid #0092e0;
    border-left: none;
    left: auto;
    right: 0;
    border-radius: 0 10px 10px 0;
  }
`

export const TitleBalance = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
  margin-bottom: 8px;
`
export const Balance = styled.span`
  display: flex;
  align-items: center;
  font-size: 32px;
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
`

export const BalanceLocked = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.color.pink};
  font-weight: 600;
  padding-top: 20px;
  gap: 6px;
`

export const UnlockScheduleBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
`
export const TitleUnlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  gap: 6px;
  color: ${({ theme }) => theme.color.text};
`
export const DescrUnlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 5px;
  padding-top: 24px;
  color: ${({ theme }) => theme.color.text};
  span {
    font-weight: 600;
  }
`

export const ClaimedItemsWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  padding: 12px;
  margin: 12px 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ClaimedItemsWrapperInner = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid ${({ theme }) => theme.color.bg};
  border-radius: 10px;
`

export const ClaimedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.bg};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.bgSecondary};
  }
`
export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`
export const IconUnLock = styled.div`
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.color.success};
    width: 32px;
  }
`

export const IconLock = styled.div`
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.color.pink};
    width: 32px;
  }
`

export const InfoClaimed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  cursor: pointer;
`
export const Count = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
  span {
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.color.success};
  }
`
export const Date = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.hint};
`
export const ClaimedLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const ClaimedBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.pink};
  color: ${({ theme }) => theme.color.white};
  width: 52px;
  height: 24px;
  border-radius: 35px;
  font-size: 12px;
  letter-spacing: 0.8px;
  cursor: pointer;
`
