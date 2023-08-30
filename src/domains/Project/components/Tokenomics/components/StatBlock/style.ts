import { styled } from 'styled-components'
import { Button as UIButton } from 'ui/Button/Button'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const StatItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  padding: 12px;
`

export const StatItemInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2px;
`

export const StatItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Link = styled.a`
  width: max-content;
  color: ${({ theme }) => theme.color.btnText};
  text-decoration: none;
`

export const Title = styled.h6`
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  line-height: 24px;
`

export const Label = styled.span`
  color: ${({ theme }) => theme.color.hint};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`

export const ProgressBar = styled.div`
  height: 7px;
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const ProgressLine = styled.div<{ color: string; width: number }>`
  height: 100%;
  border-radius: 12px;
  background-color: ${({ color }) => color};
  width: ${({ width }) => `${width}%`};
`

export const Button = styled(UIButton)`
  width: max-content;
  padding: 6px 12px;
  border-radius: 50px;
`
