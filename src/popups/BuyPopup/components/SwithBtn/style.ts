import { styled } from 'styled-components'

export const ToggleWrapper = styled.div`
  cursor: pointer;
  width: 110px;
`

export const ToggleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  width: 100%;
  margin: 0 auto;
  padding: 2px 0px 2px 0px;
  color: ${({ theme }) => theme.color.btnText};
  border-radius: 10px;
  background: ${({ theme }) => theme.color.bgSecondary};
  transition: 0.2s;
`

export const ActiveToggleBtn = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.btn : theme.color.bgSecondary};
  border-radius: 6.93px;
  border: none;
  width: 178px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.white : theme.color.text};
  cursor: ${({ $isActive }) => ($isActive ? 'auto' : 'pointer')};
  transition: 0.25s;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`
