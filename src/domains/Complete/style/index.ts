import { keyframes, styled } from 'styled-components'
import { SvgTick, SvgCompleteIcon } from 'ui/icons'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`

export const Title = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 343px;
  text-align: center;
  gap: 8px;
`

export const CompleteIconWrapper = styled.div`
  border-radius: 24px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const TickIcon = styled(SvgTick)`
  path {
    stroke: ${({ theme }) => theme.color.btn};
  }
`

const pingAnimation = keyframes`
  75%, 100% {
    transform: scale(1.2);
    opacity: 0;
  }
`

export const CompleteWrapper = styled.div`
  position: relative;
`

export const CompletePingIcon = styled(SvgCompleteIcon)`
  animation: ${pingAnimation} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
`

export const CompleteIcon = styled(SvgCompleteIcon)`
  position: absolute;
  top: 0;
  left: 0;
`
