import { FC, useState, useRef } from 'react'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'

import { useOutsideClick } from 'hooks/useOutsideClick/useOutsideClick'

import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { shortenAddress } from 'utils/shortenAddress'

import * as S from './style'

export const ConnectWalletButton: FC = () => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState<
    boolean | null
  >(null)

  const dropdownRef = useRef(null)

  const { webApp } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()

  const handleConnectWalletClick = () => {
    if (!webApp) {
      return
    }

    webApp?.expand()

    tonConnectUI.connectWallet()
  }

  const toggleDropdown = () => {
    setIsDropdownDisplayed((prev) => !prev)
  }

  const handleDisconnectButtonClick = () => {
    tonConnectUI.disconnect()
    toggleDropdown()
  }

  useOutsideClick(dropdownRef, () => setIsDropdownDisplayed(false))

  return !address ? (
    <S.Wrapper onClick={handleConnectWalletClick}>
      <S.ToncoinIcon />
      Connect Wallet
    </S.Wrapper>
  ) : (
    <S.AddressContainer ref={dropdownRef}>
      <S.AddressBlock onClick={toggleDropdown}>
        {shortenAddress(address)}
      </S.AddressBlock>
      <S.DropdownButtons $isDisplayed={isDropdownDisplayed}>
        <S.DropdownButton onClick={handleDisconnectButtonClick}>
          Disconnect
        </S.DropdownButton>
      </S.DropdownButtons>
    </S.AddressContainer>
  )
}
