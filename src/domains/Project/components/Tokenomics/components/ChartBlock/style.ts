import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  border-radius: 10px;
  height: 43px;
`

export const ChartItem = styled.div<{ color: string; width: number }>`
  height: 100%;
  background-color: ${({ color }) => color};
  width: ${({ width }) => `${width}%`};

  &:first-child {
    border-radius: 12px 0 0 12px;
  }

  &:last-child {
    border-radius: 0 12px 12px 0;
  }
`
