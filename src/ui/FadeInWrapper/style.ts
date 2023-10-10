import { keyframes, styled } from 'styled-components'

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Wrapper = styled.div`
  opacity: 0;
  animation: ${fadeInAnimation} 0.7s ease-in-out forwards;
`
