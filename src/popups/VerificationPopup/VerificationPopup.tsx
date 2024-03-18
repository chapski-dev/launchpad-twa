import { FC, useCallback, useState } from 'react'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { ConnectWalletPopup } from 'popups/ConnectWalletPopup/ConnectWalletPopup'
import { Modal } from 'ui/Modal/Modal'

import * as S from './style'

type VerificatioPopupProps = {
  onClose: (open: boolean) => void
  open: boolean
}

export const VerificationPopup: FC<VerificatioPopupProps> = (props) => {
  const { open, onClose } = props
  const [isConnectWalletPopupOpen, setIsConnectWalletPopupOpen] =
    useState(false)

  const toggleConnectWalletPopup = useCallback(() => {
    setIsConnectWalletPopupOpen((prev) => !prev)
  }, [])

  const { xapiProfileInfo } = useProfileContext()

  return (
    <>
      <Modal
        onClose={onClose}
        open={open}
        title="Account verification required"
      >
        <S.Wrap>
          <S.Content>
            <S.TaskCard
              description={xapiProfileInfo?.wallets?.task?.description}
              done={xapiProfileInfo?.wallets?.task?.done}
              onClick={toggleConnectWalletPopup}
              optional={xapiProfileInfo?.wallets?.task?.optional}
              status={
                xapiProfileInfo?.wallets?.task?.done ? 'done' : 'not-started'
              }
              title={xapiProfileInfo?.wallets?.task?.title}
              type="wallet"
            />
            <S.TaskCard
              description={xapiProfileInfo?.kyc?.task?.description}
              status={xapiProfileInfo?.kyc?.task?.state}
              title={xapiProfileInfo?.kyc?.task?.title}
              type="kyc"
            />
          </S.Content>
        </S.Wrap>
      </Modal>
      <ConnectWalletPopup
        onClose={toggleConnectWalletPopup}
        open={isConnectWalletPopupOpen}
      />
    </>
  )
}
