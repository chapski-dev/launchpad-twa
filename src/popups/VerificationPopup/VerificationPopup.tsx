import { FC } from 'react'
import { MainButton } from 'features/MainButton'
import { SvgIdentificationCard, SvgWalletImg } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'

import * as S from './style'

type VerificatioPopupProps = {
  onClose: () => void
  open: boolean
}

export const VerificationPopup: FC<VerificatioPopupProps> = (props) => {
  const { open, onClose } = props
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
              description="Ton, ETH"
              icon={<SvgWalletImg />}
              status="not_started"
              title="Connect wallet"
            />
            <S.TaskCard
              description="We value the security of our investors"
              icon={<SvgIdentificationCard />}
              status="not_started"
              title="Pass KYC"
            />
          </S.Content>
        </S.Wrap>
      </Modal>
      <MainButton onClick={() => alert('Join Waitlist')} text="Join Waitlist" />
    </>
  )
}
