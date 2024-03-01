import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
  cursor: pointer;
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
