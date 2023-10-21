import { rgba } from 'polished'
import { styled } from 'styled-components'
import { SvgClose } from 'ui/icons'

export const WrapModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.32);
`

export const CardWrapper = styled.div`
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
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
