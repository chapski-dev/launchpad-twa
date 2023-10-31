import { styled } from 'styled-components'
import { ConnectWalletButton as FeatureConnectWalletButton } from 'features/ConnectWalletButton'
import { SvgSearch } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  position: relative;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
`

export const SearchButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  cursor: pointer;
`

export const SearchIcon = styled(SvgSearch)`
  path {
    stroke: ${({ theme }) => theme.color.hint};
  }
`

export const ConnectWalletButton = styled(FeatureConnectWalletButton)<{
  isConnected?: boolean
}>`
  position: absolute;
  left: ${({ isConnected }) => isConnected && '50%'};
  transform: ${({ isConnected }) => isConnected && 'translateX(-50%)'};
  right: ${({ isConnected }) => !isConnected && '12px'};
`

export const BalanceBlockPlaceholder = styled.div`
  width: 75px;
  height: 32px;
  border-radius: 40px;
`

export const BalanceBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 40px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  padding: 4px 4px 4px 12px;
  margin-left: auto;
`
