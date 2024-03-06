import { FC, useState } from 'react'
import { MainButton } from 'features/MainButton'
import { SwithBtn } from 'popups/BuyPopup/components/SwitchBtn/SwitchBtn'
import { SvgToncoinIcon, SvgWalletImg } from 'ui/icons'
import { Modal } from 'ui/Modal'
import * as S from './style'

type BuyPopupProps = {
  onClose: () => void
  open: boolean
}

const CHAIN = ['TON', 'ETH']

export const JoinWaitlistPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open } = props

  const [activeChain, setActiveChain] = useState<string>('TON')

  return (
    <>
      <Modal onClose={onClose} open={open} title="Buy XTON">
        <S.Wrapper>
          <S.Chain>
            <S.Title>Source Chain</S.Title>
            <SwithBtn
              activeChain={activeChain}
              onChange={setActiveChain}
              tabs={CHAIN}
            />
          </S.Chain>
          <S.WalletBlock>
            <S.WalletInfo>
              <S.NameBlock>
                <SvgWalletImg />
                Connected Wallet
              </S.NameBlock>
              <S.WalletAddressBlock>
                <SvgToncoinIcon />
                {} FG4Y...FW42
              </S.WalletAddressBlock>
            </S.WalletInfo>
            <S.Description>
              You will be joining waitlist with the specified wallet and you can
              only buy with it, if ti’s wrong, go back and change it.
            </S.Description>
          </S.WalletBlock>
          <MainButton onClick={() => alert('Join')} text="JOIN WAITLIST" />
        </S.Wrapper>
      </Modal>
    </>
  )
}
