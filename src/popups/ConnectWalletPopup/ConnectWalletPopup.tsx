import { FC } from 'react'
import { SvgRightArrow, SvgToncoinIcon, SvgWalleticon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

export const ConnectWalletPopup: FC = () => {
  return (
    <Modal onClose={() => {}} title="Connect wallet">
      <S.Wrapper>
        <S.Connect>
          <S.LeftBlock>
            <SvgToncoinIcon height={32} width={32} /> TON Connect
          </S.LeftBlock>
          <S.RightBlock>
            <SvgRightArrow />
          </S.RightBlock>
        </S.Connect>
        <S.Connect>
          <S.LeftBlock>
            <SvgWalleticon /> WalletConnect
          </S.LeftBlock>
          <S.RightBlock>
            <SvgRightArrow />
          </S.RightBlock>
        </S.Connect>
      </S.Wrapper>
    </Modal>
  )
}
