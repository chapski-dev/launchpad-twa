import { styled } from 'styled-components'
import { SvgTonConnectIcon } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 23px;
  height: 46px;
  border-radius: 10px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  width: 49%;
`

export const ToncoinIcon = styled(SvgTonConnectIcon)`
  path {
    fill: ${({ theme }) => theme.color.btnText};
  }
`
