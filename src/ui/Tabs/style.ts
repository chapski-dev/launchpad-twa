import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const TabItemLabel = styled.span<{ $isActive?: boolean }>`
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.btn : theme.color.hint};
  cursor: ${({ $isActive }) => ($isActive ? 'auto' : 'pointer')};
  transition: all 0.3s;
  padding: 0 12px;
`

export const TabLine = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  height: 3px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.btn : theme.color.bg};
  transition: all 0.3s;
`
