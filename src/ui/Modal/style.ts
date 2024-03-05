import { rgba } from 'polished'
import { styled } from 'styled-components'
import { SvgClose } from 'ui/icons'

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  transition: opacity 0.3s linear;
  opacity: 0;
  &.open {
    opacity: 0.5;
  }
`

export const Modal = styled.div`
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};

  position: fixed;
  bottom: -101vh;
  width: 100%;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  left: 0;
  animation-duration: 0.2s;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  max-height: 95vh;
  overflow-y: scroll;
  &.open {
    bottom: 0;
    animation-duration: 0.2s;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
  }
`

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => rgba('#999', 0.12)};
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h4`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`

export const Close = styled(SvgClose)`
  cursor: pointer;
  path {
    fill: ${({ theme }) => theme.color.text};
  }
`
