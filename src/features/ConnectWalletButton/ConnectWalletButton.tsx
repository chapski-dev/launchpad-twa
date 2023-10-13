import { FC, useState, useRef } from 'react'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'

import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import { useOutsideClick } from 'hooks/useOutsideClick/useOutsideClick'

import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { shortenAddress } from 'utils/shortenAddress'

import * as S from './style'

type ConnectWalletButtonProps = {
  className?: string
}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const { className } = props

  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState<
    boolean | null
  >(null)

  const dropdownRef = useRef(null)

  const router = useRouter()

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
    <S.Wrapper className={className} onClick={handleConnectWalletClick}>
      <S.ToncoinIcon />
      Connect Wallet
    </S.Wrapper>
  ) : (
    <S.AddressContainer ref={dropdownRef} className={className}>
      <S.AddressBlock onClick={toggleDropdown}>
        {shortenAddress(address)} <S.ArrowIcon isActive={isDropdownDisplayed} />
      </S.AddressBlock>
      <S.DropdownButtons $isDisplayed={isDropdownDisplayed}>
        <S.DropdownButton onClick={() => router.push(AppRoutes.Referral)}>
          Referral
        </S.DropdownButton>
        <S.DropdownButton onClick={handleDisconnectButtonClick}>
          Disconnect
        </S.DropdownButton>
      </S.DropdownButtons>
    </S.AddressContainer>
  )
}
