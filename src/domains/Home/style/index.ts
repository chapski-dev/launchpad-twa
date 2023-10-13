import Image from 'next/image'
import { styled } from 'styled-components'
import { ConnectWalletButton as FeatureConnectWalletButton } from 'features/ConnectWalletButton/ConnectWalletButton'
import { Input as UIInput } from 'ui/Input/Input'

export const Wrapper = styled.div`
  width: 100%;
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const FlexWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  height: 46px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const Input = styled(UIInput)<{ $isFocused?: boolean }>`
  width: ${({ $isFocused }) => ($isFocused ? '100%' : '49%')};
  transition: width 0.25s ease;
  height: 47px;
  z-index: 10000;
  position: absolute;
`

export const Header = styled.div`
  dispay: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 18px;
  font-weight: 500;
`

export const ConnectWalletButton = styled(FeatureConnectWalletButton)`
  margin-left: auto;
  width: 49%;
`

export const PromoImage = styled.img`
  cursor: pointer;
  width: 100%;
  margin-bottom: 12px;
`
