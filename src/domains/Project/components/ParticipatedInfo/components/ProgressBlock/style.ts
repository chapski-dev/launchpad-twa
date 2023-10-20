import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
`

export const ProgressBar = styled.div`
  height: 7px;
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  position: relative;
`

export const MinAmountBlock = styled.div<{
  minAmountPercent: number
  isFailed?: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme, isFailed }) => (isFailed ? '#D35B5B' : theme.color.hint)};
  position: absolute;
  left: ${({ minAmountPercent }) => `calc(${minAmountPercent}% - 4%)`};
  bottom: -2px;

  div {
    background-color: ${({ theme, isFailed }) =>
      isFailed ? '#D35B5B' : theme.color.hint};
  }
`

export const MinAmountLine = styled.div`
  width: 2px;
  height: 11px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.color.hint};
`

export const ProgressLine = styled.div<{
  color?: string
  width: number
  isFailed?: boolean
}>`
  height: 100%;
  border-radius: 12px;
  background-color: ${({ color, isFailed }) =>
    isFailed ? '#D35B5B' : color || '#40E063'};
  width: ${({ width }) => `${width}%`};
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: ${({ theme }) => theme.color.text};
`
