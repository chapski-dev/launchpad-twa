import styled, { keyframes } from 'styled-components'

export type SpanProps = {
  i: number
}

export const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;
`
export const boxx = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`
export const Box = styled.div`
  display: flex;
  top: 30%;
  left: 22%;
  align-items: center;
  position: relative;
  transform: translate(-50%, -50%);
  height: 155px;
  width: 155px;
  border-radius: 50%;
  animation: 10s ${boxx} infinite linear;
`

export const igl = keyframes`
  0% {
    width: 25px;
    height: 10px;
    border-radius: 5px;
  }
  50% {
    width: 15px;
    height: 10px;
    border-radius: 3px;
  }
  100%,
  90% {
    width: 25px;
    height: 10px;
  }

`

export const SpanS = styled.span<SpanProps>`
  --i: ${(props) => props.i};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(calc(19deg * var(--i)));
  height: 100%;
  width: 25px;
  border-radius: 5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
    width: 100%;
    background: rgb(200, 197, 200);
    animation: 2s ${igl} infinite;
    animation-delay: calc(0.02s * var(--i));
  }
`

export const Content = styled.div`
  color: ${({ theme }) => theme.color.text};
  padding-top: 60px;
  font-size: 16px;
  font-weight: 600;
`
