import styled from 'styled-components'
import { theme } from 'assets/style/theme'

export const Wrapper = styled.div<{ $taskStatus?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px;
  border-radius: 24px;
  height: 64px;
  background: ${({ theme, $taskStatus }) =>
    $taskStatus === 'success' ? theme.gradient.g2 : theme.color.bg};
  cursor: pointer;
`

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 12px;
`

export const Icon = styled.div<{ $taskStatus?: string }>`
  display: flex;
  align-items: center;
  width: 33px;
  height: 33px;
  svg {
    color: ${({ theme, $taskStatus }) =>
      $taskStatus === 'success' ? theme.color.white : theme.color.text};
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Title = styled.div<{ $taskStatus?: string }>`
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, $taskStatus }) =>
    $taskStatus === 'success' ? theme.color.white : theme.color.text};
`

export const Warning = styled.div<{ $taskStatus?: string }>`
  font-size: 18px;
  width: 5px;
  height: 5px;
  color: ${({ theme }) => theme.color.redAlert};
  display: ${({ $taskStatus }) =>
    $taskStatus === 'success' ? 'none' : 'flex'};
`

export const Description = styled.div<{ $taskStatus?: string }>`
  font-size: 14px;
  line-height: 140%;
  color: ${({ theme, $taskStatus }) =>
    $taskStatus === 'success' ? theme.color.white : theme.color.hint};
`

export const StatusSvg = styled.div`
  padding-right: 12px;
  line-height: 140%;
`
