import { styled } from 'styled-components'
import { TaskProps } from './Task'

export const Wrapper = styled.div<{
  $status?: TaskProps['status']
  disabled?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px;
  border-radius: 24px;
  height: 64px;
  background: ${({ theme, $status }) =>
    $status === 'done' ? theme.gradient.g2 : theme.color.bg};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  opacity: ${({ disabled }) => disabled && 0.6};
`

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 12px;
`

export const Icon = styled.div<{ $status?: TaskProps['status'] }>`
  display: flex;
  align-items: center;
  width: 33px;
  height: 33px;
  svg {
    color: ${({ theme, $status }) =>
      $status === 'done' ? theme.color.white : theme.color.text};
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Title = styled.div<{ $status?: TaskProps['status'] }>`
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, $status }) =>
    $status === 'done' ? theme.color.white : theme.color.text};
`

export const Required = styled.div<{ $status?: TaskProps['status'] }>`
  font-size: 18px;
  width: 5px;
  height: 5px;
  color: ${({ theme }) => theme.color.redAlert};
  display: flex;
`

export const Description = styled.div<{ $status?: TaskProps['status'] }>`
  font-size: 14px;
  line-height: 140%;
  color: ${({ theme, $status }) =>
    $status === 'done' ? theme.color.white : theme.color.hint};
`

export const StatusSvg = styled.div`
  padding-right: 12px;
  line-height: 140%;
`
