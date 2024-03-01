import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const TabItem = styled.div<{ $isDisabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: ${({ $isDisabled }) => $isDisabled && 0.6};
  cursor: pointer;
`

export const TabItemLabel = styled.span<{
  $isActive?: boolean
  $isDisabled?: boolean
}>`
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.btn : theme.color.hint};
  cursor: ${({ $isActive, $isDisabled }) =>
    $isActive ? 'pointer' : $isDisabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
`

export const TabLine = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  height: 3px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.btn : theme.color.bg};
  transition: all 0.3s;
`

export const TabTopWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const DisabledLabel = styled.span`
  font-size: 9px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.hint};
  transition: all 0.3s;
  width: max-content;
`
